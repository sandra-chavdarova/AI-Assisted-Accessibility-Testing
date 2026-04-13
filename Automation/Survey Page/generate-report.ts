import * as fs from 'fs';
import * as path from 'path';

const resultsDir = path.join(process.cwd(), 'test-results');
console.log('Results dir:', resultsDir);
console.log('Files found:', fs.readdirSync(resultsDir));
const reportPath = path.join(process.cwd(), 'accessibility-report.md');

const severityOrder = ['critical', 'serious', 'moderate', 'minor'];

function processFile(filename: string): string {
  const filePath = path.join(resultsDir, filename);
  if (!fs.existsSync(filePath)) return '';

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const violations = data.violations ?? [];
  const pageName = filename.replace('.json', '');

  let section = `## ${pageName}\n\n`;
  section += `**URL:** ${data.url}\n\n`;
  section += `**Total violations:** ${violations.length}\n\n`;

  if (violations.length === 0) {
    section += `No violations found.\n\n`;
    return section;
  }

  // Group by severity
  for (const severity of severityOrder) {
    const group = violations.filter((v: any) => v.impact === severity);
    if (group.length === 0) continue;

    const label = severity === 'critical' ? '[CRITICAL]' : severity === 'serious' ? '[SERIOUS]' : severity === 'moderate' ? '[MODERATE]' : '[MINOR]';
    section += `### ${label} ${severity.toUpperCase()} (${group.length})\n\n`; 
    
    for (const v of group) {
      section += `#### ${v.id}: ${v.help}\n`;
      section += `- **Description:** ${v.description}\n`;
      section += `- **WCAG:** ${v.tags.filter((t: string) => t.startsWith('wcag')).join(', ')}\n`;
      section += `- **Affected elements (${v.nodes.length}):**\n`;
      for (const node of v.nodes.slice(0, 3)) {
        section += `  - \`${node.target.join(' > ')}\`\n`;
        if (node.failureSummary) {
          section += `    - ${node.failureSummary.split('\n')[0]}\n`;
        }
      }
      if (v.nodes.length > 3) section += `  - ...and ${v.nodes.length - 3} more\n`;
      section += `- **More info:** ${v.helpUrl}\n\n`;
    }
  }

  return section;
}

// Build report
const jsonFiles = fs.readdirSync(resultsDir).filter(f => f.endsWith('.json') && !f.startsWith('.'));

let report = `# Accessibility Audit Report\n\n`;
report += `Generated: ${new Date().toLocaleString()}\n\n`;
report += `---\n\n`;

for (const file of jsonFiles.sort()) {
  report += processFile(file);
  report += `---\n\n`;
}

fs.writeFileSync(reportPath, report);
console.log(`Report written to accessibility-report.md`);