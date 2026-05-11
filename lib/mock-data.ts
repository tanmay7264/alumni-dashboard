export const user = {
  name: "Sarah Müller",
  firstName: "Sarah",
  classYear: 2019,
  degree: "M.Sc. Computer Science",
  faculty: "Faculty of Information Systems & Applied Computer Sciences",
  location: "Munich, Germany",
  jobTitle: "Senior Software Engineer at Siemens AG",
  email: "sarah.mueller@alumni.uni-bamberg.de",
  studentId: "1734892",
  avatar: "https://i.pravatar.cc/200?img=47",
  bio: "Building distributed systems at Siemens. Passionate about open source, mentoring, and connecting with fellow Bamberg alumni in the tech industry.",
  joinedNetwork: "Oct 2019",
  connections: 142,
  totalGiven: 1250
};

export type StatIcon = "calendar" | "users" | "briefcase" | "heart";

export type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attending: number;
  capacity: number;
  image: string;
  description: string;
  featured?: boolean;
  host: string;
};

export const events: Event[] = [
  { id: 1, title: "Annual Alumni Reunion 2026", date: "2026-06-14", time: "18:00 — 23:00", location: "An der Weberei 5, Bamberg", type: "Reunion", attending: 248, capacity: 400, image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800", description: "Largest annual gathering of Bamberg alumni. Dinner, speeches by Rector, networking, and campus tours.", featured: true, host: "Alumni Office" },
  { id: 2, title: "Tech Talk: AI Ethics in Industry", date: "2026-05-22", time: "19:00 — 21:00", location: "Virtual (Zoom)", type: "Talk", attending: 67, capacity: 200, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", description: "Panel discussion with three alumni working on AI policy at EU Commission, SAP, and DeepMind.", host: "Anna Klein '19" },
  { id: 3, title: "Career Fair — Spring Edition", date: "2026-05-30", time: "10:00 — 16:00", location: "Feldkirchenstraße 21, Bamberg", type: "Career", attending: 184, capacity: 500, image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800", description: "30+ alumni-led companies recruiting graduates and experienced hires.", host: "Career Services" },
  { id: 4, title: "Munich Alumni Stammtisch", date: "2026-05-18", time: "19:30", location: "Augustiner Keller, Munich", type: "Networking", attending: 32, capacity: 60, image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800", description: "Monthly informal meetup for Bamberg alumni based in Munich. First drink on the chapter.", host: "Munich Chapter" },
  { id: 5, title: "Homecoming Football Match", date: "2026-09-12", time: "15:00", location: "Fuchs-Park-Stadion, Bamberg", type: "Sports", attending: 412, capacity: 800, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800", description: "Watch FC Eintracht play, then alumni post-match drinks at the campus pub.", host: "Sports Alumni" },
  { id: 6, title: "Berlin Chapter Holiday Mixer", date: "2026-12-08", time: "20:00", location: "Hackescher Hof, Berlin", type: "Networking", attending: 58, capacity: 100, image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800", description: "End-of-year mixer for Berlin-based alumni. Glühwein, food, annual class-of-the-year award.", host: "Berlin Chapter" },
  { id: 7, title: "Founders' Pitch Night", date: "2026-06-25", time: "18:00", location: "Bamberg Innovation Hub", type: "Career", attending: 89, capacity: 150, image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800", description: "Alumni founders pitch to a panel of investors. Audience votes for People's Choice award.", host: "Entrepreneurship Network" },
  { id: 8, title: "Hamburg Harbour Walk", date: "2026-07-10", time: "11:00", location: "Landungsbrücken, Hamburg", type: "Networking", attending: 22, capacity: 40, image: "/images/hamburg_harbour.png", description: "Guided walk around the harbour with a Hamburg-based alumni historian. Lunch after.", host: "Hamburg Chapter" },
  { id: 9, title: "Women in Leadership Workshop", date: "2026-06-04", time: "14:00 — 18:00", location: "WIAI Auditorium, Bamberg", type: "Talk", attending: 134, capacity: 200, image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800", description: "Half-day workshop featuring six female alumni leaders sharing career strategies.", host: "Women's Alumni Network" },
  { id: 10, title: "Zürich Alumni Brunch", date: "2026-07-26", time: "11:00", location: "Hotel Storchen, Zürich", type: "Networking", attending: 41, capacity: 60, image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=800", description: "Sunday brunch for Bamberg alumni in Switzerland. Bring partners and kids.", host: "Zürich Chapter" },
  { id: 11, title: "Faculty Research Symposium", date: "2026-10-17", time: "09:00 — 17:00", location: "Markusplatz 3, Bamberg", type: "Talk", attending: 156, capacity: 250, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", description: "Annual showcase of WIAI faculty research with poster sessions and keynote lectures.", host: "WIAI Faculty" },
  { id: 12, title: "London Alumni Dinner", date: "2026-09-28", time: "19:00", location: "The Ned, London", type: "Reunion", attending: 64, capacity: 80, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", description: "Annual black-tie dinner for UK-based Bamberg alumni. Featuring a guest speaker.", host: "UK Chapter" }
];

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedBy: string;
  postedDays: number;
  referralOffered: boolean;
  tags: string[];
  description: string;
  applicants: number;
};

export const jobs: Job[] = [
  { id: 1, title: "Senior Backend Engineer", company: "Siemens AG", location: "Munich, Germany", type: "Full-time", salary: "€85,000 — €110,000", postedBy: "Sarah Müller '19", postedDays: 2, referralOffered: true, tags: ["Go", "Kubernetes", "AWS"], description: "Join the Industrial Edge team building real-time IoT platforms for manufacturing customers.", applicants: 23 },
  { id: 2, title: "Product Manager, Enterprise", company: "SAP SE", location: "Walldorf, Germany", type: "Full-time", salary: "€95,000 — €130,000", postedBy: "Tobias Hoffmann '15", postedDays: 5, referralOffered: true, tags: ["SaaS", "B2B", "AI"], description: "Lead the AI Assistant integration roadmap across SAP S/4HANA. Looking for 5+ years PM experience.", applicants: 47 },
  { id: 3, title: "Junior Data Scientist", company: "Adidas", location: "Herzogenaurach, Germany", type: "Full-time", salary: "€55,000 — €70,000", postedBy: "Lena Vogel '21", postedDays: 1, referralOffered: true, tags: ["Python", "ML", "Retail"], description: "Demand forecasting for global apparel category. Recent graduates welcome.", applicants: 12 },
  { id: 4, title: "EU Policy Analyst", company: "European Commission", location: "Brussels, Belgium", type: "Full-time", salary: "€72,000 + benefits", postedBy: "Marie Schäfer '14", postedDays: 9, referralOffered: false, tags: ["Policy", "AI Act", "German"], description: "DG CNECT — supporting implementation of the AI Act. Background in law or political science required.", applicants: 31 },
  { id: 5, title: "Marketing Internship", company: "BMW Group", location: "Munich, Germany", type: "Internship", salary: "€2,200 / month", postedBy: "Niklas Bauer '17", postedDays: 3, referralOffered: true, tags: ["Brand", "Digital", "Automotive"], description: "Support the global EV launch campaign. Open to current Bamberg students and recent graduates.", applicants: 89 },
  { id: 6, title: "Lecturer — Information Systems", company: "Otto-Friedrich Uni Bamberg", location: "Bamberg, Germany", type: "Part-time", salary: "Per honorarium", postedBy: "Prof. Dr. Bauer", postedDays: 12, referralOffered: false, tags: ["Teaching", "WS25/26", "Industry"], description: "Teach 'Enterprise Software Architecture' to graduate students.", applicants: 8 },
  { id: 7, title: "Frontend Engineer", company: "Zalando SE", location: "Berlin, Germany", type: "Full-time", salary: "€70,000 — €95,000", postedBy: "Anna Klein '19", postedDays: 4, referralOffered: true, tags: ["React", "TypeScript", "E-commerce"], description: "Build customer-facing features for Europe's largest online fashion retailer.", applicants: 56 },
  { id: 8, title: "Strategy Consultant", company: "McKinsey & Company", location: "Frankfurt / Remote", type: "Full-time", salary: "€90,000 + bonus", postedBy: "Sophie Becker '20", postedDays: 7, referralOffered: true, tags: ["Strategy", "MBA preferred"], description: "Join the Digital & Analytics practice. Travel up to 3 days/week.", applicants: 124 },
  { id: 9, title: "Tax Associate", company: "PwC Deutschland", location: "Frankfurt, Germany", type: "Full-time", salary: "€58,000 — €72,000", postedBy: "Markus Lang '16", postedDays: 6, referralOffered: false, tags: ["Tax", "Audit", "Big 4"], description: "Entry-level tax consultancy role. German tax law expertise required.", applicants: 19 },
  { id: 10, title: "UX Designer", company: "Lufthansa Systems", location: "Frankfurt, Germany", type: "Full-time", salary: "€65,000 — €82,000", postedBy: "Julia Hoffmann '22", postedDays: 8, referralOffered: true, tags: ["Figma", "Travel", "B2B"], description: "Design crew-facing apps used by 35,000+ Lufthansa Group employees daily.", applicants: 27 },
  { id: 11, title: "Research Assistant — NLP", company: "Max Planck Institute", location: "Saarbrücken, Germany", type: "Contract", salary: "TV-L E13 (~€53k)", postedBy: "David Fischer '18", postedDays: 14, referralOffered: false, tags: ["NLP", "PhD track", "Academia"], description: "3-year position with PhD opportunity in multilingual language model research.", applicants: 14 },
  { id: 12, title: "Customer Success Manager", company: "Personio", location: "Munich / Remote", type: "Full-time", salary: "€60,000 + commission", postedBy: "Felix Wagner '16", postedDays: 5, referralOffered: true, tags: ["SaaS", "HR Tech", "DACH"], description: "Own a portfolio of mid-market SMB customers across the DACH region.", applicants: 41 }
];

export type AlumniProfile = {
  id: number;
  name: string;
  year: number;
  degree: string;
  role: string;
  company: string;
  location: string;
  industry: string;
  avatar: string;
  mutual: number;
};

export const directory: AlumniProfile[] = [
  { id: 1, name: "Tobias Hoffmann", year: 2015, degree: "M.Sc. IS", role: "Director of Product", company: "SAP", location: "Walldorf", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=12", mutual: 23 },
  { id: 2, name: "Lena Vogel", year: 2021, degree: "B.Sc. CS", role: "Data Scientist", company: "Adidas", location: "Herzogenaurach", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=23", mutual: 8 },
  { id: 3, name: "Marie Schäfer", year: 2014, degree: "LL.M.", role: "Policy Analyst", company: "EU Commission", location: "Brussels", industry: "Public Sector", avatar: "https://i.pravatar.cc/120?img=32", mutual: 15 },
  { id: 4, name: "Niklas Bauer", year: 2017, degree: "M.Sc. Marketing", role: "Brand Manager", company: "BMW", location: "Munich", industry: "Automotive", avatar: "https://i.pravatar.cc/120?img=53", mutual: 41 },
  { id: 5, name: "Anna Klein", year: 2019, degree: "M.Sc. CS", role: "Software Engineer", company: "Google", location: "Zürich", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=44", mutual: 67 },
  { id: 6, name: "Felix Wagner", year: 2016, degree: "M.A. Communications", role: "Customer Success Manager", company: "Personio", location: "Munich", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=68", mutual: 4 },
  { id: 7, name: "Sophie Becker", year: 2020, degree: "M.Sc. Economics", role: "Strategy Consultant", company: "McKinsey", location: "Frankfurt", industry: "Consulting", avatar: "https://i.pravatar.cc/120?img=45", mutual: 19 },
  { id: 8, name: "David Fischer", year: 2018, degree: "Ph.D. Sociology", role: "Researcher", company: "Max Planck", location: "Berlin", industry: "Academia", avatar: "https://i.pravatar.cc/120?img=58", mutual: 12 },
  { id: 9, name: "Julia Hoffmann", year: 2022, degree: "B.A. Education", role: "UX Designer", company: "Lufthansa Systems", location: "Frankfurt", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=49", mutual: 31 },
  { id: 10, name: "Markus Lang", year: 2016, degree: "M.Sc. Finance", role: "Tax Manager", company: "PwC", location: "Frankfurt", industry: "Consulting", avatar: "https://i.pravatar.cc/120?img=15", mutual: 18 },
  { id: 11, name: "Carolin Roth", year: 2013, degree: "M.A. History", role: "Curator", company: "Bavarian National Museum", location: "Munich", industry: "Public Sector", avatar: "https://i.pravatar.cc/120?img=10", mutual: 6 },
  { id: 12, name: "Jakob Weber", year: 2020, degree: "M.Sc. CS", role: "ML Engineer", company: "DeepMind", location: "London", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=33", mutual: 22 },
  { id: 13, name: "Hannah Schulz", year: 2019, degree: "M.Sc. Psychology", role: "Clinical Psychologist", company: "Charité Berlin", location: "Berlin", industry: "Healthcare", avatar: "https://i.pravatar.cc/120?img=20", mutual: 14 },
  { id: 14, name: "Lukas Meyer", year: 2017, degree: "B.A. Business", role: "Founder & CEO", company: "Verdura GmbH", location: "Berlin", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=14", mutual: 35 },
  { id: 15, name: "Mira Patel", year: 2021, degree: "M.Sc. IS", role: "Software Engineer", company: "Stripe", location: "Dublin", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=26", mutual: 11 },
  { id: 16, name: "Stefan Krüger", year: 2014, degree: "M.Sc. Economics", role: "Senior Economist", company: "Deutsche Bundesbank", location: "Frankfurt", industry: "Public Sector", avatar: "https://i.pravatar.cc/120?img=51", mutual: 9 },
  { id: 17, name: "Elena Richter", year: 2022, degree: "B.A. Communications", role: "PR Manager", company: "Allianz", location: "Munich", industry: "Finance", avatar: "https://i.pravatar.cc/120?img=24", mutual: 7 },
  { id: 18, name: "Yusuf Demir", year: 2018, degree: "M.Sc. CS", role: "Backend Engineer", company: "Spotify", location: "Stockholm", industry: "Technology", avatar: "https://i.pravatar.cc/120?img=57", mutual: 25 }
];

export type Campaign = {
  id: number;
  title: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  description: string;
  category: string;
};

export const givingCampaigns: Campaign[] = [
  { id: 1, title: "Scholarship Fund 2026", raised: 87400, goal: 150000, donors: 312, daysLeft: 47, description: "Need-based scholarships for first-generation university students. Every €500 supports one semester.", category: "Students" },
  { id: 2, title: "AI Research Lab Expansion", raised: 245000, goal: 300000, donors: 89, daysLeft: 112, description: "New compute infrastructure for the WIAI faculty. Funds GPUs, lab space, and 3 research assistantships.", category: "Research" },
  { id: 3, title: "Campus Sustainability Initiative", raised: 32100, goal: 80000, donors: 178, daysLeft: 89, description: "Solar installations on campus buildings + new cycling infrastructure across all faculty sites.", category: "Campus" },
  { id: 4, title: "International Exchange Program", raised: 54200, goal: 100000, donors: 203, daysLeft: 65, description: "Funds travel grants for students from underrepresented backgrounds to study abroad.", category: "Students" },
  { id: 5, title: "Library Digital Archive", raised: 18900, goal: 45000, donors: 87, daysLeft: 134, description: "Digitize 12,000+ rare medieval manuscripts from the Bamberg State Library.", category: "Research" },
  { id: 6, title: "Mental Health Counseling", raised: 28400, goal: 60000, donors: 156, daysLeft: 78, description: "Fund additional counselors and crisis support for students across all faculties.", category: "Students" }
];

export type Donation = { id: number; date: string; campaign: string; amount: number };

export const givingHistory: Donation[] = [
  { id: 1, date: "2026-03-15", campaign: "Scholarship Fund 2026", amount: 250 },
  { id: 2, date: "2025-12-20", campaign: "Year-end Annual Fund", amount: 500 },
  { id: 3, date: "2025-09-08", campaign: "AI Research Lab Expansion", amount: 300 },
  { id: 4, date: "2025-06-14", campaign: "Class of 2019 Gift", amount: 200 },
  { id: 5, date: "2025-03-22", campaign: "International Exchange Program", amount: 150 },
  { id: 6, date: "2024-11-30", campaign: "Year-end Annual Fund", amount: 400 },
  { id: 7, date: "2024-06-14", campaign: "Class of 2019 Gift", amount: 150 }
];

export type NewsArticle = {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string;
  image: string;
  readTime: number;
  author: string;
};

export const news: NewsArticle[] = [
  { id: 1, title: "Bamberg ranked #1 in Bavaria for Information Systems", category: "University", date: "2026-05-08", excerpt: "The 2026 CHE Hochschulranking places the WIAI faculty at the top in Bavaria for the third year running.", body: "The Centre for Higher Education (CHE) released its 2026 ranking this morning, with the Faculty of Information Systems & Applied Computer Sciences (WIAI) at Otto-Friedrich-Universität Bamberg ranking #1 among Bavarian universities. The ranking cited the faculty's strong teaching evaluations, industry placement rates above 94%, and research output in privacy-preserving machine learning. Rector Prof. Dr. Kai Fischbach noted that the result reflects 'a sustained investment in small-group teaching and close ties to regional employers.' The ranking compared 47 institutions across 6 dimensions.", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800", readTime: 3, author: "University Press" },
  { id: 2, title: "Alumni Spotlight: How Anna Klein '19 is building privacy-first ML at Google", category: "Alumni", date: "2026-05-05", excerpt: "From a Bamberg thesis on differential privacy to leading a team at Google Zürich.", body: "Anna Klein finished her M.Sc. at WIAI in 2019 with a thesis on differential privacy in federated learning, supervised by Prof. Dr. Bauer. Six years later, she leads a 12-person ML research team at Google Zürich working on the same problem at planetary scale. 'My time at Bamberg taught me to start with rigorous foundations before reaching for the latest paper,' she says. We sat down with Anna to talk about her career trajectory, what she looks for when hiring engineers, and her advice for current students considering industry research roles.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800", readTime: 6, author: "Marie Schäfer '14" },
  { id: 3, title: "New partnership with Siemens for industry-embedded master's theses", category: "Partnership", date: "2026-04-28", excerpt: "Up to 20 students per year will write their thesis embedded in Siemens R&D teams.", body: "The university announced a five-year partnership with Siemens AG to embed up to 20 master's students per year directly into Siemens R&D teams in Munich and Erlangen. Students retain their academic supervisor at Bamberg and receive a €2,400/month stipend during the six-month thesis period. The program targets students in Information Systems, Computer Science, and Industrial Engineering.", image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800", readTime: 4, author: "University Press" },
  { id: 4, title: "Rector announces €4.2M EU grant for digital humanities", category: "Research", date: "2026-04-20", excerpt: "Horizon Europe grant funds a 5-year AI-assisted manuscript analysis project.", body: "A consortium led by Otto-Friedrich-Universität Bamberg has secured a €4.2M Horizon Europe grant to fund 'MAGNA' (Manuscript Analysis with Generative Neural Approaches), a five-year project applying machine learning to medieval manuscript analysis. The project will digitize and annotate 12,000+ manuscripts from the Bamberg State Library, with partner institutions in Vienna, Paris, and Cambridge.", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", readTime: 5, author: "Research Office" },
  { id: 5, title: "Bamberg Founders Network surpasses 100 active startups", category: "Alumni", date: "2026-04-15", excerpt: "From SaaS to climate tech, the alumni founders network just hit a major milestone.", body: "Six years after its launch, the Bamberg Founders Network now counts 103 active alumni-founded startups across 18 countries. Combined, the network's companies have raised over €380M in venture funding and employ approximately 2,400 people. The annual Pitch Night on June 25 will showcase 12 of the newest ventures.", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800", readTime: 4, author: "Lukas Meyer '17" },
  { id: 6, title: "Campus expansion plan approved by city council", category: "University", date: "2026-04-02", excerpt: "Two new buildings near Markusplatz will host the expanded AI lab and a student commons.", body: "Bamberg city council approved the university's expansion plan in a 32-4 vote last Thursday. The plan adds 4,800m² of teaching and research space across two new buildings adjacent to Markusplatz, with construction beginning in spring 2027. The expansion will include the new AI Research Lab and a 1,200-seat student commons with study spaces, a café, and event hall.", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", readTime: 5, author: "University Press" },
  { id: 7, title: "Class of 2019 Reunion Weekend: Save the date", category: "Events", date: "2026-03-28", excerpt: "The five-year class reunion takes over campus June 13–15.", body: "Mark your calendars: the Class of 2019 five-year reunion weekend runs June 13–15, 2026, with a Friday welcome reception, Saturday gala dinner, and Sunday brunch with the Rector. Class members can register at the alumni portal. Early-bird pricing ends May 1.", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800", readTime: 2, author: "Class of 2019 Committee" },
  { id: 8, title: "WIAI alumni dominate German AI startup landscape", category: "Research", date: "2026-03-15", excerpt: "Six of the top 50 German AI startups have a Bamberg WIAI graduate in the founding team.", body: "A new analysis by Handelsblatt finds that six of the top 50 German AI startups (by funding raised) have at least one founder from the WIAI faculty at Bamberg. The list includes Verdura, Modulos, and Sereact — all founded by alumni who graduated in the past decade.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", readTime: 4, author: "Industry Analysis" }
];

export type Mentor = {
  id: number;
  name: string;
  year: number;
  role: string;
  company: string;
  expertise: string[];
  availability: string;
  avatar: string;
  rating: number;
  mentees: number;
  bio: string;
};

export const mentors: Mentor[] = [
  { id: 1, name: "Tobias Hoffmann", year: 2015, role: "Director of Product", company: "SAP", expertise: ["Product Management", "B2B SaaS", "Career Switching"], availability: "2 slots / month", avatar: "https://i.pravatar.cc/120?img=12", rating: 4.9, mentees: 14, bio: "Led 5 product launches at SAP S/4HANA. Happy to chat about breaking into PM, IC-to-manager transitions, and German tech." },
  { id: 2, name: "Marie Schäfer", year: 2014, role: "Policy Analyst", company: "EU Commission", expertise: ["Public Sector", "EU Careers", "Policy"], availability: "1 slot / month", avatar: "https://i.pravatar.cc/120?img=32", rating: 5.0, mentees: 8, bio: "Working on AI Act implementation at DG CNECT. Can help with EU concours prep and policy career paths." },
  { id: 3, name: "Anna Klein", year: 2019, role: "Software Engineer", company: "Google", expertise: ["Engineering", "ML/AI", "Interview Prep"], availability: "3 slots / month", avatar: "https://i.pravatar.cc/120?img=44", rating: 4.8, mentees: 22, bio: "Leading ML privacy research at Google Zürich. Particularly happy to help students transitioning from academia to industry." },
  { id: 4, name: "Sophie Becker", year: 2020, role: "Consultant", company: "McKinsey", expertise: ["Consulting", "Case Interviews", "MBA Apps"], availability: "Full this month", avatar: "https://i.pravatar.cc/120?img=45", rating: 4.9, mentees: 19, bio: "MBB consulting after Bamberg. Mock case interviews and MBA application reviews." },
  { id: 5, name: "Lukas Meyer", year: 2017, role: "Founder & CEO", company: "Verdura GmbH", expertise: ["Entrepreneurship", "Fundraising", "B2B Sales"], availability: "2 slots / month", avatar: "https://i.pravatar.cc/120?img=14", rating: 4.7, mentees: 11, bio: "Founded Verdura (€12M Series A). Happy to discuss startup ideas, fundraising, and first-hire strategies." },
  { id: 6, name: "Jakob Weber", year: 2020, role: "ML Engineer", company: "DeepMind", expertise: ["Deep Learning", "Research", "PhD Applications"], availability: "1 slot / month", avatar: "https://i.pravatar.cc/120?img=33", rating: 5.0, mentees: 7, bio: "PhD-track ML engineer. Can help with research role applications and academia-vs-industry decisions." },
  { id: 7, name: "Carolin Roth", year: 2013, role: "Curator", company: "Bavarian National Museum", expertise: ["Cultural Sector", "Humanities Careers"], availability: "1 slot / month", avatar: "https://i.pravatar.cc/120?img=10", rating: 4.8, mentees: 5, bio: "Curating exhibitions on medieval art. Mentor for humanities and cultural sector careers." },
  { id: 8, name: "Stefan Krüger", year: 2014, role: "Senior Economist", company: "Deutsche Bundesbank", expertise: ["Finance", "Public Sector", "Quant Research"], availability: "Full this month", avatar: "https://i.pravatar.cc/120?img=51", rating: 4.9, mentees: 16, bio: "Quant research at the Bundesbank. Can help with central banking and quant finance career paths." }
];

export type Course = {
  semester: string;
  code: string;
  title: string;
  credits: number;
  grade: string;
};

export const transcriptCourses: Course[] = [
  { semester: "WS 2017/18", code: "WIAI-B-INF1", title: "Introduction to Computer Science", credits: 6, grade: "1.7" },
  { semester: "WS 2017/18", code: "WIAI-B-MATH1", title: "Mathematics for CS I", credits: 6, grade: "2.0" },
  { semester: "WS 2017/18", code: "WIAI-B-SE1", title: "Software Engineering Fundamentals", credits: 6, grade: "1.3" },
  { semester: "SS 2018", code: "WIAI-B-ALG", title: "Algorithms & Data Structures", credits: 6, grade: "1.7" },
  { semester: "SS 2018", code: "WIAI-B-DB", title: "Database Systems", credits: 6, grade: "1.3" },
  { semester: "SS 2018", code: "WIAI-B-NW", title: "Computer Networks", credits: 6, grade: "2.0" },
  { semester: "WS 2018/19", code: "WIAI-M-INF", title: "Advanced Distributed Systems", credits: 6, grade: "1.3" },
  { semester: "WS 2018/19", code: "WIAI-M-ML", title: "Machine Learning Foundations", credits: 6, grade: "1.7" },
  { semester: "WS 2018/19", code: "WIAI-M-SE", title: "Software Engineering Methods", credits: 6, grade: "1.0" },
  { semester: "SS 2019", code: "WIAI-M-CC", title: "Cloud Computing & Microservices", credits: 6, grade: "1.3" },
  { semester: "SS 2019", code: "WIAI-M-DB", title: "Advanced Database Systems", credits: 6, grade: "2.0" },
  { semester: "SS 2019", code: "WIAI-M-SEC", title: "Computer Security", credits: 6, grade: "1.7" },
  { semester: "WS 2019/20", code: "WIAI-T", title: "Master's Thesis: Privacy in Federated Learning", credits: 30, grade: "1.0" }
];

export const certifications = [
  { name: "AWS Solutions Architect — Professional", issuer: "Amazon Web Services", issued: "2023-08-14", expires: "2026-08-14" },
  { name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", issued: "2022-11-02", expires: "2025-11-02" },
  { name: "Scrum Master I (PSM I)", issuer: "Scrum.org", issued: "2021-04-19", expires: null }
];

export type Activity = {
  id: number;
  type: "connection" | "event" | "job" | "news" | "giving";
  text: string;
  time: string;
  avatar: string | null;
};

export const newsfeed: Activity[] = [
  { id: 1, type: "connection", text: "Niklas Bauer '17 accepted your connection request", time: "2h ago", avatar: "https://i.pravatar.cc/40?img=53" },
  { id: 2, type: "event", text: "RSVP confirmed: Munich Alumni Stammtisch on May 18", time: "1d ago", avatar: null },
  { id: 3, type: "job", text: "New job match: Senior Backend Engineer at Siemens (referral available)", time: "2d ago", avatar: null },
  { id: 4, type: "news", text: "Anna Klein '19 is featured in this week's Alumni Spotlight", time: "3d ago", avatar: "https://i.pravatar.cc/40?img=44" },
  { id: 5, type: "giving", text: "Class of 2019 gift reached 78% of its annual goal — €1,200 from final push", time: "5d ago", avatar: null },
  { id: 6, type: "event", text: "Tech Talk: AI Ethics — 12 new attendees this week", time: "6d ago", avatar: null }
];

export type Offer = {
  id: number;
  brand: string;
  category: string;
  discount: string;
  description: string;
  code: string;
  link: string;
  logo: string;
};

export const offers: Offer[] = [
  // Sports
  { id: 1, brand: "Nike", category: "Sports", discount: "20% Off", description: "Get 20% off all full-priced footwear and apparel.", code: "ALUMNI20", link: "https://nike.com", logo: "https://cdn.simpleicons.org/nike" },
  { id: 2, brand: "Adidas", category: "Sports", discount: "30% Outlet", description: "Extra 30% off already discounted items in the Outlet.", code: "ADI30ALUM", link: "https://adidas.com", logo: "https://cdn.simpleicons.org/adidas" },
  { id: 3, brand: "Puma", category: "Sports", discount: "15% Off", description: "15% discount on all regular priced items.", code: "PUMALUMNI", link: "https://puma.com", logo: "https://cdn.simpleicons.org/puma" },
  { id: 4, brand: "Under Armour", category: "Sports", discount: "20% Off", description: "Exclusive 20% discount on performance gear.", code: "UABAMBERG", link: "https://underarmour.com", logo: "https://cdn.simpleicons.org/underarmour" },
  { id: 5, brand: "New Balance", category: "Sports", discount: "10% Off", description: "Get 10% off running shoes and activewear.", code: "NBRUN10", link: "https://newbalance.com", logo: "https://cdn.simpleicons.org/newbalance" },

  // Clothing
  { id: 6, brand: "Zara", category: "Clothing", discount: "Free Shipping", description: "Free express shipping on all orders over €50.", code: "ZARAALUMNI", link: "https://zara.com", logo: "https://cdn.simpleicons.org/zara" },
  { id: 7, brand: "The North Face", category: "Clothing", discount: "10% Off", description: "10% discount on all outdoor gear and apparel.", code: "TNFSTUDENT", link: "https://thenorthface.com", logo: "https://cdn.simpleicons.org/thenorthface" },
  { id: 8, brand: "Uniqlo", category: "Clothing", discount: "€10 Off", description: "Get €10 off your next order of €70 or more.", code: "UNIQLO10", link: "https://uniqlo.com", logo: "https://cdn.simpleicons.org/uniqlo" },

  // Mobility
  { id: 9, brand: "Uber", category: "Mobility", discount: "€15 Off First Ride", description: "Save €15 on your first Uber ride in any European city.", code: "UBERALUMNI", link: "https://uber.com", logo: "https://cdn.simpleicons.org/uber" },
  { id: 10, brand: "Lyft", category: "Mobility", discount: "10% Off", description: "Get 10% off your next 5 rides to or from campus.", code: "LYFTBAM", link: "https://lyft.com", logo: "https://cdn.simpleicons.org/lyft" },
  { id: 11, brand: "BMW", category: "Mobility", discount: "Corporate Rates", description: "Access exclusive corporate leasing rates for alumni.", code: "Apply via link", link: "https://bmw.com", logo: "https://cdn.simpleicons.org/bmw" },
  { id: 12, brand: "Audi", category: "Mobility", discount: "Service Discount", description: "15% off service and maintenance at participating dealers.", code: "AUDIALUMNI", link: "https://audi.com", logo: "https://cdn.simpleicons.org/audi" },

  // Tech
  { id: 13, brand: "Apple", category: "Tech", discount: "Education Pricing", description: "Access special education pricing on Macs, iPads, and accessories.", code: "Auto-applied", link: "https://apple.com/education", logo: "https://cdn.simpleicons.org/apple" },
  { id: 14, brand: "Samsung", category: "Tech", discount: "15% Off", description: "15% discount on Galaxy smartphones and tablets.", code: "SAMALUMNI", link: "https://samsung.com", logo: "https://cdn.simpleicons.org/samsung" },
  { id: 15, brand: "Dell", category: "Tech", discount: "20% Off", description: "Up to 20% off XPS laptops and monitors.", code: "DELL20", link: "https://dell.com", logo: "https://cdn.simpleicons.org/dell" },
  { id: 16, brand: "Sony", category: "Tech", discount: "25% Off", description: "Exclusive 25% discount on audio and cameras.", code: "SONY25", link: "https://sony.com", logo: "https://cdn.simpleicons.org/sony" },
  { id: 17, brand: "Lenovo", category: "Tech", discount: "ThinkPad Discount", description: "Save up to 15% on ThinkPad laptops for professionals.", code: "LENOVO15", link: "https://lenovo.com", logo: "https://cdn.simpleicons.org/lenovo" },

  // Retail
  { id: 18, brand: "Zalando", category: "Retail", discount: "15% Off Fashion", description: "Get 15% off your next fashion order.", code: "ZALANDO15", link: "https://zalando.com", logo: "https://cdn.simpleicons.org/zalando" },
  { id: 19, brand: "IKEA", category: "Retail", discount: "Free Delivery", description: "Free delivery on all online furniture orders over €200.", code: "IKEADELIVER", link: "https://ikea.com", logo: "https://cdn.simpleicons.org/ikea" },
  { id: 20, brand: "MediaMarkt", category: "Retail", discount: "€20 Off", description: "€20 discount on purchases over €100.", code: "MEDIA20", link: "https://mediamarkt.de", logo: "https://cdn.simpleicons.org/mediamarkt" },
  { id: 21, brand: "eBay", category: "Retail", discount: "10% Cashback", description: "Earn 10% cashback on refurbished electronics.", code: "EBAYREFURB", link: "https://ebay.com", logo: "https://cdn.simpleicons.org/ebay" },

  // Travel
  { id: 22, brand: "Expedia", category: "Travel", discount: "10% Off Hotels", description: "Save an extra 10% on select hotels worldwide.", code: "EXPALUMNI", link: "https://expedia.com", logo: "https://cdn.simpleicons.org/expedia" },
  { id: 23, brand: "Airbnb", category: "Travel", discount: "€30 Off", description: "Get €30 off your first booking.", code: "AIRBNB30", link: "https://airbnb.com", logo: "https://cdn.simpleicons.org/airbnb" },
  { id: 24, brand: "Ryanair", category: "Travel", discount: "15% Off Flights", description: "15% discount on standard fares and free checked bag via ESN.", code: "Apply via link", link: "https://ryanair.com", logo: "https://cdn.simpleicons.org/ryanair" },
  { id: 25, brand: "Lufthansa", category: "Travel", discount: "Student Fares", description: "Access special student and youth fares globally.", code: "Apply via link", link: "https://lufthansa.com", logo: "https://cdn.simpleicons.org/lufthansa" },

  // Entertainment
  { id: 26, brand: "Spotify", category: "Entertainment", discount: "50% Off Premium", description: "Enjoy ad-free music with 50% off Spotify Premium.", code: "SPOTIFY50", link: "https://spotify.com", logo: "https://cdn.simpleicons.org/spotify" },
  { id: 27, brand: "Netflix", category: "Entertainment", discount: "1 Month Free", description: "Get your first month of Netflix Standard for free.", code: "Apply via link", link: "https://netflix.com", logo: "https://cdn.simpleicons.org/netflix" },

  // Health
  { id: 28, brand: "Peloton", category: "Health", discount: "Hardware Discount", description: "Save €150 on the Peloton Bike or Tread.", code: "PELOBAM", link: "https://onepeloton.com", logo: "https://cdn.simpleicons.org/peloton" },
  { id: 29, brand: "Strava", category: "Health", discount: "60 Days Free", description: "Get 60 days of Strava Premium for free.", code: "STRAVA60", link: "https://strava.com", logo: "https://cdn.simpleicons.org/strava" },
  { id: 30, brand: "Headspace", category: "Health", discount: "€9.99/Year", description: "Special student/alumni rate of €9.99 for a full year of meditation.", code: "Apply via link", link: "https://headspace.com", logo: "https://cdn.simpleicons.org/headspace" }
];
