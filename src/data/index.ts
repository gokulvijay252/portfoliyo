import { Hero, About, Skill, Project, Experience, Education, Qualification } from '../types';

export const hero: Hero = {
  id: 1,
  name: 'Vijay A',
  title: 'Full Stack Developer',
  tagline: 'Building scalable web applications and high-performance REST APIs with clean, maintainable code.',
  social_links: [
    { id: 1, platform: 'LinkedIn', url: 'https://linkedin.com/in/vijay-a-1a83b4221', icon: 'FaLinkedinIn', display_order: 1 },
    { id: 2, platform: 'Email', url: 'mailto:vijay160400@gmail.com', icon: 'FaEnvelope', display_order: 2 },
    { id: 3, platform: 'Phone', url: 'tel:+918098695513', icon: 'FaPhone', display_order: 3 },
  ],
};

export const about: About = {
  id: 1,
  bio: 'I am a dedicated Software Developer with 4+ years of experience in full-stack development, specializing in React.js, Node.js, and MySQL. I have developed scalable and secure web applications and high-performance REST APIs, with strong expertise in writing clean, maintainable code and implementing security best practices. I work closely with cross-functional teams to deliver robust solutions that drive business growth.',
  profile_image_url: '/photo.png',
};

export const skills: Skill[] = [
  { id: 1, name: 'React Js', category: 'Frontend', proficiency: 90, display_order: 1 },
  { id: 2, name: 'AngularJS', category: 'Frontend', proficiency: 80, display_order: 2 },
  { id: 3, name: 'TypeScript', category: 'Frontend', proficiency: 85, display_order: 3 },
  { id: 4, name: 'Tailwind CSS', category: 'Frontend', proficiency: 85, display_order: 4 },
  { id: 5, name: 'Node Js', category: 'Backend', proficiency: 88, display_order: 1 },
  { id: 6, name: 'NestJS', category: 'Backend', proficiency: 82, display_order: 2 },
  { id: 7, name: 'Express.js', category: 'Backend', proficiency: 85, display_order: 3 },
  { id: 8, name: 'MySQL', category: 'Database', proficiency: 85, display_order: 1 },
  { id: 9, name: 'MongoDB', category: 'Database', proficiency: 78, display_order: 2 },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'SAMI - Sales Analysis Management Information',
    description:
      'Created master and transaction data management systems\nDeveloped robust data-management systems to deliver comprehensive and insightful dashboard views.\nImplemented secure authentication workflows using OAuth token-based access.\nBuilt front-end modules using AngularJS and ensured responsive, user-friendly interfaces.\nDeveloped efficient back-end APIs using Node.js and MySQL to support scalable application functionality.\nAdded server-side validation and data integrity checks to ensure accurate and consistent data flow across modules.',
    tech_stack: ['AngularJS', 'Node.js', 'PHP', 'MySQL'],
    image_url: null,
    live_url: null,
    github_url: null,
  },
  {
    id: 2,
    title: 'Analytics',
    description:
      'Developed a web application with responsive design for distributor analytics\nDeveloped a full-stack web application using React.js, NestJS, and TypeScript.\nDesigned and implemented RESTful APIs using NestJS to enable seamless and efficient data management.\nWorked with both MySQL and MongoDB databases to support scalable, flexible, and high-performance data storage.\nBuilt advanced filtering mechanisms to support fast, accurate, and optimized data retrieval and display.\nImplemented JWT token and OAuth token-based authentication for secure user access and session management.\nConfigured Helmet for HTTP security headers to protect against common web vulnerabilities.\nSet up CORS policies to handle cross-origin requests securely across multiple client applications.\nDeployed the application behind Nginx as a reverse proxy server for load balancing and improved performance.\nOptimized server-side performance by leveraging the Node.js event loop and async programming patterns for non-blocking I/O operations.\nIncorporated AWS S3 for secure file uploads, storage, and retrieval, ensuring reliable data handling.\nEnforced HTTPS for secure data transmission across all client-server communications.\nImplemented comprehensive error handling and input validation to ensure data integrity and application stability.',
    tech_stack: ['React.js', 'Node.js', 'TypeScript', 'MySQL', 'MongoDB'],
    image_url: null,
    live_url: null,
    github_url: null,
  },
  {
    id: 3,
    title: 'AIS - Amshuhu Integration Service',
    description:
      'Built a secure and scalable integration service for data processing and management\nDeveloped and maintained master and transaction data management modules for consistent and reliable data handling.\nBuilt and maintained admin panel for user management, configuration, and system monitoring.\nImplemented JWT token and OAuth token-based authentication for secure user access and session management.\nConfigured Helmet for HTTP security headers to protect against common web vulnerabilities.\nSet up CORS policies to handle cross-origin requests securely across multiple client applications.\nDeployed the application behind Nginx as a reverse proxy server for load balancing and improved performance.\nOptimized server-side performance by leveraging the Node.js event loop and async programming patterns for non-blocking I/O operations.\nIntegrated AWS S3 for secure file uploads, storage, and retrieval.\nPerformed thorough testing including unit testing and integration testing to ensure application stability and reliability.\nBuilt front-end modules using AngularJS with responsive and user-friendly interfaces.\nDeveloped back-end APIs using Node.js and PHP with MySQL for efficient data storage and retrieval.',
    tech_stack: ['AngularJS', 'Node.js', 'PHP', 'MySQL'],
    image_url: null,
    live_url: null,
    github_url: null,
  },
];

export const experience: Experience[] = [
  {
    id: 1,
    company: 'Amshuhu Itech Solution Pvt Ltd',
    role: 'Software Developer',
    start_date: '2022-01-01',
    end_date: null,
    description:
      'Developed and maintained scalable full-stack web applications serving enterprise clients.\nBuilt responsive and interactive front-end interfaces using React.js and TypeScript.\nDesigned and implemented high-performance RESTful APIs using Node.js.\nManaged relational and NoSQL databases including MySQL and MongoDB for optimized data storage.\nImplemented JWT and OAuth token-based authentication for secure user access.\nConfigured Nginx as reverse proxy for load balancing and improved performance.\nOptimized REST API response times and database query performance for high-traffic applications.\nCollaborated with cross-functional teams following Agile methodologies to deliver features on schedule.',
  },
];

export const education: Education[] = [
  {
    id: 1,
    institution: 'RVS College of Arts and Science',
    degree: 'BCA - Bachelor of Computer Application',
    field: 'Computer Application',
    start_year: 2018,
    end_year: 2021,
    description: 'Coimbatore',
  },
];

export const qualifications: Qualification[] = [
  {
    id: 1,
    title: 'BCA - Bachelor of Computer Application',
    organization: 'RVS College of Arts and Science, Coimbatore',
    start_year: 2018,
    end_year: 2021,
    description: null,
  },
  {
    id: 2,
    title: 'MCA - Master of Computer Application',
    organization: 'Sri Muthukumaran Institute of Technology, Chennai',
    start_year: 2022,
    end_year: 2024,
    description: null,
  },
];
