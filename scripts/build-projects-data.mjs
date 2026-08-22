import fs from 'fs';

const header = `export interface Project {
  id: number;
  title: string;
  description: string;
  featured: string;
  thumbnails: string[];
  link: string;
  category: string;
  duration?: number | string;
  aos?: string;
}

const normalizePath = (path: string) => {
  const decoded = decodeURIComponent(path);
  return decoded.startsWith('/') ? decoded : \`/\${decoded}\`;
};

const toWebp = (path: string) =>
  path.replace(/\\.(png|PNG|jpe?g)$/i, '.webp');

const withPaths = (project: Project): Project => ({
  ...project,
  featured: toWebp(normalizePath(project.featured)),
  thumbnails: project.thumbnails.map((p) => toWebp(normalizePath(p))),
});

const rawProjects: Project[] = `;

const footer = `;

export const allProjects: Project[] = rawProjects.map(withPaths);

export const projectCategories: string[] = [
  'All',
  ...Array.from(new Set(allProjects.map((p) => p.category))),
];
`;

// eslint-disable-next-line no-undef
const raw = fs.readFileSync('scripts/projects-raw.json', 'utf8');
const projects = JSON.parse(raw);

fs.writeFileSync(
  'src/components/projects/ProjectsData.tsx',
  header + JSON.stringify(projects, null, 2) + footer
);

console.log(`Built ProjectsData.tsx with ${projects.length} projects`);
