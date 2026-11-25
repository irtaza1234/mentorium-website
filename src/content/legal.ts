/**
 * Draft outlines for the legal pages. These are NOT final legal text: each page
 * shows a notice that the full policy is being prepared and will be published
 * after legal review. Replace `points` with lawyer-approved text before launch.
 */
export const legalOutlines: Record<string, { summary: string; points: string[] }> = {
  "privacy-policy": {
    summary: "How The Mentorium collects, uses, stores and protects personal information.",
    points: [
      "What information we collect, such as contact details, educational background, CVs and assessment results.",
      "Why we collect it: to provide counselling, assessments, training and employment support.",
      "Who can see it: only authorised staff and, with your consent, mentors or employers you choose to share it with.",
      "How long we keep it, and how you can request a copy, correction or deletion.",
    ],
  },
  "terms-and-conditions": {
    summary: "The terms that apply when you use the website and services of The Mentorium.",
    points: [
      "Using the website and creating an account.",
      "Booking and attending sessions, courses and assessments.",
      "Acceptable use of the platform by students, mentors and employers.",
      "Limits of our responsibility: we provide guidance and do not guarantee admission, scholarships or employment.",
    ],
  },
  "refund-and-cancellation": {
    summary: "How cancellations, rescheduling and refunds work for paid services.",
    points: [
      "How to cancel or reschedule a session or course.",
      "When a refund applies and how it is processed.",
      "What happens if The Mentorium needs to cancel or reschedule.",
    ],
  },
  "assessment-disclaimer": {
    summary: "What our career assessments are — and what they are not.",
    points: [
      "Assessments are guidance tools that support discussion with a counsellor.",
      "They are not definitive career decisions, psychological evaluations or clinical diagnoses.",
      "Results reflect your answers at a point in time and can change as you grow.",
    ],
  },
  "counselling-disclaimer": {
    summary: "The nature and limits of counselling provided by The Mentorium.",
    points: [
      "Counselling offers academic and career guidance to help you make informed decisions.",
      "Decisions remain yours; outcomes such as admission, scholarships or employment are not guaranteed.",
      "Career counselling is not mental-health therapy. If you need emotional or psychological support, please contact a qualified professional.",
    ],
  },
  "job-posting-guidelines": {
    summary: "Rules for employers publishing vacancies and internships.",
    points: [
      "Listings must describe a genuine, currently available role.",
      "No fees may be charged to candidates for applying or being hired.",
      "Listings must not discriminate unlawfully or include misleading information.",
      "Every listing is reviewed before publication and may be edited or removed.",
    ],
  },
  "employer-verification": {
    summary: "How we verify employers before their vacancies carry a verified badge.",
    points: [
      "Checks of the organisation's registration and contact details.",
      "Confirmation that the person posting is authorised to recruit for the organisation.",
      "Clear labelling of verified vacancies versus opportunities shared for information.",
    ],
  },
  "data-protection": {
    summary: "Your consent and rights over the personal data you share with us.",
    points: [
      "We ask for your consent before collecting or sharing sensitive information such as CVs and assessment results.",
      "You can withdraw consent at any time.",
      "Personal data is stored securely with access limited by role.",
    ],
  },
};
