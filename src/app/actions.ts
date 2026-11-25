"use server";

export type EnquiryState = {
  status: "idle" | "sent" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message" | "consent", string>>;
};

const clean = (v: FormDataEntryValue | null, max = 2000) => String(v ?? "").trim().slice(0, max);

/**
 * Sends a consultation request or contact message by email through Resend.
 * Needs RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL in the
 * environment (set them in Vercel → Project → Settings → Environment Variables).
 */
export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Spam trap
  if (clean(formData.get("company_website"))) return { status: "sent" };

  const data = {
    kind: clean(formData.get("kind"), 20),
    name: clean(formData.get("name"), 120),
    email: clean(formData.get("email"), 200),
    phone: clean(formData.get("phone"), 40),
    stage: clean(formData.get("stage"), 80),
    service: clean(formData.get("service"), 80),
    message: clean(formData.get("message")),
    consent: formData.get("consent") === "on",
  };

  const errors: EnquiryState["errors"] = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Please write a short message (at least 10 characters).";
  if (!data.consent) errors.consent = "Please confirm you agree so we can respond.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return {
      status: "error",
      message:
        "Online enquiries are being set up and are not active in this preview yet. Please check back soon.",
    };
  }

  const subject =
    data.kind === "consultation" ? `Consultation request — ${data.name}` : `Website enquiry — ${data.name}`;
  const lines = [
    `Type: ${data.kind}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone/WhatsApp: ${data.phone || "—"}`,
    `I am a: ${data.stage || "—"}`,
    data.kind === "consultation" ? `Service: ${data.service || "—"}` : null,
    "",
    data.message,
  ].filter((l) => l !== null);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, text: lines.join("\n") }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { status: "sent" };
  } catch (err) {
    console.error("Enquiry email failed", err);
    return {
      status: "error",
      message: "Sorry, your message could not be sent just now. Please try again in a few minutes.",
    };
  }
}
