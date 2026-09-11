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
    tagline: "Software Engineer · AI Builder · Based in Kano, Nigeria",
    bio: "I design and build enterprise systems, AI-powered tools, and full-stack web applications for organizations in Kano and beyond. Currently developing an operations management platform and an intelligent attendance system.",
    cta: { primary: "Let's Talk", secondary: "Download CV" },
    availability: "CS Undergraduate · Open to opportunities",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Play", href: "#hobby-projects" },
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
    Languages: [
      { name: "TypeScript", url: "https://www.typescriptlang.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Python", url: "https://www.python.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Dart", url: "https://dart.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
      { name: "PHP", url: "https://www.php.net/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
      { name: "SQL", url: "https://en.wikipedia.org/wiki/SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" }
    ],
    Frontend: [
      { name: "React", url: "https://react.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", url: "https://nextjs.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "Flutter", url: "https://flutter.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" }
    ],
    Backend: [
      { name: "Node.js", url: "https://nodejs.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express", url: "https://expressjs.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "Fastify", url: "https://fastify.dev/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-plain.svg" },
      { name: "PostgreSQL", url: "https://www.postgresql.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "REST APIs", url: "https://restfulapi.net/", icon: null }
    ],
    "AI / ML": [
      { name: "LLM Integration", url: null, icon: null },
      { name: "Document Processing", url: null, icon: null },
      { name: "Prompt Engineering", url: null, icon: null }
    ],
    Infrastructure: [
      { name: "Git", url: "https://git-scm.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "Linux", url: "https://www.linux.org/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "Docker", url: "https://www.docker.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Vercel", url: "https://vercel.com/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
      { name: "CI/CD", url: null, icon: null }
    ],
    Security: [
      { name: "RBAC", url: null, icon: null },
      { name: "Authentication", url: null, icon: null },
      { name: "JWT", url: "https://jwt.io/", icon: null },
      { name: "SSL/TLS", url: null, icon: null }
    ]
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
      media: "/projects/mrtb.webp",
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
      media: "/projects/classify.webp",
    },
    {
      id: "examflow",
      featured: false,
      title: "ExamFlow AI",
      role: "Lead Developer",
      developmentStatus: "Prototyping",
      summary:
        "An AI-driven examination workflow tool designed to automate question generation, grading assistance, and securely manage examination data.",
      stack: ["Python", "React", "LLMs", "PostgreSQL"],
      links: { live: null, source: null, caseStudy: null },
      media: "/projects/examflow.webp",
    },
  ],
  hobbyProjects: [
    {
      id: "gleam-automation",
      title: "GleamBot — Daily Automation",
      subtitle: "Headless Browser · Systemd User Timer · Linux",
      badge: "Automation Bot",
      context:
        "Built to automate repetitive daily giveaway entries on Gleam.io so daily check-ins are never missed. Uses a dedicated Chromium profile via Playwright, runs idempotently on a systemd user timer, and exits safely if human verification is required.",
      stack: ["Playwright", "Node.js", "Linux Systemd", "Chromium", "State Machines"],
      github: "https://github.com/Nabil-00/gleam-daily-entry",
      live: null,
      media: "/projects/gleamie.webp",
      mediaFit: "cover",
      funFact: "Runs silently via a local Linux systemd timer every morning.",
    },
    {
      id: "battlenet-live",
      title: "Battle.net Live",
      subtitle: "Realtime Arena · Supabase RLS · Fight Simulation",
      badge: "Realtime Gaming",
      context:
        "A live robot combat arena and fight telemetry dashboard. Features simulated round-by-round fight playback, live damage meters, automated event commentary streams, and strict PostgreSQL Row Level Security across match tables.",
      stack: ["React", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL RLS"],
      github: "https://github.com/Nabil-00/battlenet-live-frontend",
      live: null,
      media: "/projects/battlenet.webp",
      video: "/projects/battlenet.webm",
      poster: "/projects/battlenet.webp",
      mediaFit: "cover",
      funFact: "Simulates full arena matches with live-calculated win probabilities and round commentary.",
    },
    {
      id: "buddy",
      title: "Buddy",
      subtitle: "AI Emotional Wellness · Conversational UX",
      badge: "AI Companion",
      context:
        "An AI emotional wellness companion and mood check-in app. Designed to make self-reflection approachable through empathetic conversation, gentle routines, and a warm, design-forward interface instead of sterile medical forms.",
      stack: ["React", "Tailwind CSS", "AI / LLMs", "Conversational UI"],
      github: "https://github.com/Nabil-00/ai-mental-health-companion",
      live: "https://khadija-port.vercel.app",
      media: "/projects/buddy.webp",
      mediaFit: "contain",
      mediaBg: "#fbfdfa",
      funFact: "Collaborative design exploration focused on gentle, non-clinical mental health interactions.",
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
        "I'm a computer science undergraduate at Northwest University, Kano, building software that solves real operational problems — from enterprise management platforms to AI-powered workflow tools. Based in Kano, Nigeria, I work with organizations looking for custom software, AI integration, and web development.",
        "Outside of code, I teach — running annual SIWES workshops and an AI-assisted web development class in Kano. I also break down tech concepts on TikTok and am equally comfortable rebuilding a PC from scratch.",
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
    hobbyProjects: {
      eyebrow: "EXPERIMENTS & PLAY",
      heading: "Weekend builds & fun tools.",
      subtext:
        "Beyond client and enterprise systems, I tinker on side quests for the sheer joy of coding, automating annoyances, and playing with new tools.",
    },
    footer: {
      copyright: "© 2026 Nabeel Ismail. All rights reserved.",
      builtWith: "Built with React + Vite",
    },
  },
};

export default siteContent;

