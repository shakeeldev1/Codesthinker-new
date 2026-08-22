import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectDir = 'public/project';
const dataFile = 'src/components/projects/ProjectsData.tsx';

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(png|jpe?g)$/i.test(entry.name) && !entry.name.endsWith('.webp')) {
      files.push(full);
    }
  }

  return files;
}

async function convertAll() {
  const files = await walk(projectDir);
  let converted = 0;

  for (const file of files) {
    const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
    if (fs.existsSync(webpPath)) continue;

    await sharp(file).webp({ quality: 82 }).toFile(webpPath);
    converted++;
  }

  console.log(`Converted ${converted} images to .webp`);
}

function updateDataPaths() {
  let content = fs.readFileSync(dataFile, 'utf8');
  content = content.replace(/\/project\/([^"']+?)\.(png|PNG|jpg|jpeg)/g, '/project/$1.webp');
  fs.writeFileSync(dataFile, content);
  console.log('Updated ProjectsData.tsx paths to .webp');
}

await convertAll();
updateDataPaths();
