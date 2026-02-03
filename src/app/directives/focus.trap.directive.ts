import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { FocusTrapMode } from '../models/focus-trap-mode.enum';

@Directive({
  selector: '[appFocusTrap]',
})
export class FocusTrapDirective implements OnInit {
  @Input('appFocusTrap') trapAreaId: string; // id del área a atrapar
  @Input() trapMode: FocusTrapMode; // modo de navegación

  private focusableElements: HTMLElement[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.updateFocusableElements();
  }

  private updateFocusableElements() {
    const area = document.getElementById(this.trapAreaId);
    if (area) {
      this.focusableElements = Array.from(
        area.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.focusableElements || this.focusableElements.length === 0) return;

    console.log('key', event, 'focusEl:', this.focusableElements, 'mode', this.trapMode);
    const first = this.focusableElements[0];
    const last = this.focusableElements[this.focusableElements.length - 1];
    const currentIndex = this.focusableElements.indexOf(
      document.activeElement as HTMLElement
    );

    // --- Modo Tab ---
    if (event.key === FocusTrapMode.TAB) {
      console.log('here');
      if (event.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          event.preventDefault();
        }
      }
    }

    // --- Modo Tab + Flechas ---
    if (this.trapMode === FocusTrapMode.TAB_KEYS) {
      if (event.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % this.focusableElements.length;
        this.focusableElements[nextIndex].focus();
        event.preventDefault();
      }
      if (event.key === 'ArrowUp') {
        const prevIndex =
          (currentIndex - 1 + this.focusableElements.length) %
          this.focusableElements.length;
        this.focusableElements[prevIndex].focus();
        event.preventDefault();
      }
    }
  }
}
