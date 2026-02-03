import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { A11yPillarKey, WCAGCase } from './wcag-case.model';
import { WCAG_CASES } from './wcag-cases.data';

interface WCAGCaseGroup {
  pillar: A11yPillarKey;
  label: string;
  cases: WCAGCase[];
}

@Component({
  selector: 'wcag-demo',
  templateUrl: './wcag-demo.component.html',
  styleUrls: ['./wcag-demo.component.scss'],
})
export class WCAGDemoComponent {
  wcagCaseGroups: WCAGCaseGroup[];

  private readonly pillarLabels: { [key in A11yPillarKey]: string } = {
    perceptible: 'Perceptible (1.x)',
    operable: 'Operable (2.x)',
    comprensible: 'Comprensible (3.x)',
    robusto: 'Robusto (4.x)',
  };

  expandedCases: Set<string> = new Set();
  revealedSolutions: Set<string> = new Set();
  showHtmlCases: Set<string> = new Set();

  isSidebarCollapsed: boolean = false;

  editedInaccessibleHtml: { [caseId: string]: string } = {};
  editedAccessibleHtml: { [caseId: string]: string } = {};

  constructor(private sanitizer: DomSanitizer) {
    this.wcagCaseGroups = this.buildCaseGroups(WCAG_CASES);
  }

  trustedSrcDoc(srcDocHtml: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(srcDocHtml || '');
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleCase(caseId: string): void {
    if (this.expandedCases.has(caseId)) {
      this.expandedCases.delete(caseId);
      this.revealedSolutions.delete(caseId);
      this.showHtmlCases.delete(caseId);
    } else {
      this.expandedCases.add(caseId);
    }
  }

  isExpanded(caseId: string): boolean {
    return this.expandedCases.has(caseId);
  }

  toggleSolution(caseId: string): void {
    if (this.revealedSolutions.has(caseId)) {
      this.revealedSolutions.delete(caseId);
    } else {
      this.revealedSolutions.add(caseId);
    }
  }

  isSolutionRevealed(caseId: string): boolean {
    return this.revealedSolutions.has(caseId);
  }

  toggleHtml(caseId: string): void {
    if (this.showHtmlCases.has(caseId)) {
      this.showHtmlCases.delete(caseId);
    } else {
      this.showHtmlCases.add(caseId);
    }
  }

  isHtmlShown(caseId: string): boolean {
    return this.showHtmlCases.has(caseId);
  }

  getInaccessibleHtml(wcagCase: WCAGCase): string {
    const current = this.editedInaccessibleHtml[wcagCase.id];
    return current === undefined ? wcagCase.inaccessibleExample : current;
  }

  updateInaccessibleHtml(caseId: string, value: string): void {
    this.editedInaccessibleHtml[caseId] = value;
  }

  resetInaccessibleHtml(wcagCase: WCAGCase): void {
    this.editedInaccessibleHtml[wcagCase.id] = wcagCase.inaccessibleExample;
  }

  getAccessibleHtml(wcagCase: WCAGCase): string {
    const current = this.editedAccessibleHtml[wcagCase.id];
    return current === undefined ? wcagCase.accessibleExample : current;
  }

  updateAccessibleHtml(caseId: string, value: string): void {
    this.editedAccessibleHtml[caseId] = value;
  }

  resetAccessibleHtml(wcagCase: WCAGCase): void {
    this.editedAccessibleHtml[wcagCase.id] = wcagCase.accessibleExample;
  }

  buildPreviewSrcDoc(snippetHtml: string): string {
    const trimmed = (snippetHtml || '').trim();

    // If the snippet already looks like a full HTML document, render it as-is.
    if (
      /^<!doctype\s+html/i.test(trimmed) ||
      /<html[\s>]/i.test(trimmed) ||
      /<head[\s>]/i.test(trimmed)
    ) {
      return trimmed;
    }

    // Otherwise, wrap it in a minimal document so it renders predictably.
    // Move any <style> blocks from the snippet into <head> so they apply reliably.
    const styleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
    const extractedStyles = trimmed.match(styleRegex) || [];
    const bodyHtml = trimmed.replace(styleRegex, '').trim();

    return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      :root { color-scheme: light; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 12px; }
      * { box-sizing: border-box; }
      button, input, select, textarea { font: inherit; }
      .preview-surface { padding: 8px; border: 1px dashed #bbb; border-radius: 6px; background: #fff; }
    </style>
    ${extractedStyles.join('\n')}
  </head>
  <body>
    <div class="preview-surface">${bodyHtml}</div>
  </body>
</html>`;
  }

  private buildCaseGroups(cases: WCAGCase[]): WCAGCaseGroup[] {
    const order: A11yPillarKey[] = ['perceptible', 'operable', 'comprensible', 'robusto'];
    const byPillar: { [key in A11yPillarKey]?: WCAGCase[] } = {};

    cases.forEach(function (wcagCase) {
      const list = byPillar[wcagCase.pillar] || [];
      list.push(wcagCase);
      byPillar[wcagCase.pillar] = list;
    });

    const compareCriterion = this.compareCriterion;

    return order
      .filter(function (pillar) {
        return !!byPillar[pillar] && (byPillar[pillar] as WCAGCase[]).length > 0;
      })
      .map(
        function (pillar) {
          const pillarCases = (byPillar[pillar] as WCAGCase[]).slice();
          pillarCases.sort(function (a, b) {
            return compareCriterion(a.criterion, b.criterion) || a.id.localeCompare(b.id);
          });

          return {
            pillar: pillar,
            label: this.pillarLabels[pillar],
            cases: pillarCases,
          };
        }.bind(this)
      );
  }

  private compareCriterion(a: string, b: string): number {
    const left = (a || '').split('.').map(function (part) {
      const value = parseInt(part, 10);
      return isNaN(value) ? 0 : value;
    });
    const right = (b || '').split('.').map(function (part) {
      const value = parseInt(part, 10);
      return isNaN(value) ? 0 : value;
    });

    const maxLen = Math.max(left.length, right.length);
    for (let i = 0; i < maxLen; i++) {
      const l = left[i] === undefined ? -1 : left[i];
      const r = right[i] === undefined ? -1 : right[i];
      if (l !== r) return l - r;
    }
    return 0;
  }

  trackByCaseId(_index: number, wcagCase: WCAGCase): string {
    return wcagCase.id;
  }

  trackByPillar(_index: number, group: WCAGCaseGroup): string {
    return group.pillar;
  }
}
