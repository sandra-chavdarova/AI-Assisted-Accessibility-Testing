"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const resultsDir = path.join(process.cwd(), 'test-results');
console.log('Results dir:', resultsDir);
console.log('Files found:', fs.readdirSync(resultsDir));
const reportPath = path.join(process.cwd(), 'accessibility-report.md');
const severityOrder = ['critical', 'serious', 'moderate', 'minor'];
function processFile(filename) {
    var _a;
    const filePath = path.join(resultsDir, filename);
    if (!fs.existsSync(filePath))
        return '';
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const violations = (_a = data.violations) !== null && _a !== void 0 ? _a : [];
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
        const group = violations.filter((v) => v.impact === severity);
        if (group.length === 0)
            continue;
        const label = severity === 'critical' ? '[CRITICAL]' : severity === 'serious' ? '[SERIOUS]' : severity === 'moderate' ? '[MODERATE]' : '[MINOR]';
        section += `### ${label} ${severity.toUpperCase()} (${group.length})\n\n`;
        for (const v of group) {
            section += `#### ${v.id}: ${v.help}\n`;
            section += `- **Description:** ${v.description}\n`;
            section += `- **WCAG:** ${v.tags.filter((t) => t.startsWith('wcag')).join(', ')}\n`;
            section += `- **Affected elements (${v.nodes.length}):**\n`;
            for (const node of v.nodes.slice(0, 3)) {
                section += `  - \`${node.target.join(' > ')}\`\n`;
                if (node.failureSummary) {
                    section += `    - ${node.failureSummary.split('\n')[0]}\n`;
                }
            }
            if (v.nodes.length > 3)
                section += `  - ...and ${v.nodes.length - 3} more\n`;
            section += `- **More info:** ${v.helpUrl}\n\n`;
        }
    }
    return section;
}
// Build report
const jsonFiles = fs.readdirSync(resultsDir).filter(f => f.endsWith('.json'));
let report = `#Accessibility Audit Report\n\n`;
report += `Generated: ${new Date().toLocaleString()}\n\n`;
report += `---\n\n`;
for (const file of jsonFiles.sort()) {
    report += processFile(file);
    report += `---\n\n`;
}
fs.writeFileSync(reportPath, report);
console.log(`Report written to accessibility-report.md`);
