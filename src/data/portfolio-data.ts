export const portfolioData = {
  hero: {
    name: "Alex Developer",
    title: "Full-Stack Developer",
    tagline: "Crafting Digital Experiences",
    description: "Web/App Developer specializing in building exceptional digital experiences with motion design and interactive interfaces",
  },
  
  about: {
    intro: "I'm a passionate full-stack developer with a love for creating seamless digital experiences. Currently building innovative solutions and exploring the intersection of design and technology. I specialize in modern web technologies and competitive programming.",
    journey: "My journey began with a curiosity about how things work on the web, and since then, I've been committed to continuous learning and pushing the boundaries of what's possible with code.",
    interests: ["Competitive Programming", "UI/UX Design", "Open Source", "Teaching & Mentoring"],
    experience: "3+ Years",
    location: "San Francisco, CA",
  },
  
  technologies: [
    // Languages
    { name: "JavaScript", category: "language", icon: "Code2" },
    { name: "TypeScript", category: "language", icon: "FileCode" },
    { name: "Python", category: "language", icon: "Code" },
    { name: "Java", category: "language", icon: "Coffee" },
    { name: "C++", category: "language", icon: "Terminal" },
    
    // Frameworks
    { name: "React", category: "framework", icon: "Atom" },
    { name: "Next.js", category: "framework", icon: "Layers" },
    { name: "Node.js", category: "framework", icon: "Server" },
    { name: "TailwindCSS", category: "framework", icon: "Paintbrush" },
    { name: "Django", category: "framework", icon: "Database" },
    
    // Tools
    { name: "Git", category: "tool", icon: "GitBranch" },
    { name: "VS Code", category: "tool", icon: "Code" },
    { name: "Figma", category: "tool", icon: "Palette" },
    { name: "Docker", category: "tool", icon: "Container" },
    { name: "Postman", category: "tool", icon: "Send" },
    
    // Platforms
    { name: "AWS", category: "platform", icon: "Cloud" },
    { name: "Vercel", category: "platform", icon: "Rocket" },
    { name: "Firebase", category: "platform", icon: "Flame" },
    { name: "MongoDB", category: "platform", icon: "Database" },
    
    // DevOps
    { name: "Kubernetes", category: "devops", icon: "Network" },
    { name: "CI/CD", category: "devops", icon: "GitPullRequest" },
    { name: "Linux", category: "devops", icon: "Terminal" },
    { name: "Nginx", category: "devops", icon: "Server" },
  ],
  
  projects: [
    {
      id: 1,
      title: "Analytics Dashboard",
      category: "featured",
      description: "Comprehensive analytics platform with real-time data visualization, customizable reports, and AI-powered insights for business intelligence.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "MongoDB"],
      features: [
        "Real-time data processing",
        "Interactive charts & graphs",
        "AI-powered predictions",
        "Custom report builder"
      ],
      metrics: {
        users: "1,200+",
        performance: 98,
        stars: 124
      },
      links: {
        demo: "https://demo.com",
        github: "https://github.com/username/project1"
      },
      image: "project1"
    },
    {
      id: 2,
      title: "E-Commerce Mobile App",
      category: "featured",
      description: "Modern mobile shopping experience with seamless checkout, personalized recommendations, and real-time inventory tracking.",
      technologies: ["React Native", "Firebase", "Stripe", "Redux"],
      features: [
        "Secure payment integration",
        "Push notifications",
        "Wishlist & favorites",
        "Order tracking"
      ],
      metrics: {
        users: "5,000+",
        performance: 95,
        stars: 89
      },
      links: {
        demo: "https://demo.com",
        github: "https://github.com/username/project2"
      },
      image: "project2"
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      category: "featured",
      description: "Intelligent conversational AI with natural language processing, context awareness, and multi-language support.",
      technologies: ["Python", "React", "OpenAI", "WebSocket"],
      features: [
        "Natural language understanding",
        "Context-aware responses",
        "Multi-language support",
        "Real-time messaging"
      ],
      metrics: {
        users: "800+",
        performance: 96,
        stars: 156
      },
      links: {
        demo: "https://demo.com",
        github: "https://github.com/username/project3"
      },
      image: "project3"
    }
  ],
  
  achievements: {
    codeforces: {
      rating: 1547,
      maxRating: 1623,
      rank: "Specialist",
      problemsSolved: 450,
      contests: 35,
      profileUrl: "https://codeforces.com/profile/username"
    },
    codechef: {
      rating: "4★",
      stars: 4,
      problemsSolved: 280,
      contests: 28,
      profileUrl: "https://codechef.com/users/username"
    },
    leetcode: {
      badge: "Knight",
      problemsSolved: 650,
      easy: 200,
      medium: 350,
      hard: 100,
      profileUrl: "https://leetcode.com/username"
    }
  },
  
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2024-05",
      category: "Cloud Computing"
    },
    {
      name: "Professional Scrum Master",
      issuer: "Scrum.org",
      date: "2024-03",
      category: "Project Management"
    },
    {
      name: "React Advanced",
      issuer: "Meta",
      date: "2023-11",
      category: "Web Development"
    }
  ],
  
  profileLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/yourusername",
      icon: "Github",
      color: "text-foreground",
      stats: { label: "Repositories", value: "42" }
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      icon: "Linkedin",
      color: "text-secondary",
      stats: { label: "Connections", value: "500+" }
    },
    {
      platform: "LeetCode",
      url: "https://leetcode.com/username",
      icon: "Code2",
      color: "text-orange",
      stats: { label: "Problems", value: "650+" }
    },
    {
      platform: "Codeforces",
      url: "https://codeforces.com/profile/username",
      icon: "Trophy",
      color: "text-secondary",
      stats: { label: "Rating", value: "1547" }
    },
    {
      platform: "CodeChef",
      url: "https://codechef.com/users/username",
      icon: "Award",
      color: "text-yellow",
      stats: { label: "Stars", value: "4★" }
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/yourhandle",
      icon: "Twitter",
      color: "text-secondary",
      stats: { label: "Followers", value: "1.2K" }
    }
  ],
  
  contact: {
    email: "alex@developer.com",
    availability: "Available for opportunities",
    subjects: [
      "General Inquiry",
      "Project Collaboration",
      "Job Opportunity",
      "Freelance Work",
      "Speaking Engagement",
      "Other"
    ]
  }
};
