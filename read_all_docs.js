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

function analyzeDocument(filePath, content) {
  const lines = content.split('\n');
  const wordCount = content.replace(/[^\u4e00-\u9fa5]/g, '').length;
  
  return {
    path: filePath,
    filename: path.basename(filePath),
    lines: lines.length,
    wordCount,
    title: lines[0].replace(/^#+\s*/, ''),
    category: getCategory(filePath)
  };
}

function getCategory(filePath) {
  const relativePath = filePath.replace('c:\\ai\\', '');
  
  if (relativePath.includes('项目记录')) {
    if (relativePath.includes('研究报告')) return '研究报告';
    if (relativePath.includes('会议记录')) return '会议记录';
    if (relativePath.includes('角色调研')) return '角色调研';
    if (relativePath.includes('技术决策')) return '技术决策';
    if (relativePath.includes('工作日志')) return '工作日志';
    if (relativePath.includes('设计交付')) return '设计交付';
    if (relativePath.includes('团队建设')) return '团队建设';
    if (relativePath.includes('项目管理')) return '项目管理';
    return '项目记录';
  }
  
  if (relativePath.includes('任务管理')) {
    if (relativePath.includes('任务清单')) return '任务清单';
    if (relativePath.includes('角色任务跟踪')) return '角色任务跟踪';
    if (relativePath.includes('协调记录')) return '协调记录';
    if (relativePath.includes('每日总结')) return '每日总结';
    return '任务管理';
  }
  
  if (relativePath.includes('数据收集')) return '数据收集';
  
  return '核心文档';
}

function main() {
  const docsDir = 'c:\\ai';
  const mdFiles = scanDirectory(docsDir);
  
  console.log(`找到 ${mdFiles.length} 个 Markdown 文件\n`);
  
  const documents = [];
  
  for (const filePath of mdFiles) {
    const content = readMarkdownFile(filePath);
    if (content) {
      const analysis = analyzeDocument(filePath, content);
      documents.push({
        ...analysis,
        content
      });
    }
  }
  
  documents.sort((a, b) => a.wordCount - b.wordCount);
  
  console.log('文档统计:');
  console.log('='.repeat(80));
  
  let totalWords = 0;
  let totalLines = 0;
  
  for (const doc of documents) {
    console.log(`${doc.filename.padEnd(40)} | ${doc.category.padEnd(15)} | ${doc.wordCount.toString().padStart(6)}字 | ${doc.lines.toString().padStart(4)}行`);
    totalWords += doc.wordCount;
    totalLines += doc.lines;
  }
  
  console.log('='.repeat(80));
  console.log(`总计: ${documents.length} 个文件 | ${totalWords.toLocaleString()} 字 | ${totalLines} 行`);
  
  fs.writeFileSync('c:\\ai\\document_analysis.json', JSON.stringify(documents, null, 2));
  console.log('\n分析结果已保存到 document_analysis.json');
}

main();
