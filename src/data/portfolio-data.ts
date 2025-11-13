export const portfolioData = {
  hero: {
    name: "Ankit Raj",
    title: "Full-Stack Developer & Competitive Programmer",
    tagline: "Building Scalable Solutions",
    description: "Computer Science student specializing in full-stack development, AI/ML applications, and competitive programming with expertise in modern web technologies",
  },
  
  about: {
    intro: "I'm a passionate full-stack developer with expertise in building scalable web applications and AI-powered solutions. I specialize in modern web technologies, cloud architecture, and competitive programming, delivering solutions with 99.9% uptime and 30-60% performance improvements.",
    journey: "My journey in tech is driven by a passion for solving complex problems through code. As an active open source contributor and competitive programmer, I continuously push the boundaries of what's possible with technology, from building pet recognition platforms to video streaming solutions.",
    interests: ["Competitive Programming", "AI/ML Applications", "Open Source", "Cloud Architecture"],
    experience: "2+ Years",
    location: "Jabalpur, India",
  },
  
  technologies: [
    // Languages
    { name: "Python", category: "language", icon: "Code" },
    { name: "JavaScript", category: "language", icon: "Code2" },
    { name: "TypeScript", category: "language", icon: "FileCode" },
    { name: "Java", category: "language", icon: "Coffee" },
    { name: "C++", category: "language", icon: "Terminal" },
    { name: "PHP", category: "language", icon: "Code" },
    { name: "SQL", category: "language", icon: "Database" },
    
    // Frameworks
    { name: "React", category: "framework", icon: "Atom" },
    { name: "Next.js", category: "framework", icon: "Layers" },
    { name: "Node.js", category: "framework", icon: "Server" },
    { name: "Django", category: "framework", icon: "Database" },
    { name: "Flask", category: "framework", icon: "Server" },
    { name: "Express.js", category: "framework", icon: "Server" },
    { name: "Redux", category: "framework", icon: "Layers" },
    
    // Databases
    { name: "MongoDB", category: "platform", icon: "Database" },
    { name: "PostgreSQL", category: "platform", icon: "Database" },
    { name: "MySQL", category: "platform", icon: "Database" },
    { name: "Supabase", category: "platform", icon: "Database" },
    
    // Tools & Platforms
    { name: "Docker", category: "tool", icon: "Container" },
    { name: "Git", category: "tool", icon: "GitBranch" },
    { name: "React Native", category: "framework", icon: "Smartphone" },
    { name: "Expo", category: "tool", icon: "Smartphone" },
    { name: "HuggingFace", category: "platform", icon: "Brain" },
    { name: "Google Cloud", category: "platform", icon: "Cloud" },
  ],
  
  projects: [
    {
      id: 1,
      title: "PawGle - Pet Recognition Platform",
      category: "featured",
      description: "AI-powered pet image recognition platform serving 100+ users with 10+ daily uploads. Features ArcFace-based facial recognition achieving 87%+ accuracy on 500+ test samples with comprehensive Lost and Found system.",
      technologies: ["React.js", "Next.js", "Django", "Docker", "Supabase", "HuggingFace"],
      features: [
        "ArcFace facial recognition (87%+ accuracy)",
        "Lost and Found system with email notifications",
        "Database indexing with 25% faster API response",
        "Automated testing suite for 2,000+ monthly requests"
      ],
      metrics: {
        users: "100+",
        performance: 87,
        stars: 1
      },
      links: {
        demo: "https://pawgle.vercel.app",
        github: "https://github.com/WhoamiI00/PawGleFrontend"
      },
      image: "project1"
    },
    {
      id: 2,
      title: "Imaginify - AI Image Platform",
      category: "featured",
      description: "Advanced AI-powered image manipulation platform with generative capabilities. Built with Next.js and TypeScript, featuring modern UI/UX and seamless user experience for image transformation and enhancement.",
      technologies: ["Next.js", "TypeScript", "AI APIs", "Tailwind CSS"],
      features: [
        "AI-powered image generation",
        "Advanced image manipulation tools",
        "Real-time preview and processing",
        "Modern responsive interface"
      ],
      metrics: {
        users: "50+",
        performance: 94,
        stars: 0
      },
      links: {
        demo: "https://imaginify-beta-tawny.vercel.app",
        github: "https://github.com/WhoamiI00/Imaginify"
      },
      image: "project2"
    },
    {
      id: 3,
      title: "Fizzy - Modern Web Application",
      category: "featured",
      description: "Feature-rich web application built with cutting-edge technologies. Showcases modern design patterns and optimal performance with TypeScript and contemporary web development practices.",
      technologies: ["TypeScript", "React", "Next.js", "Prismic CMS"],
      features: [
        "Modern architecture and design",
        "Type-safe development",
        "CMS integration",
        "Optimized performance"
      ],
      metrics: {
        users: "25+",
        performance: 96,
        stars: 0
      },
      links: {
        demo: "https://fizzy-theta.vercel.app",
        github: "https://github.com/WhoamiI00/Fizzy"
      },
      image: "project3"
    },
    {
      id: 4,
      title: "SportyIndia - Sports Platform",
      category: "web",
      description: "Comprehensive sports platform tailored for the Indian market. Features interactive UI, real-time updates, and engaging user experience built with Next.js and modern JavaScript.",
      technologies: ["Next.js", "JavaScript", "React", "Tailwind CSS"],
      features: [
        "Sports content aggregation",
        "Interactive user interface",
        "Real-time updates",
        "Mobile-responsive design"
      ],
      metrics: {
        users: "30+",
        performance: 90,
        stars: 0
      },
      links: {
        demo: "https://sporty-india-521t.vercel.app",
        github: "https://github.com/WhoamiI00/SportyIndia"
      },
      image: "project1"
    },
    {
      id: 5,
      title: "NeoCast - Video Platform",
      category: "web",
      description: "Screen recording and video platform with AI-based transcript generation tested on 500+ videos, enhancing keyword searchability by 40%. Features secure authentication and Arcjet bot protection sustaining 60 requests/minute.",
      technologies: ["Next.js", "TypeScript", "Bunny.net", "Xata", "Drizzle ORM", "Arcjet"],
      features: [
        "AI transcript generation (500+ videos)",
        "40% improved keyword searchability",
        "Token-based secure authentication",
        "Bot protection with zero downtime"
      ],
      metrics: {
        users: "100+",
        performance: 95,
        stars: 0
      },
      links: {
        demo: "https://neocast.vercel.app",
        github: "https://github.com/WhoamiI00/NeoCast"
      },
      image: "project2"
    },
    {
      id: 6,
      title: "NeoVids - Cross-Platform Mobile App",
      category: "mobile",
      description: "Cross-platform video app for Android/iOS handling 100+ videos. Reduced buffering by 40% through performance optimization and adaptive bitrate streaming, cutting server requests by 20%.",
      technologies: ["React Native", "Expo", "Appwrite"],
      features: [
        "Cross-platform compatibility (Android/iOS)",
        "40% reduced buffering time",
        "Adaptive bitrate streaming",
        "Caching and lazy loading (20% fewer requests)"
      ],
      metrics: {
        users: "100+",
        performance: 92,
        stars: 0
      },
      links: {
        demo: "https://neovids.app",
        github: "https://github.com/WhoamiI00/NeoVids"
      },
      image: "project3"
    }
  ],
  
  achievements: {
    codeforces: {
      rating: 1400,
      maxRating: 1450,
      rank: "Specialist",
      problemsSolved: 400,
      contests: 30,
      profileUrl: "https://codeforces.com/profile/kurumi_0_0"
    },
    codechef: {
      rating: "4★",
      stars: 4,
      problemsSolved: 300,
      contests: 25,
      profileUrl: "https://codechef.com/users/nexus_neon"
    },
    leetcode: {
      badge: "Knight",
      problemsSolved: 600,
      easy: 180,
      medium: 320,
      hard: 100,
      profileUrl: "https://leetcode.com/kurumi_0_0"
    }
  },
  
  certifications: [
    {
      name: "Google Cloud Skills Boost Specialist",
      issuer: "Google Cloud",
      date: "2025-06",
      category: "Cloud Computing"
    },
    {
      name: "Building LLM Applications with Prompt Engineering",
      issuer: "NVIDIA Deep Learning Institute",
      date: "2025-06",
      category: "AI/ML"
    }
  ],
  
  profileLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/WhoamiI00",
      icon: "Github",
      color: "text-foreground",
      stats: { label: "Repositories", value: "20+" }
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      icon: "Linkedin",
      color: "text-secondary",
      stats: { label: "Connections", value: "300+" }
    },
    {
      platform: "LeetCode",
      url: "https://leetcode.com/kurumi_0_0",
      icon: "Code2",
      color: "text-orange",
      stats: { label: "Problems", value: "600+" }
    },
    {
      platform: "Codeforces",
      url: "https://codeforces.com/profile/kurumi_0_0",
      icon: "Trophy",
      color: "text-secondary",
      stats: { label: "Rating", value: "1400+" }
    },
    {
      platform: "CodeChef",
      url: "https://codechef.com/users/nexus_neon",
      icon: "Award",
      color: "text-yellow",
      stats: { label: "Stars", value: "4★" }
    }
  ],
  
  contact: {
    email: "ankit.raj@example.com",
    availability: "Available for opportunities",
    subjects: [
      "General Inquiry",
      "Project Collaboration",
      "Job Opportunity",
      "Freelance Work",
      "Open Source Contribution",
      "Other"
    ]
  }
};
