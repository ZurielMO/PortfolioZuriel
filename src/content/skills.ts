export type Skill = {
  name: string;
  logo: string;
};

export type SkillGroup = {
  title: string;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "Next.js", logo: "/logos/nextjs.svg" },
      { name: "React", logo: "/logos/react.svg" },
      { name: "TypeScript", logo: "/logos/typescript.svg" },
      { name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
      { name: "Bootstrap", logo: "/logos/bootstrap.svg" },
      { name: "Flutter", logo: "/logos/flutter.svg" },
      { name: "Angular", logo: "/logos/angular.svg" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Python", logo: "/logos/python.svg" },
      { name: "Java", logo: "/logos/java.svg" },
      { name: "JavaScript", logo: "/logos/javascript.svg" },
      { name: "Express", logo: "/logos/express.svg" },
      { name: "Node.js", logo: "/logos/nodejs.svg" },
      { name: "MySQL", logo: "/logos/mysql.svg" },
      { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
      { name: "Firebase", logo: "/logos/firebase.svg" },
    ],
  },
  {
    title: "Tooling",
    items: [
      { name: "Git", logo: "/logos/git.svg" },
      { name: "npm", logo: "/logos/npm.svg" },
      { name: "ESLint", logo: "/logos/eslint.svg" },
      { name: "Vercel", logo: "/logos/vercel.svg" },
    ],
  },
];

export const allSkills: Skill[] = skillGroups.flatMap((group) => group.items);
