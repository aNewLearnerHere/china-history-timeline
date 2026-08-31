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
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  const fixedLines = [];
  
  let inRuler = false;
  let hasAchievements = false;
  let lastBioLineIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect start of a ruler object
    if (line.includes('name:') && line.includes('title:') && !line.includes('achievements:')) {
      inRuler = true;
      hasAchievements = false;
    }
    
    // Check if this line has achievements
    if (line.trim().startsWith('achievements:')) {
      hasAchievements = true;
    }
    
    // Check if we're at the end of a ruler object
    if (line.trim() === '},' && inRuler) {
      if (!hasAchievements && lastBioLineIndex >= 0) {
        // Insert achievements: [] before the closing brace
        const bioLine = fixedLines[lastBioLineIndex];
        const indent = bioLine.match(/^(\s*)/)[1];
        fixedLines.splice(lastBioLineIndex + 1, 0, `${indent}  achievements: [],`);
      }
      inRuler = false;
      hasAchievements = false;
      lastBioLineIndex = -1;
    }
    
    // Track the last bio line
    if (line.trim().startsWith('bio:')) {
      lastBioLineIndex = fixedLines.length;
    }
    
    fixedLines.push(line);
  }
  
  fs.writeFileSync(fullPath, fixedLines.join('\n'));
  console.log(`Fixed ${file}`);
});
