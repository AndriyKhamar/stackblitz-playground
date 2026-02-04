import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { WcagCaseTemplateRegistryService } from './wcag-case-template-registry.service';

@Directive({
  selector: 'ng-template[wcagCaseTemplate]',
})
export class WcagCaseTemplateDirective implements OnInit, OnChanges, OnDestroy {
  @Input('wcagCaseTemplate') key!: string;

  private previousKey: string | null = null;

  constructor(
    public readonly templateRef: TemplateRef<unknown>,
    private readonly registry: WcagCaseTemplateRegistryService
  ) {}

  ngOnInit(): void {
    this.previousKey = this.key || null;
    if (this.key) this.registry.register(this.key, this.templateRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['key']) return;
    const nextKey = this.key || null;

    if (this.previousKey) {
      this.registry.unregister(this.previousKey, this.templateRef);
    }

    if (nextKey) {
      this.registry.register(nextKey, this.templateRef);
    }

    this.previousKey = nextKey;
  }

  ngOnDestroy(): void {
    if (this.previousKey) {
      this.registry.unregister(this.previousKey, this.templateRef);
    }
  }
}
