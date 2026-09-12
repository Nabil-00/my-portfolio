const siteContent = {
  meta: {
    name: "Nabil Ismail",
    title: "Software Engineer · AI Builder · Technical Educator",
    description:
      "I design and build enterprise systems, AI-powered tools, and full-stack applications. Currently developing an operations management platform and an intelligent attendance system.",
    email: "nabeelismailabdulkadir15@gmail.com",
    phone: "2349136159701",
    github: "https://github.com/Nabil-00",
    linkedin: "https://www.linkedin.com/in/nabil-i-426230336",
    tiktok: "https://www.tiktok.com/@i_nabeel_",
    facebook: "https://www.facebook.com/nabil.ismail.5855",
    whatsapp: "https://wa.me/2349136159701",
    cvPath: "/Nabil-Ismail-Abdulkadir-Resume.pdf",
    socialLabels: {
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      github: "GitHub",
      email: "Email",
    },
  },
  hero: {
    greeting: "Hello!",
    headline: ["I'm ", "Nabil", " Ismail"],
    highlightWord: "Nabil",
    tagline: "Software Engineer · AI Builder · Based in Kano, Nigeria",
    bio: "I'm Nabil Ismail, a software engineer in Kano, Nigeria. I've built 5+ production systems — enterprise platforms, AI-powered tools, and full-stack web apps — for organizations including DefendHub Enterprise and Hama Academy. I specialize in React, Node.js, PostgreSQL, and Large Language Model (LLM) integration.",
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
      desc: "Enterprise platforms with Role-Based Access Control (RBAC), approval workflows, document management, and PostgreSQL.",
    },
    {
      id: "ai",
      icon: "Cpu",
      title: "AI & Automation",
      desc: "AI-powered tools, document processing, workflow automation, and Large Language Model (LLM) integration.",
    },
    {
      id: "educator",
      icon: "Video",
      title: "Technical Education",
      desc: "Supervised Industrial Work Experience Scheme (SIWES) workshops, AI-assisted web development instruction, and tech content creation.",
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
        "I'm a computer science undergraduate at Northwest University, Kano, building software that solves real operational problems. I've delivered 5+ production systems for organizations in Kano, including enterprise management platforms, AI-powered workflow tools, and full-stack web applications.",
        "Outside of code, I teach — running annual Supervised Industrial Work Experience Scheme (SIWES) workshops and an AI-assisted web development class in Kano. I also break down tech concepts on TikTok and am equally comfortable rebuilding a PC from scratch.",
      ],
      cta: "Get in touch",
      imageAlt: "Nabil Ismail, software engineer in Kano, Nigeria",
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
          desc: "Annual Supervised Industrial Work Experience Scheme (SIWES) training workshop for students. Most recently held 2026.",
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
      copyright: "© 2026 Nabil Ismail. All rights reserved.",
      builtWith: "Built with React + Vite",
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Frequently asked questions.",
      items: [
        {
          question: "What services does Nabil Ismail offer?",
          answer: "Nabil Ismail offers software engineering, AI integration, and web development services in Kano, Nigeria. Services include enterprise systems with Role-Based Access Control (RBAC) and approval workflows, AI-powered tools using Large Language Models (LLMs), full-stack web applications, and technical education workshops."
        },
        {
          question: "How to hire a web developer in Kano, Nigeria?",
          answer: "You can hire Nabil Ismail, a software engineer based in Kano, Nigeria, by reaching out via the contact form at nabil.is-a.dev or messaging on WhatsApp at +234 913 615 9701. Nabil specializes in React, Node.js, PostgreSQL, and AI integration for organizations in Kano and beyond."
        },
        {
          question: "What is the MRTB Operations Management System?",
          answer: "The MRTB Operations Management System is an office-management platform built by Nabil Ismail using React, TypeScript, Fastify, Prisma, and PostgreSQL. It features approval workflows, procurement management, document verification, geofenced attendance, and performance tracking for enterprise organizations."
        },

        {
          question: "Does Nabil Ismail make mobile apps?",
          answer: "Yes, Nabil Ismail builds mobile applications using Flutter and React. His ClassiFy project is an intelligent attendance and classroom management system with both web and mobile interfaces built with Flutter, React, Node.js, and PostgreSQL."
        },
        {
          question: "How much does website design cost in Kano?",
          answer: "Website design in Kano ranges from ₦150,000 ($180) for a simple landing page to ₦15,000,000 ($18,000) for a custom web application. A professional business website with 5-10 pages typically costs between ₦400,000 and ₦1,200,000 depending on features and complexity."
        },
        {
          question: "What is Flutter and why is it used for mobile apps?",
          answer: "Flutter is Google's open-source framework for building cross-platform mobile apps from a single Dart codebase. It's popular in Kano because it reduces development costs by 50%, builds for iOS and Android simultaneously, and delivers near-native performance on budget devices common in the Nigerian market."
        },
        {
          question: "How can my Kano business use AI chatbots?",
          answer: "AI chatbots can handle 60-80% of routine customer inquiries automatically, reducing support costs by 45%. In Kano, WhatsApp-integrated chatbots are particularly effective since 89% of smartphone users have WhatsApp installed. Chatbot development costs range from ₦200,000 to ₦3,000,000."
        },
        {
          question: "What enterprise software does Nabil Ismail build?",
          answer: "Nabil Ismail builds enterprise software including operations management systems with Role-Based Access Control (RBAC), approval workflows, document management, and performance tracking. His MRTB Operations Management System is built with React, TypeScript, Fastify, Prisma, and PostgreSQL."
        },
        {
          question: "How long does it take to build a website in Kano?",
          answer: "A standard business website takes 2-4 weeks to build. More complex projects like e-commerce platforms or custom web applications typically require 6-12 weeks. The timeline depends on content readiness, feedback speed, and project scope."
        },
        {
          question: "What is the tech stack for web development in Kano?",
          answer: "The most common web development stack in Kano is React 19 + TypeScript + Tailwind CSS for frontend, Node.js + Fastify/Express for backend, and PostgreSQL for databases. This stack powers production applications built by Kano developers including Nabil Ismail's enterprise systems."
        }
      ],
    },
  },
};

export default siteContent;

