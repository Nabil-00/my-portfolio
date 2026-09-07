const siteContent = {
  meta: {
    name: "Nabeel Ismail",
    title: "Software Engineer · AI Builder · Technical Educator",
    description:
      "I design and build enterprise systems, AI-powered tools, and full-stack applications. Currently developing an operations management platform and an intelligent attendance system.",
    email: "nabeelismailabdulkadir15@gmail.com",
    phone: "2349136159701",
    github: "https://github.com/Nabil-00",
    tiktok: "https://www.tiktok.com/@i_nabeel_",
    facebook: "https://www.facebook.com/nabil.ismail.5855",
    whatsapp: "https://wa.me/2349136159701",
    cvPath: "/Nabil-Ismail-Abdulkadir-Resume.pdf",
    socialLabels: {
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      tiktok: "TikTok",
      github: "GitHub",
      email: "Email",
    },
  },
  hero: {
    greeting: "Hello!",
    headline: ["I'm ", "Nabeel", " Ismail"],
    highlightWord: "Nabeel",
    tagline: "Software Engineer · AI Builder · Technical Educator",
    bio: "I design and build enterprise systems, AI-powered tools, and full-stack applications for real organizations. Currently developing an operations management platform and an intelligent attendance system as my final-year project.",
    cta: { primary: "Let's Talk", secondary: "Download CV" },
    availability: "CS Undergraduate · Open to opportunities",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  pillars: [
    {
      id: "systems",
      icon: "Code2",
      title: "Systems Engineering",
      desc: "Enterprise platforms with RBAC, approval workflows, document management, and PostgreSQL.",
    },
    {
      id: "ai",
      icon: "Cpu",
      title: "AI & Automation",
      desc: "AI-powered tools, document processing, workflow automation, and LLM integration.",
    },
    {
      id: "educator",
      icon: "Video",
      title: "Technical Education",
      desc: "SIWES workshops, AI-assisted web development instruction, and tech content creation.",
    },
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "Python", "Dart", "PHP", "SQL"],
    Frontend: ["React", "Next.js", "Flutter", "Tailwind CSS"],
    Backend: ["Node.js", "Express", "Fastify", "PostgreSQL", "REST APIs"],
    "AI / ML": ["LLM Integration", "Document Processing", "Prompt Engineering"],
    Infrastructure: ["Git", "Linux", "Docker", "Vercel", "CI/CD"],
    Security: ["RBAC", "Authentication", "JWT", "SSL/TLS"],
  },
  projects: [
    {
      id: "mrtb",
      featured: true,
      title: "MRTB Operations Management System",
      role: "Solo developer",
      developmentStatus: "In development",
      summary:
        "An office-management system with approval workflows, procurement, document verification, geofenced attendance, and performance tracking for a real organization.",
      stack: ["React", "TypeScript", "Fastify", "Prisma", "PostgreSQL"],
      links: { live: null, source: null, caseStudy: null },
      media: null,
    },
    {
      id: "classify",
      featured: true,
      title: "ClassiFy",
      role: "Solo developer (final-year project)",
      developmentStatus: "In development",
      summary:
        "An intelligent attendance and classroom management system with web and mobile interfaces, backend services, and AI integration.",
      stack: ["Flutter", "React", "Node.js", "PostgreSQL"],
      links: { live: null, source: null, caseStudy: null },
      media: null,
    },
    {
      id: "galaltix",
      featured: false,
      title: "Galaltix — powered by Molten Nova CMS",
      role: "Solo developer",
      developmentStatus: "Deployed",
      summary:
        "A full organization website powered by a custom CMS, enabling non-technical staff to manage content independently.",
      stack: ["HTML", "CSS", "JavaScript", "Custom CMS"],
      links: {
        live: "https://www.galaltixnig.com",
        source: "https://github.com/Nabil-00/molten-nova-cms.git",
        caseStudy: null,
      },
      media: "/projects/galaltix.png",
    },
  ],
  contact: {
    heading: ["Say ", "Hi", " and let's build"],
    subtext: "Have a project or opportunity in mind? Let's talk about it.",
    inquiryOptions: [
      "Software Engineering",
      "AI / Automation",
      "Technical Education",
      "Collaboration",
      "Other",
    ],
    labels: {
      name: "Name",
      email: "Email",
      message: "Message",
      inquiry: "What would you like to discuss?",
      submit: "Send message",
      whatsappCta: "Chat on WhatsApp",
    },
  },
  sections: {
    about: {
      eyebrow: "ABOUT ME",
      heading: "The person behind the code.",
      paragraphs: [
        "I'm a computer science undergraduate at Northwest University, Kano, building software that solves real operational problems — from enterprise management platforms to AI-powered workflow tools.",
        "Outside of code, I teach — running annual SIWES workshops and an AI-assisted web development class. I also break down tech concepts on TikTok and am equally comfortable rebuilding a PC from scratch.",
      ],
      cta: "Get in touch",
      imageAlt: "Nabeel Ismail, software engineer",
    },
    skills: {
      eyebrow: "CAPABILITIES",
      heading: "What I work with.",
      subtext: "Languages, frameworks, and tools I use on real projects.",
    },
    projects: {
      eyebrow: "SELECTED WORK",
      heading: "Things I've built.",
      subtext: "Real projects for real organizations.",
      liveLinkLabel: "Visit Site",
      githubLinkLabel: "GitHub",
    },
    teaching: {
      eyebrow: "TEACHING & COMMUNITY",
      heading: "Sharing what I learn.",
      subtext:
        "I teach because explaining something is the best way to understand it deeply.",
      activities: [
        {
          title: "SIWES Workshop",
          desc: "Annual industrial training workshop for students. Most recently held 2026.",
        },
        {
          title: "AI Web Development Class",
          desc: "Ongoing class teaching web development with AI-assisted tooling.",
        },
        {
          title: "Class Representative",
          desc: "Organizing tutorials, events, and liaising with lecturers for the undergraduate cohort.",
        },
      ],
      tiktok: {
        handle: "@i_nabeel_",
        label: "Tech Content Creator",
        chips: ["Web Dev", "Hardware", "Linux", "Tutorials", "Tech News"],
        buttonLabel: "Follow on TikTok",
        linkLabel: "View profile",
      },
    },
    footer: {
      copyright: "© 2026 Nabeel Ismail. All rights reserved.",
      builtWith: "Built with React + Vite",
    },
  },
};

export default siteContent;

