// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE SHEETS CONFIG
// ─────────────────────────────────────────────────────────────────────────────
//
// STEP 1 — Paste the full "Publish to web" URL you got from Google Sheets.
//   (File → Share → Publish to web → Publish → copy the link)
export const GOOGLE_SHEET_PUBLISHED_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9UkMFS2AZ4LyKoWHHgt9GuoERcb3ZnBj94MuwOkTVrSOKLQzbFBn6ajZm1WlgbHv1p2RkMSKaldM3/pubhtml";

// STEP 2 — Find the GID number for each tab:
//   • Open your Google Sheet in the normal editing view
//   • Click each tab at the bottom
//   • Look at the browser URL: it ends with  ...#gid=1234567890
//   • That number is the GID — paste it below
//   • The very first tab almost always has gid=0
export const SHEET_GIDS = {
  programs: 0, // "Program" tab
  activities: 151584671, // ← paste your "Activity" tab GID here
  achievements: 357506044, // ← paste your "Achievements" tab GID here
  images: 1182510484, // ← paste your "Images" tab GID here
};
//
// Expected columns per tab:
//   Program      → Program ID | Title | Description
//   Activity     → Program ID | Activity ID | Title | Short Description | Full Description
//   Achievements → Title | Short Description | Full Description | Image (Cloudinary public URL)
//   Images       → Activity ID | Image ID | URL (Cloudinary public URL)

// ─────────────────────────────────────────────────────────────────────────────
// PERSONAL PROFILE
// ─────────────────────────────────────────────────────────────────────────────
// photo  → place your photo at public/profile.jpg
// video  → place your intro video at public/intro.mp4
// cv     → place your CV at public/cv.pdf

export const PROFILE = {
  name: "Ekjon Manush",
  tagline: "Social Worker & Development Professional",
  about: `A dedicated social worker and development professional with a passion for
community empowerment, civic engagement, and creating sustainable change. With
years of experience across advocacy, capacity building, and program management,
I work at the intersection of social justice and development to create lasting
impact in underserved communities.`,
  photo: "/profile.jpg",
  videoEmbed: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2245973332891157%2F&show_text=false&width=560&t=0",
  cv: "/cv.pdf",
  email: "your@email.com",
  linkedin: "https://linkedin.com/in/yourprofile",
  location: "Your City, Country",
};

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND — EDUCATION CATEGORIES
// dateRange format: "MM/YY – MM/YY"  (use "Present" for ongoing)
// ─────────────────────────────────────────────────────────────────────────────
// logo → filename inside public/logos/  (e.g. "brac.png")
//        leave as "" to show the default placeholder
export const EDUCATION_CATEGORIES = [
  {
    category: "Academic Degree",
    items: [
      {
        dateRange: "09/20 – 06/22",
        degree: "Master of Social Work (MSW)",
        institution: "University Name",
        location: "City, Country",
        logo: "images.png",
        description: "Specialisation in Community Development and Policy Advocacy.",
      },
      {
        dateRange: "09/16 – 06/19",
        degree: "Bachelor of Arts in Sociology",
        institution: "University Name",
        location: "City, Country",
        logo: "images.png",
        description: "Minor in International Development Studies.",
      },
    ],
  },
  {
    category: "Exchange Semester",
    items: [
      {
        dateRange: "01/18 – 06/18",
        degree: "Exchange Semester — International Development",
        institution: "Partner University",
        location: "City, Country",
        logo: "images.png",
        description: "Focused on comparative development policy and cross-cultural communication.",
      },
    ],
  },
  {
    category: "Summer Program",
    items: [
      {
        dateRange: "07/17 – 08/17",
        degree: "Certificate in Project Management",
        institution: "Professional Institute",
        location: "City, Country",
        logo: "images.png",
        description: "Focus on monitoring, evaluation, and results-based management.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND — PROFESSIONAL EXPERIENCE
// dateRange format: "MM/YY – MM/YY"  (use "Present" for ongoing)
// ─────────────────────────────────────────────────────────────────────────────
export const EXPERIENCE_CATEGORIES = [
  {
    category: "Full Time",
    items: [
      {
        dateRange: "01/23 – Present",
        role: "Senior Programme Officer",
        organization: "Organisation Name",
        location: "City, Country",
        logo: "images.png",
        shortDesc: "Leading advocacy campaigns and capacity-building initiatives across three regional offices.",
        description:
          "Leading advocacy campaigns and capacity-building initiatives across three regional offices. Responsible for stakeholder coordination, donor reporting, and managing a cross-functional team of twelve. Developed a flagship community resilience programme that reached over 8,000 beneficiaries in its first year.",
      },
      {
        dateRange: "06/20 – 12/22",
        role: "Community Development Specialist",
        organization: "NGO Name",
        location: "City, Country",
        logo: "images.png",
        shortDesc: "Designed and delivered community development programmes reaching over 5,000 beneficiaries.",
        description:
          "Designed and delivered community development programmes reaching over 5,000 beneficiaries across four districts. Led participatory needs assessments, co-facilitated community action planning workshops, and coordinated with local government on policy alignment. Produced quarterly impact reports for international donors.",
      },
    ],
  },
  {
    category: "Part Time",
    items: [
      {
        dateRange: "01/19 – 05/20",
        role: "Programme Coordinator",
        organization: "Development Organisation",
        location: "City, Country",
        logo: "images.png",
        shortDesc: "Coordinated multi-stakeholder projects focused on youth civic engagement and social inclusion.",
        description:
          "Coordinated multi-stakeholder projects focused on youth civic engagement and social inclusion. Liaised between government bodies, civil society organisations, and community representatives to align programme objectives. Supported M&E processes and contributed to mid-term and final evaluation reports.",
      },
    ],
  },
  {
    category: "Volunteering",
    items: [],
  },
  {
    category: "Academic",
    items: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO / FALLBACK DATA  (shown when Sheet ID is not configured)
// ─────────────────────────────────────────────────────────────────────────────
export const DEMO_PROGRAMS = [
  {
    id: "P01",
    title: "Advocacy & Communication",
    description:
      "Developing and executing advocacy campaigns that amplify community voices and drive policy change at local and national levels.",
  },
  {
    id: "P02",
    title: "Civic Engagement & Development Initiatives",
    description:
      "Mobilising citizens, building civic capital, and co-designing development initiatives rooted in community priorities.",
  },
  {
    id: "P03",
    title: "Partnerships & Stakeholder Engagement",
    description:
      "Building strategic alliances with government bodies, NGOs, and the private sector to maximise development outcomes.",
  },
  {
    id: "P04",
    title: "Training & Facilitation",
    description:
      "Designing and facilitating capacity-building workshops, trainings, and learning events for diverse stakeholders.",
  },
  {
    id: "P05",
    title: "Program Design & Innovation",
    description:
      "Creating evidence-based program frameworks that integrate innovation and equity principles for sustainable impact.",
  },
  {
    id: "P06",
    title: "Project Management & Execution",
    description:
      "Leading end-to-end project delivery — from inception and planning through execution, monitoring, and evaluation.",
  },
];

export const DEMO_ACTIVITIES = [
  {
    programId: "P01",
    id: "A01",
    title: "National Policy Forum on Youth Rights",
    shortDesc:
      "Organised a two-day national forum bringing together youth advocates, policymakers, and civil society.",
    docUrl: "",
    images: [],
  },
  {
    programId: "P01",
    id: "A02",
    title: "Community Radio Advocacy Campaign",
    shortDesc:
      "Launched a six-week radio campaign reaching 50,000+ listeners on social welfare reform.",
    docUrl: "",
    images: [],
  },
  {
    programId: "P02",
    id: "A03",
    title: "Voter Education Drive — Rural Districts",
    shortDesc:
      "Reached 8,000 first-time voters across six rural districts ahead of national elections.",
    docUrl: "",
    images: [],
  },
  {
    programId: "P02",
    id: "A04",
    title: "Youth Leadership Development Programme",
    shortDesc:
      "Six-month structured programme building civic leadership skills in 60 young people.",
    docUrl: "",
    images: [],
  },
  {
    programId: "P03",
    id: "A05",
    title: "Multi-Sector Coalition for Food Security",
    shortDesc:
      "Established a 14-member coalition of NGOs, government, and businesses addressing food insecurity.",
    docUrl: "",
    images: [],
  },
  {
    programId: "P04",
    id: "A06",
    title: "Facilitation Skills Masterclass Series",
    shortDesc:
      "Trained 120 NGO staff in participatory facilitation and adult learning principles.",
    docUrl: "",
    images: [],
  },
  {
    programId: "P05",
    id: "A07",
    title: "Gender-Responsive Program Framework",
    shortDesc:
      "Designed an organisational framework integrating gender equality into all programming.",
    docUrl: "",
    images: [],
  },
  {
    programId: "P06",
    id: "A08",
    title: "Urban Resilience Project — Phase II",
    shortDesc:
      "Managed a $500K urban resilience project across three cities over 18 months.",
    docUrl: "",
    images: [],
  },
];

export const DEMO_ACHIEVEMENTS = [
  {
    title: "National Youth Changemaker Award",
    shortDesc:
      "Recognised by the Ministry of Youth Affairs for outstanding contribution to civic engagement.",
    fullDesc:
      "Awarded the National Youth Changemaker Award in recognition of significant contributions to civic education and youth participation programmes. The award was presented by the Minister of Youth Affairs at a national ceremony attended by development sector leaders from across the country.",
    image: "",
  },
  {
    title: "Published Policy Brief — Inclusive Urban Planning",
    shortDesc:
      "Co-authored policy brief adopted by two city councils as a reference document.",
    fullDesc:
      "Co-authored a policy brief on inclusive urban planning that was subsequently adopted by city councils in two major urban centres as a guiding reference document for community participation in planning processes. The brief has been cited in three subsequent academic publications.",
    image: "",
  },
  {
    title: 'TEDx Talk: "Redefining Community"',
    shortDesc:
      "Delivered a TEDx talk viewed by 25,000+ people on redefining community in the digital age.",
    fullDesc:
      "Selected to deliver a TEDx talk on the evolving nature of community and belonging in an increasingly digital world. The talk has garnered over 25,000 views and has been shared by numerous development organisations as a resource for practitioners working on community cohesion.",
    image: "",
  },
  {
    title: "Fellowship — Global Development Leaders Program",
    shortDesc:
      "One of 30 fellows selected globally for a prestigious year-long leadership fellowship.",
    fullDesc:
      "Selected as one of 30 fellows worldwide for the Global Development Leaders Program, a year-long fellowship providing intensive leadership training, global networking, and mentorship from senior development professionals. Completed a capstone project designing a community resilience framework adopted by the host organisation.",
    image: "",
  },
];
