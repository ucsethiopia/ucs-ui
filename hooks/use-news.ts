"use client";

import { useState, useEffect, useMemo } from "react";

// Types
export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  trend?: number[]; // For Economic News
  impact?: "high" | "medium" | "low"; // For Economic News
  author?: string; // For Firm News
  content?: string; // For Firm News
}

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

const allNewsData: NewsItem[] = [
  {
    id: 1,
    title: "UCS Partners with Commercial Bank of Ethiopia on Digital Transformation",
    excerpt: "A landmark partnership to modernize banking operations and enhance customer experience across all branches.",
    content: `UCS Ethiopia is proud to announce a strategic partnership with the Commercial Bank of Ethiopia (CBE) to lead their comprehensive digital transformation initiative. This multi-year engagement will focus on modernizing core banking operations, implementing advanced digital platforms, and enhancing the overall customer experience across CBE's extensive branch network.\n\nThe partnership encompasses several key areas including process optimization, technology integration, change management, and capacity building for over 2,000 employees. Our team of consultants will work closely with CBE's leadership to ensure a smooth transition while maintaining operational excellence throughout the transformation journey.\n\n"This partnership represents a significant milestone in Ethiopia's financial sector modernization," said the UCS CEO. "We are committed to helping CBE become a leader in digital banking across Africa."`,
    category: "Partnership",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
    date: "2026-01-15",
    author: "UCS Communications",
  },
  {
    id: 2,
    title: "Executive Leadership Summit 2026: Shaping Ethiopia's Business Future",
    excerpt: "UCS hosts 200+ executives for annual summit on emerging trends and strategic leadership.",
    content: `The fourth annual Executive Leadership Summit, hosted by UCS Ethiopia, brought together over 200 senior executives from Ethiopia's leading corporations to discuss emerging business trends and strategic leadership in an evolving economic landscape.\n\nThe two-day event featured keynote speeches from international thought leaders, panel discussions on topics ranging from sustainable growth to digital innovation, and interactive workshops designed to equip executives with practical tools for navigating change.\n\nKey themes included the growing importance of ESG considerations, the role of technology in driving efficiency, and strategies for talent development in a competitive market.`,
    category: "Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    date: "2026-01-10",
    author: "UCS Communications",
  },
  {
    id: 3,
    title: "UCS Completes Strategic Plan Development for Awash Bank",
    excerpt: "Comprehensive five-year strategic roadmap delivered to guide growth and market expansion.",
    content: `UCS Ethiopia has successfully completed a comprehensive strategic planning engagement with Awash Bank, one of Ethiopia's premier private financial institutions. The project delivered a detailed five-year strategic roadmap designed to guide the bank's growth trajectory and market expansion efforts.\n\nThe engagement involved extensive stakeholder consultations, market analysis, competitive benchmarking, and scenario planning. The resulting strategy addresses key areas including retail banking expansion, corporate client acquisition, digital services development, and operational excellence initiatives.`,
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    date: "2025-12-28",
    author: "UCS Communications",
  },
  {
    id: 4,
    title: "New Professional Development Program Launches in February",
    excerpt: "Comprehensive skills development program designed for mid-career professionals across sectors.",
    content: `UCS Ethiopia is launching a new Professional Development Program in February 2026, designed specifically for mid-career professionals seeking to enhance their skills and advance their careers. The program offers a blend of classroom instruction, practical exercises, and mentorship opportunities.\n\nThe curriculum covers essential business competencies including strategic thinking, financial analysis, project management, communication skills, and leadership development. The program runs for 12 weeks with flexible scheduling to accommodate working professionals.`,
    category: "Training",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    date: "2025-12-20",
    author: "UCS Training Division",
  },
  {
    id: 5,
    title: "UCS Research: Ethiopian Banking Sector Outlook 2026",
    excerpt: "Annual sector analysis reveals opportunities and challenges for financial institutions.",
    content: `UCS Ethiopia's Research Division has released its annual Ethiopian Banking Sector Outlook report, providing comprehensive analysis of trends, opportunities, and challenges facing financial institutions in 2026.\n\nKey findings include projected sector growth of 18% in total assets, continued expansion of digital banking services, and increasing competition from new market entrants. The report also highlights regulatory developments and their potential impact on industry dynamics.\n\nThe full report is available to UCS clients and includes detailed projections, competitive landscape analysis, and strategic recommendations for banking executives.`,
    category: "Research",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
    date: "2025-12-15",
    author: "UCS Research Division",
  },
  {
    id: 6,
    title: "Change Management Excellence: Lessons from Dashen Bank Transformation",
    excerpt: "Case study on successful organizational change at one of Ethiopia's leading banks.",
    content: `UCS Ethiopia shares insights from our recent change management engagement with Dashen Bank, where we supported a comprehensive organizational transformation affecting over 5,000 employees across the institution.\n\nThe project involved restructuring key departments, implementing new operational processes, and facilitating cultural change to support the bank's strategic objectives. Our approach emphasized stakeholder engagement, clear communication, and phased implementation to minimize disruption.\n\nKey success factors included strong executive sponsorship, dedicated change champions at all levels, and a robust training program to build capabilities.`,
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
    date: "2025-12-10",
    author: "UCS Communications",
  },
  {
    id: 7,
    title: "UCS Wins Advisory Mandate for Major Infrastructure Project",
    excerpt: "Selected to provide strategic advisory for significant public infrastructure development.",
    content: `UCS Ethiopia has been selected to provide strategic advisory services for a major public infrastructure development project, marking a significant expansion of our public sector practice.\n\nThe engagement will involve feasibility analysis, stakeholder coordination, and project governance advisory. Our team will work closely with government officials and international development partners to ensure successful project delivery.\n\nThis mandate reflects the growing recognition of UCS's capabilities in complex, multi-stakeholder engagements and our commitment to supporting Ethiopia's national development objectives.`,
    category: "Advisory",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
    date: "2025-12-05",
    author: "UCS Communications",
  },
  {
    id: 8,
    title: "IT Training Partnership with Ethiopian Technology Association",
    excerpt: "New collaboration to deliver advanced IT skills training for technology professionals.",
    content: `UCS Ethiopia has entered into a partnership with the Ethiopian Technology Association to deliver advanced IT skills training programs for technology professionals across the country.\n\nThe partnership will offer courses in areas including cloud computing, cybersecurity, data analytics, and software development. Programs will be delivered through a combination of in-person workshops and online modules to maximize accessibility.\n\n"This partnership represents our commitment to building Ethiopia's technology workforce," stated the UCS Training Director.`,
    category: "Partnership",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
    date: "2025-11-28",
    author: "UCS Training Division",
  },
  {
    id: 9,
    title: "Customer Satisfaction Survey Best Practices Workshop",
    excerpt: "Free workshop for HR and marketing professionals on effective customer research methods.",
    content: `UCS Ethiopia is hosting a complimentary workshop on customer satisfaction survey best practices, designed for HR and marketing professionals seeking to improve their customer research capabilities.\n\nThe half-day workshop will cover survey design principles, sampling methodologies, data analysis techniques, and actionable insight generation. Participants will also receive templates and tools they can immediately apply in their organizations.\n\nThe workshop will be held at the UCS Training Center in Bole and is limited to 50 participants.`,
    category: "Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    date: "2025-11-20",
    author: "UCS Research Division",
  },
  {
    id: 10,
    title: "UCS Ethiopia Celebrates 15 Years of Excellence",
    excerpt: "Milestone anniversary marks a decade and a half of serving Ethiopian enterprises.",
    content: `UCS Ethiopia proudly celebrates its 15th anniversary, marking a decade and a half of dedicated service to Ethiopian enterprises and institutions. Since our founding in 2011, we have partnered with over 150 organizations across banking, manufacturing, government, and other sectors.\n\nOur journey has been defined by a commitment to excellence, integrity, and client success. We have evolved from a small advisory firm to a comprehensive consultancy offering training, research, and communications services.\n\nWe thank our clients, partners, and team members who have made this journey possible.`,
    category: "Company News",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
    date: "2025-11-15",
    author: "UCS Communications",
  },
  {
    id: 11,
    title: "Finance Department Restructuring Completed at Zemen Bank",
    excerpt: "Successful completion of organizational design project for leading private bank.",
    content: `UCS Ethiopia has completed a comprehensive finance department restructuring project at Zemen Bank, delivering an optimized organizational design that enhances efficiency and supports the bank's growth objectives.\n\nThe project involved detailed analysis of existing processes, benchmarking against industry best practices, and collaborative design of the new structure. Implementation support included change management, role definition, and capability building for finance team members.`,
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
    date: "2025-11-10",
    author: "UCS Communications",
  },
  {
    id: 12,
    title: "New Office Opening in Bahir Dar",
    excerpt: "UCS expands regional presence with new office to serve clients in the Amhara region.",
    content: `UCS Ethiopia is pleased to announce the opening of our new regional office in Bahir Dar, expanding our presence to better serve clients in the Amhara region and surrounding areas.\n\nThe new office will provide the full range of UCS services including advisory, training, and research. A dedicated team of consultants will be based in Bahir Dar to ensure responsive, high-quality service delivery to regional clients.\n\n"This expansion reflects our commitment to supporting businesses across Ethiopia," said the UCS CEO at the opening ceremony.`,
    category: "Company News",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
    date: "2025-11-05",
    author: "UCS Communications",
  },
];

// 3. Paginated all-news hook (for the /news archive page)
export const useNews = (initialLimit = 9) => {
  const [displayedCount, setDisplayedCount] = useState(initialLimit);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const loadMore = async () => {
    setIsLoadingMore(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 600));
    setDisplayedCount(allNewsData.length);
    setIsLoadingMore(false);
  };

  const data = allNewsData.slice(0, displayedCount);
  const hasMore = displayedCount < allNewsData.length;

  return { data, loading, isLoadingMore, hasMore, loadMore };
};

// 1. Market/Economic News Hook
export const useMarketNews = () => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([
        {
          id: 1,
          title: "Ethiopia's Financial Sector Modernization Initiative",
          excerpt:
            "Central Bank announces comprehensive digital transformation roadmap for banking sector.",
          category: "Finance",
          date: "2024-01-15",
          trend: [45, 52, 48, 61, 58, 72, 68],
          impact: "high",
        },
        {
          id: 2,
          title: "Agricultural Export Revenue Reaches Record High",
          excerpt:
            "Coffee and sesame exports drive unprecedented foreign currency earnings.",
          category: "Trade",
          date: "2024-01-14",
          trend: [30, 35, 42, 38, 55, 62, 71],
          impact: "high",
        },
        {
          id: 3,
          title: "Manufacturing Sector Growth Accelerates",
          excerpt:
            "Industrial parks report 23% increase in production capacity utilization.",
          category: "Industry",
          date: "2024-01-13",
          trend: [40, 42, 45, 50, 48, 55, 60],
          impact: "medium",
        },
        {
          id: 4,
          title: "Telecom Privatization Attracts Global Investors",
          excerpt:
            "International consortium submits competitive bid for Ethio Telecom stake.",
          category: "Telecom",
          date: "2024-01-12",
          trend: [55, 58, 52, 65, 70, 68, 75],
          impact: "high",
        },
        {
          id: 5,
          title: "Infrastructure Development Fund Launched",
          excerpt:
            "Government establishes $2B infrastructure development fund with international partners.",
          category: "Infrastructure",
          date: "2024-01-11",
          trend: [25, 30, 35, 40, 50, 55, 65],
          impact: "high",
        },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
};

// 2. Firm News Hook
export const useFirmNews = (limit = 9) => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const allNews = useMemo(
    () => [
      {
        id: 1,
        title: "UCS Partners with Ministry of Finance on Public Sector Reform",
        excerpt:
          "Strategic advisory engagement to modernize government financial management systems across federal institutions.",
        content:
          "Ultimate Consultancy Service has been selected as the lead strategic advisor for the Ministry of Finance's comprehensive public sector reform initiative. This landmark engagement will focus on modernizing financial management systems, strengthening governance frameworks, and building institutional capacity across federal government agencies. The project, which spans 18 months, will leverage UCS's deep expertise in public sector transformation and our proven track record of delivering sustainable reform outcomes in complex institutional environments.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
        date: "2024-01-15",
        category: "Advisory",
        author: "Communications Team",
      },
      {
        id: 2,
        title: "Executive Leadership Program Graduates 45 Senior Leaders",
        excerpt:
          "Celebrating the successful completion of our flagship 12-month executive development program.",
        content:
          "We are proud to announce the graduation of 45 senior executives from our flagship Executive Leadership Program. This intensive 12-month program combines rigorous academic content with practical leadership challenges, preparing Ethiopia's next generation of business leaders. Participants represented diverse sectors including banking, manufacturing, agriculture, and technology, fostering valuable cross-industry perspectives and networks that will drive Ethiopia's economic development for years to come.",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
        date: "2024-01-12",
        category: "Training",
        author: "Training Division",
      },
      {
        id: 3,
        title:
          "New Research: Ethiopian Private Sector Development Outlook 2024",
        excerpt:
          "Comprehensive analysis of growth opportunities and challenges facing Ethiopian businesses.",
        content:
          "UCS Research Division has released its annual Ethiopian Private Sector Development Outlook, providing comprehensive analysis of the business environment, sectoral trends, and strategic opportunities. This year's report highlights the significant potential in manufacturing, agro-processing, and digital services, while addressing key challenges including access to finance, infrastructure gaps, and regulatory complexity. The research draws on extensive stakeholder consultations and quantitative analysis to provide actionable insights for business leaders and policymakers.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        date: "2024-01-10",
        category: "Research",
        author: "Research Division",
      },
      {
        id: 4,
        title: "UCS Expands Advisory Practice with New Service Lines",
        excerpt:
          "Introduction of digital transformation and ESG advisory capabilities to serve evolving client needs.",
        content:
          "In response to growing market demand, UCS is expanding its advisory practice with two new specialized service lines: Digital Transformation Advisory and ESG (Environmental, Social, Governance) Consulting. These additions reflect our commitment to helping clients navigate the rapidly evolving business landscape and position themselves for sustainable long-term success. Our digital transformation practice will focus on technology strategy, digital operations, and innovation management, while our ESG practice will help organizations develop and implement comprehensive sustainability strategies.",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
        date: "2024-01-08",
        category: "Advisory",
        author: "Managing Partner",
      },
      {
        id: 5,
        title: "Strategic Partnership with Leading European Business School",
        excerpt:
          "Academic collaboration to enhance executive education offerings with global perspectives.",
        content:
          "UCS is pleased to announce a strategic partnership with a leading European business school to enhance our executive education offerings. This collaboration will bring world-class faculty, cutting-edge curriculum content, and global best practices to our training programs. The partnership will enable program participants to benefit from international perspectives while maintaining our focus on addressing the unique challenges and opportunities of the Ethiopian business context. Joint programs will commence in Q2 2024.",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
        date: "2024-01-05",
        category: "Partnership",
        author: "Academic Relations",
      },
      {
        id: 6,
        title: "UCS Hosts Annual Economic Forum 2024",
        excerpt:
          "Premier gathering of business leaders, policymakers, and academics to discuss Ethiopia's economic trajectory.",
        content:
          "The UCS Annual Economic Forum brought together over 300 participants including senior government officials, CEOs, international development partners, and leading academics. This year's forum focused on 'Building Resilient Economies: Ethiopia's Path to Sustainable Growth.' Panel discussions covered topics ranging from macroeconomic stability and private sector development to innovation ecosystems and regional integration. The event reinforced UCS's role as a convener of critical economic policy dialogue.",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
        date: "2024-01-03",
        category: "Events",
        author: "Events Team",
      },
      {
        id: 7,
        title: "New CEO Appointed to Lead UCS into Next Growth Phase",
        excerpt:
          "Board announces leadership transition as firm celebrates 15 years of impact.",
        content:
          "The UCS Board of Directors has appointed Dr. Samrawit Tekle as Chief Executive Officer, effective February 1, 2024. Dr. Tekle brings over 20 years of consulting and business leadership experience, most recently serving as Managing Partner of our Advisory Practice. Her appointment comes as UCS celebrates 15 years of delivering transformative impact for Ethiopian organizations. Under her leadership, the firm will focus on scaling its operations, expanding service offerings, and deepening its commitment to developing Ethiopia's institutional and human capital.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
        date: "2023-12-28",
        category: "Leadership",
        author: "Board of Directors",
      },
      {
        id: 8,
        title: "UCS Wins Excellence in Consulting Award",
        excerpt:
          "Regional recognition for outstanding project delivery and client impact.",
        content:
          "UCS has been honored with the Excellence in Consulting Award at the East African Business Awards. The award recognizes our consistently high-quality project delivery, innovative methodologies, and measurable impact on client organizations. The judging panel particularly highlighted our work in public sector reform and executive education as exemplifying consulting excellence. This recognition validates our commitment to maintaining the highest professional standards while delivering practical, sustainable solutions.",
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
        date: "2023-12-20",
        category: "Awards",
        author: "Communications Team",
      },
      {
        id: 9,
        title: "Launching Women in Leadership Initiative",
        excerpt:
          "New program to accelerate career advancement for women in Ethiopian business.",
        content:
          "UCS is launching the Women in Leadership Initiative, a comprehensive program designed to address gender gaps in senior management across Ethiopian organizations. The initiative includes mentorship, skills development, networking opportunities, and research on barriers to women's advancement. We are partnering with leading corporations and international organizations to create meaningful pathways for talented women to reach executive roles. Applications for the inaugural cohort are now open, with the program commencing in March 2024.",
        image:
          "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
        date: "2023-12-15",
        category: "Social Impact",
        author: "Diversity & Inclusion Office",
      },
    ],
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(allNews.slice(0, limit));
      setHasMore(limit < allNews.length);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [limit, allNews]);

  return { data, loading, hasMore };
};
