const fs = require('fs');
const path = require('path');

const dataPath = path.join(
  __dirname,
  '..',
  'src',
  'app',
  'components',
  'wcag-demo',
  'wcag-cases.data.ts'
);

let source = fs.readFileSync(dataPath, 'utf8');

// Remove legacy example fields from the raw type.
source = source.replace(/^\s*inaccessibleExample\s*:\s*string;\r?\n/gm, '');
source = source.replace(/^\s*accessibleExample\s*:\s*string;\r?\n/gm, '');
source = source.replace(/^\s*inaccessibleExample\s*\?:\s*string;\r?\n/gm, '');
source = source.replace(/^\s*accessibleExample\s*\?:\s*string;\r?\n/gm, '');

// Remove legacy example properties (template literals) from each case object.
source = source.replace(/^\s*inaccessibleExample\s*:\s*`[\s\S]*?`,\r?\n/gm, '');
source = source.replace(/^\s*accessibleExample\s*:\s*`[\s\S]*?`,\r?\n/gm, '');

// Ensure the WCAG_CASES mapping adds template keys derived from the id.
const mappingRegex = /export const WCAG_CASES: WCAGCase\[] = WCAG_CASES_RAW\.map\(function \(wcagCase\) \{[\s\S]*?\}\);/m;
const mappingReplacement =
  "export const WCAG_CASES: WCAGCase[] = WCAG_CASES_RAW.map(function (wcagCase) {\n" +
  "  return {\n" +
  "    pillar: pillarFromCriterion(wcagCase.criterion),\n" +
  "    ...wcagCase,\n" +
  "    inaccessibleTemplateKey: wcagCase.id + '/inaccessible',\n" +
  "    accessibleTemplateKey: wcagCase.id + '/accessible',\n" +
  "  };\n" +
  "});";

if (mappingRegex.test(source)) {
  source = source.replace(mappingRegex, mappingReplacement);
} else if (!/inaccessibleTemplateKey\s*:\s*wcagCase\.id \+ '\/inaccessible'/.test(source)) {
  throw new Error('Could not locate WCAG_CASES mapping block to update.');
}

fs.writeFileSync(dataPath, source, 'utf8');
console.log('Cleaned wcag-cases.data.ts');
