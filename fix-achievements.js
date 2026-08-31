import fs from 'fs';
import path from 'path';

const files = [
  '~/Projects/china-history-timeline/src/data/dynasties/han.ts',
  '~/Projects/china-history-timeline/src/data/dynasties/jin.ts',
  '~/Projects/china-history-timeline/src/data/dynasties/nanchao.ts',
  '~/Projects/china-history-timeline/src/data/dynasties/sui.ts'
];

files.forEach(file => {
  const fullPath = file.replace('~', process.env.HOME);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Add achievements: [] to ruler objects that don't have it
  // Pattern: find lines ending with bio: '...' without achievements
  content = content.replace(/(bio: '[^']*\n)(\s*\},?)/g, (match, bioLine, closing) => {
    // Check if next line has achievements
    const nextLines = content.substring(content.indexOf(match) + match.length);
    if (nextLines.trim().startsWith('achievements:') || nextLines.trim().startsWith('story:') || nextLines.trim().startsWith('legacy:')) {
      return match; // Already has achievements or other fields
    }
    return bioLine + '      achievements: [],\n' + closing;
  });
  
  fs.writeFileSync(fullPath, content);
  console.log(`Fixed ${file}`);
});
