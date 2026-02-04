import { Component, TemplateRef } from '@angular/core';

import { A11yPillarKey, WCAGCase } from './wcag-case.model';
import { WCAG_CASES } from './wcag-cases.data';
import { WCAG_TEMPLATE_CODE } from './wcag-case-code.data';
import { WcagCaseTemplateRegistryService } from './wcag-case-template-registry.service';

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
  revealedCode: Set<string> = new Set();

  constructor(
    private templateRegistry: WcagCaseTemplateRegistryService
  ) {
    this.wcagCaseGroups = this.buildCaseGroups(WCAG_CASES);
  }

  getCaseTemplate(key?: string): TemplateRef<unknown> | null {
    return this.templateRegistry.get(key);
  }

  hasCaseTemplate(key?: string): boolean {
    return this.templateRegistry.has(key);
  }

  getTemplateCode(key?: string): string {
    if (!key) return '';
    return WCAG_TEMPLATE_CODE[key] || '';
  }

  templateContext(wcagCase: WCAGCase, variant: 'inaccessible' | 'accessible'): {
    idPrefix: string;
    caseId: string;
    variant: 'inaccessible' | 'accessible';
  } {
    return {
      idPrefix: wcagCase.id + '-' + variant,
      caseId: wcagCase.id,
      variant: variant,
    };
  }

  toggleCase(caseId: string): void {
    if (this.expandedCases.has(caseId)) {
      this.expandedCases.delete(caseId);
      this.revealedSolutions.delete(caseId);
      this.revealedCode.delete(caseId);
    } else {
      // Accordion behavior: only one case expanded at a time.
      this.expandedCases.clear();
      this.revealedSolutions.clear();
      this.revealedCode.clear();
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

  toggleCode(caseId: string): void {
    if (this.revealedCode.has(caseId)) {
      this.revealedCode.delete(caseId);
    } else {
      this.revealedCode.add(caseId);
    }
  }

  isCodeRevealed(caseId: string): boolean {
    return this.revealedCode.has(caseId);
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
