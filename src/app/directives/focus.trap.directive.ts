import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FocusTrapMode } from '../models/focus-trap-mode.enum';

@Directive({
  selector: '[appFocusTrap]',
})
export class FocusTrapDirective implements OnInit, AfterViewInit, OnChanges {
  @Input('appFocusTrap') trapAreaId: string; // id del área a atrapar
  @Input() trapMode: FocusTrapMode; // modo de navegación

  private focusableElements: HTMLElement[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // The DOM might not have the bound id yet; prefer updating on view init.
  }

  ngAfterViewInit() {
    this.updateFocusableElements();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.trapAreaId) {
      setTimeout(() => this.updateFocusableElements(), 0);
    }
  }

  private getTrapAreaElement(): HTMLElement | null {
    if (this.trapAreaId) {
      const byId = document.getElementById(this.trapAreaId);
      if (byId) return byId;
    }
    return (this.el && this.el.nativeElement) as HTMLElement | null;
  }

  private updateFocusableElements() {
    const area = this.getTrapAreaElement();
    if (area) {
      this.focusableElements = Array.from(
        area.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => {
        const disabled = (el as any).disabled === true || el.getAttribute('aria-disabled') === 'true';
        return !disabled;
      });
    } else {
      this.focusableElements = [];
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!event) return;

    // Refresh every time in case modal contents change dynamically.
    this.updateFocusableElements();
    if (!this.focusableElements || this.focusableElements.length === 0) return;

    const first = this.focusableElements[0];
    const last = this.focusableElements[this.focusableElements.length - 1];
    const active = document.activeElement as HTMLElement | null;
    const currentIndex = active ? this.focusableElements.indexOf(active) : -1;

    // --- Modo Tab ---
    if (event.key === FocusTrapMode.TAB) {
      // If focus somehow lands outside the trap, bring it back.
      if (!active || currentIndex === -1) {
        first.focus();
        event.preventDefault();
        return;
      }

      if (event.shiftKey) {
        if (active === first) {
          last.focus();
          event.preventDefault();
        }
      } else {
        if (active === last) {
          first.focus();
          event.preventDefault();
        }
      }
    }

    // --- Modo Tab + Flechas ---
    if (this.trapMode === FocusTrapMode.TAB_KEYS) {
      if (event.key === 'ArrowDown') {
        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const nextIndex = (safeIndex + 1) % this.focusableElements.length;
        this.focusableElements[nextIndex].focus();
        event.preventDefault();
      }
      if (event.key === 'ArrowUp') {
        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const prevIndex =
          (safeIndex - 1 + this.focusableElements.length) % this.focusableElements.length;
        this.focusableElements[prevIndex].focus();
        event.preventDefault();
      }
    }
  }
}
