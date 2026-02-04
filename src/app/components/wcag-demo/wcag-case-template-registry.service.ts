import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WcagCaseTemplateRegistryService {
  private readonly templates = new Map<string, TemplateRef<unknown>>();

  register(key: string, templateRef: TemplateRef<unknown>): void {
    if (!key) return;
    this.templates.set(key, templateRef);
  }

  unregister(key: string, templateRef: TemplateRef<unknown>): void {
    if (!key) return;
    const current = this.templates.get(key);
    if (current === templateRef) this.templates.delete(key);
  }

  get(key?: string): TemplateRef<unknown> | null {
    if (!key) return null;
    return this.templates.get(key) || null;
  }

  has(key?: string): boolean {
    return !!this.get(key);
  }
}
