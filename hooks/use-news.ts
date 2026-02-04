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
