import fs from 'fs';
import path from 'path';

const file = 'src/components/projects/ProjectsData.tsx';
let content = fs.readFileSync(file, 'utf8');
const exts = ['.png', '.PNG', '.jpg', '.jpeg', '.webp'];

function resolvePath(webPath) {
  const withoutExt = webPath.replace(/\.(webp|png|PNG|jpg|jpeg)$/i, '');
  const rel = withoutExt.replace(/^\//, '');

  for (const ext of exts) {
    const candidate = path.join('public', rel + ext);
    if (fs.existsSync(candidate)) {
      return '/' + rel.replace(/\\/g, '/') + ext;
    }
  }

  return webPath;
}

const updated = content.replace(/\/project\/[^"']+/g, (match) => resolvePath(match));
fs.writeFileSync(file, updated);
console.log('Fixed project image paths in ProjectsData.tsx');
