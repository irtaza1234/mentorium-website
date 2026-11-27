/**
 * Site-wide content for The Mentorium.
 *
 * RULE: never invent names, qualifications, statistics, testimonials,
 * prices or contact details. Anything not yet confirmed by the institute is
 * `null` or an empty list, and the UI shows a clear "coming soon" state or
 * hides the section. Fill these in as real information arrives.
 */

export const site = {
  name: "The Mentorium",
  shortName: "Mentorium",
  tagline: "Your Gateway to Career Excellence",
  description:
    "Your trusted destination for career counselling, professional mentorship, skills development and employment opportunities.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mentoriumpk.com",
  philosophy: ["Discover Your Potential.", "Develop Your Capabilities.", "Connect With Opportunities."],
};

/** Official contact details — all pending confirmation. */
export const contact: {
  email: string | null;
  phone: string | null;
  whatsapp: string | null; // international format without +, e.g. "923001234567"
  address: string | null;
  mapEmbedUrl: string | null;
  hours: string | null;
  social: { label: string; href: string }[];
} = {
  email: null,
  phone: null,
  whatsapp: null,
  address: null,
  mapEmbedUrl: null,
  hours: null,
  social: [],
};

export type NavItem = { label: string; short: string; href: string };

export const mainNav: NavItem[] = [
  { label: "About Us", short: "About", href: "/about" },
  { label: "Career Counselling", short: "Counselling", href: "/career-counselling" },
  { label: "Career Assessment", short: "Assessment", href: "/career-assessment" },
  { label: "Training", short: "Training", href: "/training" },
  { label: "Jobs & Internships", short: "Jobs & Internships", href: "/jobs" },
  { label: "Mentorship", short: "Mentorship", href: "/mentorship" },
  { label: "Resources", short: "Resources", href: "/resources" },
  { label: "Contact", short: "Contact", href: "/contact" },
];

/** Services listed in the homepage hero; also offered in the booking form. */
export const heroServices = [
  "One-to-one career counselling sessions",
  "Aptitude, interest and personality tests",
  "Identification of learning gaps",
  "A personalised scheme of studies for success (students aged 12 to 18)",
  "Guidance on the right skills to develop for a job or a successful career",
  "Help finding a paid internship or job",
];

/** Institute card in the homepage hero. */
export const heroCard = {
  name: "The Mentorium",
  offerings: ["Career Counselling", "Professional Mentorship", "Job Placement", "Paid Internships", "Career Development"],
};

export const services = [
  {
    title: "Career Counselling",
    href: "/career-counselling#career",
    icon: "compass",
    text: "One-to-one guidance to plan your career, map your options and move forward with confidence.",
  },
  {
    title: "Career Assessment",
    href: "/career-assessment",
    icon: "chart",
    text: "Structured assessments of your interests, aptitude and strengths to inform your choices.",
  },
  {
    title: "Academic Guidance",
    href: "/career-counselling#academic",
    icon: "cap",
    text: "Support with subject, degree and university selection, admissions, scholarships and study abroad.",
  },
  {
    title: "Professional Skills Development",
    href: "/training",
    icon: "spark",
    text: "Practical training in communication, leadership, digital skills, AI tools and more.",
  },
  {
    title: "Employment Support",
    href: "/career-counselling#employment",
    icon: "briefcase",
    text: "CV development, interview preparation and job search guidance to help you become employment-ready.",
  },
  {
    title: "Mentorship Programmes",
    href: "/mentorship",
    icon: "people",
    text: "Connect with experienced professionals who can share insight from your chosen field.",
  },
] as const;

export const journey = [
  {
    step: "01",
    title: "Discover Your Potential",
    text: "Identify your aptitude, interests, strengths and aspirations.",
    href: "/career-assessment",
  },
  {
    step: "02",
    title: "Develop Your Capabilities",
    text: "Acquire the knowledge, skills and professional competencies you need.",
    href: "/training",
  },
  {
    step: "03",
    title: "Connect With Opportunities",
    text: "Access career guidance, mentorship, internships and employment opportunities.",
    href: "/jobs",
  },
];

export const whyChoose = [
  "Experienced and qualified mentors.",
  "Individualised career guidance.",
  "Evidence-informed career assessment.",
  "Academic and professional counselling under one roof.",
  "Access to training and development programmes.",
  "Employment and internship support.",
  "Continuous mentorship and follow-up.",
];

export const audiences = [
  "Students and young people",
  "University students and graduates",
  "Job seekers",
  "Working professionals",
  "Anyone seeking career advancement",
];

export const counselling = [
  {
    id: "academic",
    title: "Academic Counselling",
    intro:
      "Make well-informed education choices, from the subjects you study to the university you attend.",
    items: [
      { name: "Subject Selection", text: "Choose subjects that keep the right doors open for your goals." },
      { name: "Degree Selection", text: "Compare degree options against your interests, strengths and career plans." },
      { name: "University Selection", text: "Shortlist universities that fit your academic profile and priorities." },
      { name: "Admission Guidance", text: "Understand requirements, timelines and how to present a strong application." },
      { name: "Scholarship Guidance", text: "Identify scholarships you may be eligible for and prepare to apply." },
      { name: "Study Abroad Guidance", text: "Plan international study, from choosing a country to preparing documents." },
    ],
  },
  {
    id: "career",
    title: "Career Counselling",
    intro: "Build a clear, realistic plan for your career — whether you are starting out or changing direction.",
    items: [
      { name: "Career Planning", text: "Set direction and milestones for the next stage of your career." },
      { name: "Career Mapping", text: "See the routes into the roles and industries that interest you." },
      { name: "Career Interest Identification", text: "Clarify what motivates you and which fields suit you." },
      { name: "Professional Career Transition", text: "Plan a move into a new role, sector or profession." },
      { name: "Career Advancement", text: "Prepare for promotion, leadership and long-term growth." },
    ],
  },
  {
    id: "employment",
    title: "Employment Counselling",
    intro: "Get ready for the job market with practical, personalised support.",
    items: [
      { name: "Job Search Guidance", text: "Search effectively and target opportunities that match your profile." },
      { name: "CV and Resume Development", text: "Present your education, skills and experience clearly and professionally." },
      { name: "Interview Preparation", text: "Practise answering questions and presenting yourself with confidence." },
      { name: "Professional Networking", text: "Build professional relationships and a credible online presence." },
      { name: "Employment Readiness", text: "Develop the workplace skills and habits employers look for." },
    ],
  },
];

export const assessments = [
  {
    name: "Aptitude Assessment",
    text: "Explores your strengths in areas such as verbal, numerical and logical reasoning.",
  },
  {
    name: "Career Interest Inventory",
    text: "Identifies the kinds of work and environments you are most drawn to.",
  },
  {
    name: "Personality Assessment",
    text: "Looks at your working style and preferences to help find a good fit.",
  },
  {
    name: "Academic Strength Assessment",
    text: "Highlights the subjects and learning areas where you perform best.",
  },
  {
    name: "Career Readiness Assessment",
    text: "Gauges how prepared you are for job applications, interviews and the workplace.",
  },
];

export const reportContents = [
  "Strengths",
  "Areas for improvement",
  "Potential career directions",
  "Suggested educational pathways",
  "Recommended counselling sessions",
];

export const trainingAreas = [
  { name: "Communication Skills", text: "Speak, write and listen with clarity and confidence." },
  { name: "Presentation Skills", text: "Plan and deliver presentations that hold attention." },
  { name: "Leadership and Management", text: "Lead people and projects effectively." },
  { name: "Digital Skills", text: "Work confidently with the essential tools of the modern workplace." },
  { name: "AI Tools and Applications", text: "Use AI tools responsibly to work smarter in your field." },
  { name: "Entrepreneurship", text: "Turn an idea into a viable plan for a business." },
  { name: "Professional Development", text: "Build the habits and skills that support long-term growth." },
  { name: "Competitive Examination Preparation", text: "Structured preparation for competitive examinations." },
];

/** Real courses go here once confirmed (title, duration, trainer, fee, schedule). */
export const courses: {
  slug: string;
  title: string;
  area: string;
  duration: string;
  mode: string;
  summary: string;
}[] = [];

export const mentorCategories = [
  "Education and Academic Mentors",
  "Public Administration and Governance",
  "Business and Entrepreneurship",
  "Banking and Finance",
  "Information Technology and AI",
  "Law and Corporate Affairs",
  "Marketing and Communication",
  "Human Resource Management",
  "Engineering and Technical Professions",
];

/** Leadership profiles — details as provided by the institute. */
export const leadership = [
  {
    slug: "amjad-iqbal-khattak",
    name: "Prof. Amjad Iqbal Khattak",
    role: "Head of Counselling & Assessment Services",
    formerly: "Former Director of Education (Colleges), Higher Education Department, Government of Punjab",
  },
];

/** Approved mentor profiles only. Each needs consent to publish. */
export const mentors: {
  slug: string;
  name: string;
  designation: string;
  category: string;
  expertise: string;
  photo: string | null;
}[] = [];

/** Verified employer vacancies and opportunities shared for information. */
export const jobs: {
  id: string;
  title: string;
  organisation: string;
  location: string;
  type: "Job" | "Internship";
  verified: boolean;
  url: string;
}[] = [];

/** Real, consented testimonials only. The section is hidden while empty. */
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const resourceCategories = [
  { name: "Career Guidance Articles", text: "Practical advice on choosing and building a career." },
  { name: "Educational Resources", text: "Guides to subjects, degrees, universities and scholarships." },
  { name: "Job Preparation Guides", text: "Step-by-step help with searching and applying for jobs." },
  { name: "Interview Preparation", text: "Common questions, techniques and how to prepare." },
  { name: "CV Writing Guides", text: "How to write a clear, professional CV." },
  { name: "Career Development Videos", text: "Short videos on skills and career topics." },
  { name: "Webinars and Seminars", text: "Live and recorded sessions with mentors and professionals." },
];

export const faqs = [
  {
    q: "Who is The Mentorium for?",
    a: "Students, university graduates, job seekers, working professionals and anyone who wants guidance on their education or career.",
  },
  {
    q: "How do I book a counselling session?",
    a: "Use the Book a Consultation button to send us your details and the kind of guidance you are looking for. Our team will contact you to arrange a session.",
  },
  {
    q: "Are career assessments a final decision about my career?",
    a: "No. Assessments are guidance tools that help you and your counsellor think through your options. They are not definitive career decisions or clinical diagnoses.",
  },
  {
    q: "Do you guarantee employment?",
    a: "No. We help you prepare for and connect with opportunities, but we do not promise or guarantee employment.",
  },
  {
    q: "How are job and internship listings checked?",
    a: "Every opportunity is reviewed before it is published. Listings from verified employers are clearly marked, and opportunities shared for information are labelled separately.",
  },
  {
    q: "How is my personal information protected?",
    a: "Your CV, educational records and assessment results are kept private, stored securely and shared only with your consent. Our Privacy Policy explains this in detail.",
  },
];

export const legalPages = [
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "terms-and-conditions", title: "Terms and Conditions" },
  { slug: "refund-and-cancellation", title: "Refund and Cancellation Policy" },
  { slug: "assessment-disclaimer", title: "Assessment Disclaimer" },
  { slug: "counselling-disclaimer", title: "Counselling Disclaimer" },
  { slug: "job-posting-guidelines", title: "Job Posting Guidelines" },
  { slug: "employer-verification", title: "Employer Verification Policy" },
  { slug: "data-protection", title: "Data Protection and Consent Policy" },
] as const;
