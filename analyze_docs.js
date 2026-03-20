#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 配置
const WORKSPACE_DIR = 'c:\\ai';
const OUTPUT_FILE = 'c:\\ai\\docs_analysis.json';

// 深度读取文件
function readFileSyncSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

// 递归扫描目录
function scanDirectory(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // 跳过node_modules等目录
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        scanDirectory(fullPath, files);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 提取文档基本信息
function extractDocInfo(filePath) {
  const content = readFileSyncSafe(filePath);
  if (!content) return null;
  
  const lines = content.split('\n');
  const title = lines[0].replace(/^#+\s*/, '') || path.basename(filePath, '.md');
  const relativePath = path.relative(WORKSPACE_DIR, filePath);
  
  // 提取元数据
  const metadata = {
    title,
    path: relativePath,
    size: content.length,
    lines: content.split('\n').length,
    tags: [],
    categories: []
  };
  
  // 提取标签
  if (content.includes('## ')) {
    const sections = content.split('## ').slice(1);
    sections.forEach(section => {
      const firstLine = section.split('\n')[0].trim();
      if (firstLine.length < 50 && !firstLine.includes('[')) {
        metadata.tags.push(firstLine);
      }
    });
  }
  
  return metadata;
}

// 分析文档内容
function analyzeContent(filePath) {
  const content = readFileSyncSafe(filePath);
  if (!content) return null;
  
  const analysis = {
    type: 'unknown',
    keyPoints: [],
    technicalDetails: [],
    codeExamples: [],
    requirements: [],
    architecture: []
  };
  
  // 判断文档类型
  if (content.includes('需求') || content.includes('痛点')) {
    analysis.type = 'requirements';
  } else if (content.includes('架构') || content.includes('技术')) {
    analysis.type = 'architecture';
  } else if (content.includes('接口') || content.includes('API')) {
    analysis.type = 'api';
  } else if (content.includes('计划') || content.includes('方案')) {
    analysis.type = 'plan';
  } else if (content.includes('代码') || content.includes('实现')) {
    analysis.type = 'implementation';
  }
  
  // 提取关键点（简化版）
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
      analysis.keyPoints.push(line.trim());
    }
    
    if (line.includes('interface') || line.includes('function') || line.includes('class')) {
      analysis.technicalDetails.push(line.trim());
    }
    
    if (line.includes('```') || line.includes('`')) {
      analysis.codeExamples.push(line.trim());
    }
    
    if (line.includes('必须') || line.includes('应该') || line.includes('需要')) {
      analysis.requirements.push(line.trim());
    }
    
    if (line.includes('前端') || line.includes('后端') || line.includes('AI')) {
      analysis.architecture.push(line.trim());
    }
  });
  
  return analysis;
}

// 主函数
function main() {
  console.log('开始扫描文档...');
  
  // 扫描所有MD文件
  const mdFiles = scanDirectory(WORKSPACE_DIR);
  console.log(`找到 ${mdFiles.length} 个MD文件`);
  
  // 分析每个文件
  const analysisResults = [];
  
  for (const filePath of mdFiles) {
    console.log(`正在分析: ${filePath}`);
    
    const docInfo = extractDocInfo(filePath);
    const contentAnalysis = analyzeContent(filePath);
    
    if (docInfo) {
      analysisResults.push({
        ...docInfo,
        contentAnalysis
      });
    }
  }
  
  // 保存结果
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(analysisResults, null, 2));
  console.log(`分析完成，结果已保存到 ${OUTPUT_FILE}`);
  
  // 打印摘要
  console.log('\n=== 文档分析摘要 ===');
  console.log(`总文档数: ${analysisResults.length}`);
  
  const types = {};
  analysisResults.forEach(doc => {
    const type = doc.contentAnalysis?.type || 'unknown';
    types[type] = (types[type] || 0) + 1;
  });
  
  console.log('\n文档类型分布:');
  Object.entries(types).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  
  console.log('\n文档列表:');
  analysisResults.forEach(doc => {
    console.log(`  - ${doc.path} (${doc.size} bytes, ${doc.lines} lines)`);
  });
}

main();
