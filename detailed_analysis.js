const fs = require('fs');
const path = require('path');

function scanDirectory(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        scanDirectory(fullPath, files);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function readMarkdownFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

function parseMarkdownContent(content) {
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        level: match[1].length,
        title: match[2],
        content: []
      };
    } else if (currentSection) {
      currentSection.content.push(line);
    }
  }
  
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections;
}

function extractKeyPoints(sections, minLevel = 2) {
  const keyPoints = [];
  
  for (const section of sections) {
    if (section.level >= minLevel && section.content.length > 0) {
      const text = section.content.join('\n').trim();
      if (text.length > 20) {
        keyPoints.push({
          title: section.title,
          content: text.substring(0, 500)
        });
      }
    }
  }
  
  return keyPoints;
}

function main() {
  const docsDir = 'c:\\ai';
  const mdFiles = scanDirectory(docsDir);
  
  const allData = {
    summary: {
      totalFiles: mdFiles.length,
      totalWords: 0,
      categories: {}
    },
    documents: []
  };
  
  for (const filePath of mdFiles) {
    const content = readMarkdownFile(filePath);
    if (!content) continue;
    
    const wordCount = content.replace(/[^\u4e00-\u9fa5]/g, '').length;
    const sections = parseMarkdownContent(content);
    const keyPoints = extractKeyPoints(sections);
    
    const relativePath = filePath.replace('c:\\ai\\', '');
    let category = '核心文档';
    
    if (relativePath.includes('项目记录')) {
      if (relativePath.includes('研究报告')) category = '研究报告';
      else if (relativePath.includes('会议记录')) category = '会议记录';
      else if (relativePath.includes('角色调研')) category = '角色调研';
      else if (relativePath.includes('技术决策')) category = '技术决策';
      else if (relativePath.includes('工作日志')) category = '工作日志';
      else if (relativePath.includes('设计交付')) category = '设计交付';
      else if (relativePath.includes('团队建设')) category = '团队建设';
      else if (relativePath.includes('项目管理')) category = '项目管理';
      else category = '项目记录';
    } else if (relativePath.includes('任务管理')) {
      if (relativePath.includes('任务清单')) category = '任务清单';
      else if (relativePath.includes('角色任务跟踪')) category = '角色任务跟踪';
      else if (relativePath.includes('协调记录')) category = '协调记录';
      else if (relativePath.includes('每日总结')) category = '每日总结';
      else category = '任务管理';
    } else if (relativePath.includes('数据收集')) category = '数据收集';
    
    if (!allData.summary.categories[category]) {
      allData.summary.categories[category] = { files: 0, words: 0 };
    }
    
    allData.summary.categories[category].files++;
    allData.summary.categories[category].words += wordCount;
    allData.summary.totalWords += wordCount;
    
    allData.documents.push({
      path: relativePath,
      filename: path.basename(filePath),
      wordCount,
      category,
      sectionsCount: sections.length,
      keyPointsCount: keyPoints.length,
      firstFewLines: content.split('\n').slice(0, 3).join('\n'),
      keyPoints
    });
  }
  
  fs.writeFileSync('c:\\ai\\detailed_analysis.json', JSON.stringify(allData, null, 2));
  
  console.log('详细分析完成');
  console.log(`总文件数: ${allData.summary.totalFiles}`);
  console.log(`总字数: ${allData.summary.totalWords.toLocaleString()}`);
  console.log(`分类统计:`);
  
  for (const [category, data] of Object.entries(allData.summary.categories)) {
    console.log(`  ${category}: ${data.files}个文件, ${data.words.toLocaleString()}字`);
  }
}

main();
