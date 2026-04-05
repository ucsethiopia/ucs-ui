// Mock data for UCS Ethiopia website

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  logoMissing?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description?: string;
  country?: string;
  partnerType?: "local" | "overseas";
  logoMissing?: boolean;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TrainingCategory {
  id: string;
  name: string;
  subtitle?: string;
  courses: string[];
}

export interface ServicePillar {
  id: string;
  title: string;
  description: string;
  offerings: string[];
  trainingCategories?: TrainingCategory[];
  image: string;
}

// Company identity
export const vision =
  "To be the leading catalyst for organizational transformation and professional growth, enabling clients to excel in an evolving business landscape.";

export const mission =
  "To inspire and benefit organizations by applying the latest knowledge, skills, and tools, supporting sustainable development and driving positive change for individuals and institutions.";

// Contact information
export const contactInfo = {
  address:
    "Gurd Shola, around Century Mall, Abenezer Building, 3rd floor, Addis Ababa, Ethiopia",
  emails: ["info@ucsethiopia.com", "ftesgerajetu@yahoo.com"],
  phones: ["+251911256485", "+251911445721"],
  poBox: "12682",
  linkedin: "https://www.linkedin.com/company/ultimate-consultancy-services/",
  telegram: "@UcsEthiopia",
};

// Training categories with detailed courses
export const trainingCategories: TrainingCategory[] = [
  {
    id: "executive",
    name: "Executive Development",
    courses: [
      "Driving Strategic Innovation",
      "Organizational Change and Transformation Management",
      "Corporate Governance and Leadership",
      "Digital Transformation Management",
      "Leading with Impact: Transformational Leadership",
      "Leading Customer Centric Strategies",
      "Strategic Partnership Management",
      "Risk and Compliance Management",
      "Capital Markets and Opportunities",
    ],
  },
  {
    id: "management",
    name: "Management Development",
    courses: [
      "Capital/Financial Markets",
      "Risk Based Internal Audit",
      "Humanistic Leadership",
      "Strategic Thinking and Strategy Execution",
      "Leading in the Digital Age: Leadership Skills for the Digital Age",
      "Business Analytics for Leaders: Data Driven Decision Making",
      "Becoming a Transformational Leader/Transformational Leadership",
      "Leading with Emotional Intelligence",
      "Problem Solving and Decision Making",
      "Digital Business Leadership",
      "Change and Knowledge Management",
      "Enterprise Risk Management",
      "Talent Management & Retention Strategies",
      "Leading High Performance Teams",
      "Customer Experience Management",
      "Organizational Leadership: Driving Culture and Performance",
      "Attitudinal Transformation and Ethical Leadership",
      "Organizational Skills and Stress Management",
      "Team Building and Coaching",
    ],
  },
  {
    id: "professional",
    name: "Professional Development",
    courses: [
      "Design Thinking and Business Innovation",
      "Marketing Skills (Product & Service Marketing)",
      "Project Management Professional - PMP",
      "Customer R/P Management (CEM)",
      "Emotional Intelligence: Inner Leadership",
      "Digital Marketing Skills",
      "Leadership Skills Development",
      "Attitudinal Transformation and Workplace Ethics",
      "Team Skills: Communicating Effectively in Groups",
      "Customer Service Excellence/Customer Centric Culture",
    ],
  },
  {
    id: "it",
    name: "Information Technology (IT)",
    courses: [
      "Artificial Intelligence (AI) for Business",
      "ITIL (Foundation and Intermediate)",
      "Cloud Security – Certified Cloud Security Professional (CCSP)",
      "Certified Information Systems Security Professional (CISSP)",
      "Governance of Enterprise IT (CGEIT)",
      "Cyber Security for the Financial Industry: Managing Risk in the Information Age",
      "Certified Information System Auditor (CISA)",
      "COBIT 2019 Framework: Introduction and Methodology (IT Governance)",
      "Certified Risk and Information System Control (CRISC)",
      "Red Hat System Administration (I, II, and III)",
      "CCNA and CCNP",
      "Checkpoint Certified Administrator",
      "Big Data and Edge Computing",
      "Business Agility, Digital Transformation and IT Strategy",
      "Design Thinking and Business Innovation",
      "IT Service Management",
      "Risk and Business Continuity Planning",
      "Others: Server, Storage, VMware, Microsoft, Oracle",
    ],
  },
  {
    id: "finance",
    name: "Finance",
    courses: [
      "Financial Modeling",
      "Capital/Financial Markets and Forex Trading",
      "Finance for Non-Finance Managers",
      "Accounting & Financial Analysis",
      "Enterprise Risk and Compliance Management",
      "Operational Risk in Time of Crisis",
      "Project Planning and Controlling",
      "Risk Based Auditing",
      "Internal Audits (Risk Based)",
    ],
  },
  {
    id: "hr",
    name: "Human Resources (HR)",
    courses: [
      "Communication, Emotional Intelligence & Leadership Skills",
      "Artificial Intelligence and Machine Learning - Data, the New Currency",
      "Navigating Uncertainty and Equipping Workers with Skills and Tools",
      "Beyond Balance Sheet - HR Evaluation and Accounting",
    ],
  },
  {
    id: "marketing",
    name: "Marketing & Public Relations",
    courses: [
      "Business Communication, Ethics and Analysis",
      "Business Communication with Data",
      "Critical Thinking and Innovative Skills for Competitive Advantage",
      "Public Leadership and Management",
      "Achieving Excellence in Customer Service",
      "Marketing and Business Growth Strategies",
      "Digital Marketing Strategy",
      "Public Relation Management",
    ],
  },
  {
    id: "other",
    name: "Other Programs",
    courses: [
      "Interest Free Banking (IFB) Training",
      "Takaful Training",
      "Executive Personal Assistant",
    ],
  },
];

// Core values — SPEED acronym
export const coreValues: CoreValue[] = [
  {
    id: "1",
    title: "Synergy",
    description:
      "We work in close partnership with our clients and collaborators, building relationships grounded in trust and shared purpose.",
    icon: "Users",
  },
  {
    id: "2",
    title: "Provision",
    description:
      "We are committed to delivering cost-effective, high-quality service that creates real and measurable value for every client.",
    icon: "BadgeCheck",
  },
  {
    id: "3",
    title: "Enthusiasm",
    description:
      "We go above and beyond in every engagement, driven by a genuine commitment to exceeding our clients' expectations.",
    icon: "Zap",
  },
  {
    id: "4",
    title: "Endurance",
    description:
      "We see every engagement through to completion with steadfast commitment and resilience to achieve lasting results.",
    icon: "Shield",
  },
  {
    id: "5",
    title: "Dedication",
    description:
      "We uphold the highest standards of integrity and respect for professionalism in every interaction and deliverable.",
    icon: "Award",
  },
];

// Client logos mock data
// Logo paths resolve under public/images/logos/clients/
export const clientLogos: ClientLogo[] = [
  // Financial institutions
  { id: "1", name: "Awash Bank", logo: "/images/logos/clients/awash-bank.png" },
  { id: "2", name: "Siinqee Bank", logo: "/images/logos/clients/siinqee.png" },
  {
    id: "3",
    name: "Commercial Bank of Ethiopia",
    logo: "/images/logos/clients/commercial-bank-of-ethiopia.png",
  },
  {
    id: "4",
    name: "Oromia Bank",
    logo: "/images/logos/clients/oromia-bank.png",
  },
  {
    id: "5",
    name: "Global Bank Ethiopia",
    logo: "/images/logos/clients/global-bank.png",
  },
  {
    id: "6",
    name: "VisionFund Microfinance",
    logo: "/images/logos/clients/visionfund-microfinance.png",
  },
  {
    id: "7",
    name: "Awash Insurance",
    logo: "/images/logos/clients/awash-insurance.png",
  },
  {
    id: "8",
    name: "United Insurance",
    logo: "/images/logos/clients/united-insurance.png",
  },

  // Government and development agencies
  {
    id: "9",
    name: "Ministry of Agriculture",
    logo: "/images/logos/clients/ministry-of-agriculture.png",
  },
  {
    id: "10",
    name: "Ethiopian Water Technology Institute",
    logo: "/images/logos/clients/ethiopian-water-technology-institute.png",
  },
  {
    id: "11",
    name: "International Reference Center",
    logo: "/images/logos/clients/international-reference-center.svg",
  },

  // Private sector and industry
  {
    id: "12",
    name: "National Alcohol and Liquor Factory",
    logo: "/images/logos/clients/nalf.png",
  },
  {
    id: "13",
    name: "Minaye Business Group",
    logo: "/images/logos/clients/minaye.png",
  },
  {
    id: "14",
    name: "DH GEDA Trade and Industry",
    logo: "/images/logos/clients/dh-geda.png",
  },
  {
    id: "15",
    name: "Gemshu Beyene Construction",
    logo: "/images/logos/clients/gebecon.png",
  },
];

// Strategic partners mock data
// Logo paths resolve under public/images/logos/partners/.
export const strategicPartners: Partner[] = [
  // Local partners
  {
    id: "1",
    name: "Glocal Management Partners",
    logo: "/images/logos/partners/glocal-management-partners-removebg-preview.png",
    description: "Strategic management consulting",
    country: "Ethiopia",
    partnerType: "local",
  },
  // {
  //   id: "2",
  //   name: "B and M Development Consultants",
  //   logo: "/images/logos/partners/b-and-m-development-consultants-removebg-preview.png",
  //   description: "Development consulting",
  //   country: "Ethiopia",
  //   partnerType: "local",
  //   logoMissing: true,
  // },
  {
    id: "2",
    name: "Path Consulting",
    logo: "/images/logos/partners/path-consulting-removebg-preview.png",
    description: "Management and strategy consulting",
    country: "Ethiopia",
    partnerType: "local",
  },
  {
    id: "3",
    name: "Askiibez Consulting",
    logo: "/images/logos/partners/askiibez-consulting-removebg-preview.png",
    description: "Business consulting",
    country: "Ethiopia",
    partnerType: "local",
  },
  // Overseas partners
  {
    id: "4",
    name: "Trempplin",
    logo: "/images/logos/partners/trempplin-removebg-preview.png",
    description: "Training and development",
    country: "India",
    partnerType: "overseas",
  },
  {
    id: "5",
    name: "Zinger Solutions",
    logo: "/images/logos/partners/zinger-solutions-removebg-preview.png",
    description: "Business solutions",
    country: "Kenya",
    partnerType: "overseas",
  },
  {
    id: "6",
    name: "Halkago Connect",
    logo: "/images/logos/partners/halkago-connect.png",
    description: "Technology and connectivity solutions",
    country: "Kenya",
    partnerType: "overseas",
  },
  {
    id: "7",
    name: "AaRohan Service Management Solutions",
    logo: "/images/logos/partners/aarohan-service-management-solutions-removebg-preview.png",
    description: "Service management consulting",
    country: "India",
    partnerType: "overseas",
  },
  // {
  //   id: "8",
  //   name: "Precise Corporate Services",
  //   logo: "/images/logos/partners/precise-corporate-services-removebg-preview.png",
  //   description: "Corporate services",
  //   country: "India",
  //   partnerType: "overseas",
  //   logoMissing: true,
  // },
  {
    id: "8",
    name: "Purchasing and Procurement Center",
    logo: "/images/logos/partners/purchasing-and-procurement-center-removebg-preview.png",
    description: "Procurement and supply chain consulting",
    country: "USA",
    partnerType: "overseas",
  },
];

// Service pillars mock data
export const servicePillars: ServicePillar[] = [
  {
    id: "1",
    title: "Training",
    description:
      "UCS provides training services to help organizations develop the cutting-edge knowledge and skills needed to remain abreast of the latest learning curve.",
    offerings: [
      "Executive Development Programs",
      "Management Development Programs",
      "Professional Development Programs",
      "IT & Digital Skills Training",
      "Finance & Accounting Training",
      "Human Resources Training",
      "Marketing & Communications Training",
    ],
    trainingCategories: trainingCategories,
    image: "/images/services/training.jpg",
  },
  {
    id: "2",
    title: "Advisory",
    description:
      "UCS offers consultancy and advisory services to help organizations effectively design and implement strategic change and transformation initiatives.",
    offerings: [
      "Strategic Planning",
      "Organizational Change and Transformation Management",
      "Organizational Development",
      "Project Portfolio Management",
      "Feasibility and Impact Studies",
    ],
    image: "/images/services/advisory.jpg",
  },
  {
    id: "3",
    title: "Research & Publication",
    description:
      "UCS conducts studies to support organizations in opening up new field of possibilities and fostering sustainable growth both in the short and long term.",
    offerings: [
      "Organizational Studies",
      "Feasibility Studies",
      "Sector & Industry Studies",
      "Customer Satisfaction Surveys",
      "Opinion & Baseline Surveys",
      "Turnkey Project Studies",
      "Market Research & Analysis",
    ],
    image: "/images/services/research.jpg",
  },
  {
    id: "4",
    title: "Communication & Promotion",
    description:
      "UCS supports organizations in the documentation of best practices as well as in the preparation of communication and promotion resource materials.",
    offerings: [
      "Educational Materials Development",
      "Newsletter Design & Production",
      "Brochures & Marketing Collateral",
      "Company Profiles",
      "Annual Reports",
      "Event Materials",
      "Digital Content Creation",
    ],
    image: "/images/services/communication.jpg",
  },
];

// News categories
export const newsCategories = [
  "All",
  "Strategy",
  "Partnership",
  "Training",
  "Research",
  "Events",
  "Advisory",
  "Company News",
];
