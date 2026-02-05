// Mock data for UCS Ethiopia website

export interface ExchangeRate {
  pair: string;
  from: string;
  to: string;
  rate: number;
  change: number;
  changePercent: number;
}

export interface EconomicIndicator {
  name: string;
  value: string;
  change: number;
  history: number[];
}

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

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  isOwner?: boolean;
  yearsOfExperience?: number;
  email?: string;
  linkedinUrl?: string;
  expertise?: string[];
  achievements?: string[];
  certifications?: string[];
}

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description?: string;
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

// Exchange rates mock data
export const exchangeRates: ExchangeRate[] = [
  {
    pair: "ETB/USD",
    from: "ETB",
    to: "USD",
    rate: 56.42,
    change: 0.15,
    changePercent: 0.27,
  },
  {
    pair: "ETB/EUR",
    from: "ETB",
    to: "EUR",
    rate: 61.28,
    change: -0.22,
    changePercent: -0.36,
  },
  {
    pair: "ETB/JPY",
    from: "ETB",
    to: "JPY",
    rate: 0.38,
    change: 0.01,
    changePercent: 2.7,
  },
];

// Economic indicators mock data
export const economicIndicators: EconomicIndicator[] = [
  {
    name: "NBE Policy Rate",
    value: "7.00%",
    change: 0,
    history: [7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0],
  },
  {
    name: "GDP (USD Billion)",
    value: "$126.8B",
    change: 5.8,
    history: [95.9, 96.1, 111.3, 107.6, 111.3, 126.8],
  },
];

// Core values
export const coreValues = [
  {
    id: "1",
    title: "Integrity",
    description:
      "We uphold the highest ethical standards in all our engagements, building trust through transparency and honesty.",
  },
  {
    id: "2",
    title: "Excellence",
    description:
      "We are committed to delivering exceptional results that exceed expectations and drive measurable impact.",
  },
  {
    id: "3",
    title: "Collaboration",
    description:
      "We work closely with our clients as partners, fostering relationships built on mutual respect and shared goals.",
  },
  {
    id: "4",
    title: "Innovation",
    description:
      "We embrace creative thinking and cutting-edge methodologies to solve complex business challenges.",
  },
  {
    id: "5",
    title: "Client Focus",
    description:
      "Our clients' success is our success. We tailor our approach to meet each client's unique needs.",
  },
];

// News items mock data
export const newsItems: NewsItem[] = [
  {
    id: "1",
    title:
      "UCS Partners with Commercial Bank of Ethiopia on Digital Transformation",
    excerpt:
      "A landmark partnership to modernize banking operations and enhance customer experience across all branches.",
    content: `UCS Ethiopia is proud to announce a strategic partnership with the Commercial Bank of Ethiopia (CBE) to lead their comprehensive digital transformation initiative. This multi-year engagement will focus on modernizing core banking operations, implementing advanced digital platforms, and enhancing the overall customer experience across CBE's extensive branch network.

The partnership encompasses several key areas including process optimization, technology integration, change management, and capacity building for over 2,000 employees. Our team of consultants will work closely with CBE's leadership to ensure a smooth transition while maintaining operational excellence throughout the transformation journey.

"This partnership represents a significant milestone in Ethiopia's financial sector modernization," said the UCS CEO. "We are committed to helping CBE become a leader in digital banking across Africa."`,
    category: "Partnership",
    image: "/images/news/cbe-partnership.jpg",
    date: "2026-01-15",
    author: "UCS Communications",
  },
  {
    id: "2",
    title:
      "Executive Leadership Summit 2026: Shaping Ethiopia's Business Future",
    excerpt:
      "UCS hosts 200+ executives for annual summit on emerging trends and strategic leadership.",
    content: `The fourth annual Executive Leadership Summit, hosted by UCS Ethiopia, brought together over 200 senior executives from Ethiopia's leading corporations to discuss emerging business trends and strategic leadership in an evolving economic landscape.

The two-day event featured keynote speeches from international thought leaders, panel discussions on topics ranging from sustainable growth to digital innovation, and interactive workshops designed to equip executives with practical tools for navigating change.

Key themes included the growing importance of ESG considerations, the role of technology in driving efficiency, and strategies for talent development in a competitive market. Participants also had the opportunity to network and share insights with peers from diverse industries.`,
    category: "Events",
    image: "/images/news/summit-2026.jpg",
    date: "2026-01-10",
    author: "UCS Communications",
  },
  {
    id: "3",
    title: "UCS Completes Strategic Plan Development for Awash Bank",
    excerpt:
      "Comprehensive five-year strategic roadmap delivered to guide growth and market expansion.",
    content: `UCS Ethiopia has successfully completed a comprehensive strategic planning engagement with Awash Bank, one of Ethiopia's premier private financial institutions. The project delivered a detailed five-year strategic roadmap designed to guide the bank's growth trajectory and market expansion efforts.

The engagement involved extensive stakeholder consultations, market analysis, competitive benchmarking, and scenario planning. The resulting strategy addresses key areas including retail banking expansion, corporate client acquisition, digital services development, and operational excellence initiatives.

"Working with Awash Bank has been an exceptional experience," noted the UCS project lead. "Their commitment to excellence and openness to strategic thinking made this collaboration highly productive."`,
    category: "Strategy",
    image: "/images/news/awash-strategy.jpg",
    date: "2025-12-28",
    author: "UCS Communications",
  },
  {
    id: "4",
    title: "New Professional Development Program Launches in February",
    excerpt:
      "Comprehensive skills development program designed for mid-career professionals across sectors.",
    content: `UCS Ethiopia is launching a new Professional Development Program in February 2026, designed specifically for mid-career professionals seeking to enhance their skills and advance their careers. The program offers a blend of classroom instruction, practical exercises, and mentorship opportunities.

The curriculum covers essential business competencies including strategic thinking, financial analysis, project management, communication skills, and leadership development. Participants will also gain exposure to emerging topics such as digital transformation and sustainable business practices.

The program runs for 12 weeks with flexible scheduling to accommodate working professionals. Early registration is now open with limited seats available.`,
    category: "Training",
    image: "/images/news/professional-dev.jpg",
    date: "2025-12-20",
    author: "UCS Training Division",
  },
  {
    id: "5",
    title: "UCS Research: Ethiopian Banking Sector Outlook 2026",
    excerpt:
      "Annual sector analysis reveals opportunities and challenges for financial institutions.",
    content: `UCS Ethiopia's Research Division has released its annual Ethiopian Banking Sector Outlook report, providing comprehensive analysis of trends, opportunities, and challenges facing financial institutions in 2026.

Key findings include projected sector growth of 18% in total assets, continued expansion of digital banking services, and increasing competition from new market entrants. The report also highlights regulatory developments and their potential impact on industry dynamics.

The full report is available to UCS clients and includes detailed projections, competitive landscape analysis, and strategic recommendations for banking executives.`,
    category: "Research",
    image: "/images/news/banking-outlook.jpg",
    date: "2025-12-15",
    author: "UCS Research Division",
  },
  {
    id: "6",
    title:
      "Change Management Excellence: Lessons from Dashen Bank Transformation",
    excerpt:
      "Case study on successful organizational change at one of Ethiopia's leading banks.",
    content: `UCS Ethiopia shares insights from our recent change management engagement with Dashen Bank, where we supported a comprehensive organizational transformation affecting over 5,000 employees across the institution.

The project involved restructuring key departments, implementing new operational processes, and facilitating cultural change to support the bank's strategic objectives. Our approach emphasized stakeholder engagement, clear communication, and phased implementation to minimize disruption.

Key success factors included strong executive sponsorship, dedicated change champions at all levels, and a robust training program to build capabilities. The case study offers valuable lessons for organizations embarking on similar transformation journeys.`,
    category: "Strategy",
    image: "/images/news/dashen-change.jpg",
    date: "2025-12-10",
    author: "UCS Communications",
  },
  {
    id: "7",
    title: "UCS Wins Advisory Mandate for Major Infrastructure Project",
    excerpt:
      "Selected to provide strategic advisory for significant public infrastructure development.",
    content: `UCS Ethiopia has been selected to provide strategic advisory services for a major public infrastructure development project, marking a significant expansion of our public sector practice.

The engagement will involve feasibility analysis, stakeholder coordination, and project governance advisory. Our team will work closely with government officials and international development partners to ensure successful project delivery.

This mandate reflects the growing recognition of UCS's capabilities in complex, multi-stakeholder engagements and our commitment to supporting Ethiopia's national development objectives.`,
    category: "Advisory",
    image: "/images/news/infrastructure.jpg",
    date: "2025-12-05",
    author: "UCS Communications",
  },
  {
    id: "8",
    title: "IT Training Partnership with Ethiopian Technology Association",
    excerpt:
      "New collaboration to deliver advanced IT skills training for technology professionals.",
    content: `UCS Ethiopia has entered into a partnership with the Ethiopian Technology Association to deliver advanced IT skills training programs for technology professionals across the country.

The partnership will offer courses in areas including cloud computing, cybersecurity, data analytics, and software development. Programs will be delivered through a combination of in-person workshops and online modules to maximize accessibility.

"This partnership represents our commitment to building Ethiopia's technology workforce," stated the UCS Training Director. "We are excited to work with ETA to create meaningful opportunities for tech professionals."`,
    category: "Partnership",
    image: "/images/news/it-training.jpg",
    date: "2025-11-28",
    author: "UCS Training Division",
  },
  {
    id: "9",
    title: "Customer Satisfaction Survey Best Practices Workshop",
    excerpt:
      "Free workshop for HR and marketing professionals on effective customer research methods.",
    content: `UCS Ethiopia is hosting a complimentary workshop on customer satisfaction survey best practices, designed for HR and marketing professionals seeking to improve their customer research capabilities.

The half-day workshop will cover survey design principles, sampling methodologies, data analysis techniques, and actionable insight generation. Participants will also receive templates and tools they can immediately apply in their organizations.

The workshop will be held at the UCS Training Center in Bole and is limited to 50 participants. Registration is required.`,
    category: "Events",
    image: "/images/news/workshop.jpg",
    date: "2025-11-20",
    author: "UCS Research Division",
  },
  {
    id: "10",
    title: "UCS Ethiopia Celebrates 15 Years of Excellence",
    excerpt:
      "Milestone anniversary marks a decade and a half of serving Ethiopian enterprises.",
    content: `UCS Ethiopia proudly celebrates its 15th anniversary, marking a decade and a half of dedicated service to Ethiopian enterprises and institutions. Since our founding in 2011, we have partnered with over 150 organizations across banking, manufacturing, government, and other sectors.

Our journey has been defined by a commitment to excellence, integrity, and client success. We have evolved from a small advisory firm to a comprehensive consultancy offering training, research, and communications services alongside our core advisory practice.

We thank our clients, partners, and team members who have made this journey possible. As we look to the future, we remain committed to driving growth and transformation for Ethiopian enterprises.`,
    category: "Company News",
    image: "/images/news/anniversary.jpg",
    date: "2025-11-15",
    author: "UCS Communications",
  },
  {
    id: "11",
    title: "Finance Department Restructuring Completed at Zemen Bank",
    excerpt:
      "Successful completion of organizational design project for leading private bank.",
    content: `UCS Ethiopia has completed a comprehensive finance department restructuring project at Zemen Bank, delivering an optimized organizational design that enhances efficiency and supports the bank's growth objectives.

The project involved detailed analysis of existing processes, benchmarking against industry best practices, and collaborative design of the new structure. Implementation support included change management, role definition, and capability building for finance team members.

"The restructured finance function is now better positioned to support Zemen Bank's strategic priorities," noted the UCS engagement manager. "We appreciate the bank's collaborative approach throughout the project."`,
    category: "Strategy",
    image: "/images/news/zemen-finance.jpg",
    date: "2025-11-10",
    author: "UCS Communications",
  },
  {
    id: "12",
    title: "New Office Opening in Bahir Dar",
    excerpt:
      "UCS expands regional presence with new office to serve clients in the Amhara region.",
    content: `UCS Ethiopia is pleased to announce the opening of our new regional office in Bahir Dar, expanding our presence to better serve clients in the Amhara region and surrounding areas.

The new office will provide the full range of UCS services including advisory, training, and research. A dedicated team of consultants will be based in Bahir Dar to ensure responsive, high-quality service delivery to regional clients.

"This expansion reflects our commitment to supporting businesses across Ethiopia," said the UCS CEO at the opening ceremony. "We are excited to bring our services closer to clients in this dynamic region."`,
    category: "Company News",
    image: "/images/news/bahir-dar.jpg",
    date: "2025-11-05",
    author: "UCS Communications",
  },
];

// Team members mock data
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Alemayehu Bekele",
    title: "Founder & Chief Executive Officer",
    image: "/images/team/ceo.jpg",
    bio: `Dr. Alemayehu Bekele is the founder and CEO of UCS Ethiopia, bringing over 25 years of experience in management consulting and executive leadership. Prior to founding UCS in 2011, he held senior positions at international consulting firms including roles in strategy development and organizational transformation. He has also served as an advisor to multiple government ministries on economic policy and institutional reform.

His career spans diverse industries including financial services, manufacturing, telecommunications, and public sector development. Dr. Bekele has led transformational engagements with Ethiopia's largest banks, helped design national development strategies, and advised multinational corporations entering the Ethiopian market. His expertise encompasses strategic planning, organizational design, change management, and capacity building at scale.

Dr. Bekele holds a PhD in Business Administration from Addis Ababa University, where his dissertation focused on competitive strategy in emerging markets, and an MBA from London Business School. He is a frequent speaker at industry conferences across Africa and has authored numerous articles on business strategy, organizational transformation, and economic development published in leading journals.

Under his visionary leadership, UCS Ethiopia has grown from a small advisory practice to the country's premier consultancy firm, serving over 150 major corporations, banks, insurance companies, and government institutions across Ethiopia and the East African region. He remains deeply committed to developing local consulting talent and contributing to Ethiopia's economic transformation.`,
    isOwner: true,
    yearsOfExperience: 25,
    email: "alemayehu@ucsethiopia.com",
    linkedinUrl: "https://linkedin.com",
    expertise: [
      "Business Strategy",
      "Organizational Transformation",
      "Executive Leadership",
      "Change Management",
      "Public Sector Advisory",
    ],
    achievements: [
      "Founded UCS Ethiopia, which has grown to serve 150+ clients",
      "Led transformations for Ethiopia's largest financial institutions",
      "Advisor to multiple government ministries on economic policy",
      "Published over 20 articles on business strategy and transformation",
      "Recognized thought leader in African management consulting",
    ],
    certifications: [
      "PhD in Business Administration - Addis Ababa University",
      "MBA - London Business School",
    ],
  },
  {
    id: "2",
    name: "Tigist Haile",
    title: "Managing Director, Advisory Services",
    image: "/images/team/director-advisory.jpg",
    bio: `Tigist Haile leads UCS Ethiopia's Advisory Services practice, overseeing a team of consultants serving clients across banking, manufacturing, and public sector engagements. She brings 18 years of consulting experience and deep expertise in organizational development and transformation.

Prior to joining UCS, Tigist worked at a Big Four firm and held corporate strategy roles at leading Ethiopian corporations. She holds an MBA from the Ethiopian Civil Service University and is a certified project management professional.

Tigist is passionate about developing the next generation of Ethiopian business leaders and actively mentors young professionals within and outside the firm.`,
    yearsOfExperience: 18,
    email: "tigist@ucsethiopia.com",
    linkedinUrl: "https://linkedin.com",
    expertise: [
      "Organizational Development",
      "Strategy Implementation",
      "Banking & Financial Services",
      "Process Optimization",
      "Talent Management",
    ],
    achievements: [
      "Led strategic engagements with Ethiopia's top 5 banks",
      "Managed organizational transformation for 50+ companies",
      "Developed leadership programs for 2,000+ professionals",
      "Mentors 15+ junior consultants at UCS",
      "Published research on organizational change in East Africa",
    ],
    certifications: [
      "MBA - Ethiopian Civil Service University",
      "PMP - Project Management Professional",
    ],
  },
  {
    id: "3",
    name: "Yohannes Tadesse",
    title: "Director, Training & Development",
    image: "/images/team/director-training.jpg",
    bio: `Yohannes Tadesse directs UCS Ethiopia's Training & Development division, designing and delivering programs that build capabilities across all levels of client organizations. He has trained over 5,000 professionals during his 15-year career in corporate education.

Yohannes specializes in executive development, leadership training, and skills-based learning programs. He holds a Master's degree in Human Resource Development and has obtained certifications from leading international training institutions.

He is committed to making quality professional development accessible to Ethiopian businesses of all sizes and regularly contributes thought leadership on learning and development topics.`,
    yearsOfExperience: 15,
    email: "yohannes@ucsethiopia.com",
    linkedinUrl: "https://linkedin.com",
    expertise: [
      "Executive Development",
      "Leadership Training",
      "Curriculum Design",
      "Organizational Learning",
      "Change Facilitation",
    ],
    achievements: [
      "Trained over 5,000 professionals across Ethiopia",
      "Designed 20+ customized training programs",
      "Developed executive development curriculum for 5 banks",
      "Speaker at 10+ international training conferences",
      "Created digital learning platform for remote training",
    ],
    certifications: [
      "Master's in Human Resource Development",
      "International Training Certification - Dublin Institute",
    ],
  },
  {
    id: "4",
    name: "Sara Mengistu",
    title: "Director, Research & Publications",
    image: "/images/team/director-research.jpg",
    bio: `Sara Mengistu leads UCS Ethiopia's Research & Publications division, producing high-quality research that informs business decisions and public policy. Her team conducts sector studies, feasibility analyses, and customer research for clients across industries.

Sara brings 12 years of research experience and has authored numerous published studies on Ethiopian economic and business topics. She holds a Master's degree in Economics from Addis Ababa University and has completed advanced research methodology training internationally.

She is committed to producing research that meets the highest standards of rigor while remaining practical and actionable for decision-makers.`,
    yearsOfExperience: 12,
    email: "sara@ucsethiopia.com",
    linkedinUrl: "https://linkedin.com",
    expertise: [
      "Economic Research",
      "Market Analysis",
      "Feasibility Studies",
      "Quantitative Research",
      "Data Analytics",
    ],
    achievements: [
      "Published 15+ research studies on Ethiopian economy",
      "Completed feasibility studies for 25+ infrastructure projects",
      "Established UCS Research Division from scratch",
      "Collaborated with World Bank on economic studies",
      "Cited expert in major business publications",
    ],
    certifications: [
      "Master's in Economics - Addis Ababa University",
      "Advanced Research Methodology - Stanford University",
    ],
  },
  {
    id: "5",
    name: "Bereket Assefa",
    title: "Senior Consultant, Financial Services",
    image: "/images/team/consultant-finance.jpg",
    bio: `Bereket Assefa is a Senior Consultant specializing in financial services engagements, with particular expertise in banking strategy and operations. He has led projects at several of Ethiopia's largest banks and insurance companies.

With 10 years of consulting experience, Bereket brings deep knowledge of the Ethiopian financial sector and strong analytical capabilities. He holds an MBA with a concentration in finance and is a CFA charterholder.

Bereket is known for his ability to translate complex financial concepts into practical recommendations that drive results for clients.`,
    yearsOfExperience: 10,
    email: "bereket@ucsethiopia.com",
    linkedinUrl: "https://linkedin.com",
    expertise: [
      "Banking Strategy",
      "Financial Operations",
      "Risk Management",
      "Digital Banking",
      "Cost Optimization",
    ],
    achievements: [
      "Led strategy engagements with 8 major Ethiopian banks",
      "Implemented cost reduction initiatives saving $10M+",
      "Designed digital banking platform for 2 banks",
      "Managed operations improvement projects for 5 institutions",
      "Recognized expert in Ethiopian banking sector",
    ],
    certifications: ["MBA in Finance", "CFA Charterholder", "CPA"],
  },
  {
    id: "6",
    name: "Hiwot Dereje",
    title: "Senior Consultant, Change Management",
    image: "/images/team/consultant-change.jpg",
    bio: `Hiwot Dereje is a Senior Consultant focused on change management and organizational development. She helps clients navigate complex transformations while maintaining employee engagement and operational continuity.

Hiwot has 8 years of consulting experience and holds certifications in change management and organizational development. She completed her graduate studies at the Ethiopian Management Institute.

She is passionate about helping organizations build change-ready cultures and regularly facilitates workshops on change leadership and resilience.`,
    yearsOfExperience: 8,
    email: "hiwot@ucsethiopia.com",
    linkedinUrl: "https://linkedin.com",
    expertise: [
      "Change Management",
      "Organizational Design",
      "Stakeholder Engagement",
      "Leadership Development",
      "Culture Transformation",
    ],
    achievements: [
      "Led change initiatives affecting 5,000+ employees",
      "Facilitated 30+ organizational transformations",
      "Developed change management frameworks for 10 organizations",
      "Workshop facilitator on change leadership for 1,000+ professionals",
      "Reduced transformation risk by average 40%",
    ],
    certifications: [
      "Prosci Change Management Certification",
      "Graduate Diploma - Ethiopian Management Institute",
    ],
  },
  {
    id: "7",
    name: "Daniel Kebede",
    title: "Manager, Communications & Promotion",
    image: "/images/team/manager-comms.jpg",
    bio: `Daniel Kebede manages UCS Ethiopia's Communications & Promotion services, helping clients develop compelling materials that effectively communicate their messages to key stakeholders.

Daniel brings 7 years of experience in corporate communications and marketing. His team produces everything from annual reports and company profiles to training materials and promotional campaigns.

He holds a degree in Marketing Management and has completed advanced training in corporate communications and brand strategy.`,
    yearsOfExperience: 7,
    email: "daniel@ucsethiopia.com",
    linkedinUrl: "https://linkedin.com",
    expertise: [
      "Corporate Communications",
      "Brand Strategy",
      "Content Development",
      "Marketing Communications",
      "Stakeholder Engagement",
    ],
    achievements: [
      "Produced 100+ corporate communications projects",
      "Developed brand strategies for 15 organizations",
      "Created annual reports for 20+ major companies",
      "Led digital communications transformation for 3 banks",
      "Recognized for award-winning communications campaigns",
    ],
    certifications: [
      "Bachelor's in Marketing Management",
      "Advanced Brand Strategy - International Institute",
    ],
  },
];

// Training programs mock data
export const trainingPrograms: TrainingProgram[] = [
  {
    id: "1",
    title: "Executive Development",
    description:
      "Strategic leadership programs for C-suite executives and board members.",
    icon: "Crown",
  },
  {
    id: "2",
    title: "Management Development",
    description:
      "Building capabilities for mid-level managers and emerging leaders.",
    icon: "Users",
  },
  {
    id: "3",
    title: "Professional Development",
    description:
      "Skills enhancement for individual contributors and specialists.",
    icon: "GraduationCap",
  },
  {
    id: "4",
    title: "IT Training",
    description:
      "Technical skills development in software, systems, and digital tools.",
    icon: "Monitor",
  },
  {
    id: "5",
    title: "Finance Training",
    description:
      "Financial analysis, reporting, and management accounting programs.",
    icon: "Calculator",
  },
  {
    id: "6",
    title: "Human Resources",
    description:
      "HR best practices, talent management, and organizational development.",
    icon: "Heart",
  },
  {
    id: "7",
    title: "Marketing & PR",
    description:
      "Brand building, communications, and stakeholder engagement skills.",
    icon: "Megaphone",
  },
];

// Client logos mock data
export const clientLogos: ClientLogo[] = [
  { id: "1", name: "Awash Bank", logo: "/images/clients/awash-bank.svg" },
  {
    id: "2",
    name: "Awash Insurance",
    logo: "/images/clients/awash-insurance.svg",
  },
  { id: "3", name: "Oromia Bank", logo: "/images/clients/oromia-bank.svg" },
  {
    id: "4",
    name: "Oromia Insurance Company",
    logo: "/images/clients/oromia-insurance.svg",
  },
  {
    id: "5",
    name: "Hibret Insurance (Unic Ethiopia)",
    logo: "/images/clients/hibret-insurance.svg",
  },
  {
    id: "6",
    name: "Global Bank Ethiopia",
    logo: "/images/clients/global-bank.svg",
  },
  { id: "7", name: "Kenera", logo: "/images/clients/kenera.svg" },
  { id: "8", name: "Gebecon PLC", logo: "/images/clients/gebecon.svg" },
  { id: "9", name: "Ministry of Agriculture", logo: "/images/clients/moa.svg" },
  { id: "10", name: "Minaye PLC", logo: "/images/clients/minaye.svg" },
  { id: "11", name: "DH Geda", logo: "/images/clients/dh.svg" },
  {
    id: "12",
    name: "Ethiopian Water Technology Institute",
    logo: "/images/clients/ewti.svg",
  },
  {
    id: "13",
    name: "House of Peoples' Representatives",
    logo: "/images/clients/hpr.svg",
  },
];

// Strategic partners mock data
export const strategicPartners: Partner[] = [
  {
    id: "1",
    name: "Glocal Management Partners",
    logo: "/images/partners/glocal.svg",
    description: "International consulting firm",
  },
  {
    id: "2",
    name: "B and M Development Consultants",
    logo: "/images/partners/bm-dev.svg",
    description: "Development consulting",
  },
  {
    id: "3",
    name: "JEPICS",
    logo: "/images/partners/jepics.svg",
    description: "Japanese consulting partner",
  },
  {
    id: "4",
    name: "Halkago Connect",
    logo: "/images/partners/halkago.svg",
    description: "Technology solutions",
  },
  {
    id: "5",
    name: "Zinger Solutions Limited",
    logo: "/images/partners/zinger.svg",
    description: "Business solutions",
  },
];

// Service pillars mock data
export const servicePillars: ServicePillar[] = [
  {
    id: "1",
    title: "Training",
    description:
      "Comprehensive learning programs designed to build capabilities at all organizational levels, from executive leadership to technical specialists.",
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
      "Strategic consulting services that help organizations navigate complex challenges and achieve sustainable growth.",
    offerings: [
      "Strategic Planning",
      "Organizational Change Management",
      "Transformation Management",
      "Organizational Development",
      "Project Portfolio Management",
      "Performance Improvement",
      "Risk Management Advisory",
    ],
    image: "/images/services/advisory.jpg",
  },
  {
    id: "3",
    title: "Research & Publication",
    description:
      "Rigorous research and analysis that provides the insights organizations need to make informed decisions.",
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
      "Creative services that help organizations communicate effectively with their stakeholders and build their brands.",
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

// Simulate API delay
export function simulateApiDelay<T>(data: T, delay = 800): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

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
