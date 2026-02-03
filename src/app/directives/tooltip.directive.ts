import { Directive, ElementRef, HostListener, Input, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
}
)
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() tooltipClickable: boolean = false;
  
  private tooltipElement: HTMLElement | null = null;
  private isTooltipVisible: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltipText && !this.tooltipClickable) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.tooltipClickable) {
      this.hideTooltip();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.tooltipClickable) {
      event.stopPropagation(); // Evita que se active el click de la card
      if (this.isTooltipVisible) {
        this.hideTooltip();
      } else {
        this.showTooltip();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.tooltipClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.stopPropagation();
      this.onClick(event);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.tooltipClickable && this.isTooltipVisible && this.tooltipElement) {
      const target = event.target as HTMLElement;
      if (!this.el.nativeElement.contains(target) && !this.tooltipElement.contains(target)) {
        this.hideTooltip();
      }
    }
  }

  private showTooltip(): void {
    if (this.isTooltipVisible) return;

    // Crear el elemento tooltip
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.addClass(this.tooltipElement, `tooltip-${this.tooltipPosition}`);
    
    if (this.tooltipClickable) {
      this.renderer.addClass(this.tooltipElement, 'tooltip-clickable');
      this.renderer.setAttribute(this.tooltipElement, 'role', 'dialog');
      this.renderer.setAttribute(this.tooltipElement, 'aria-live', 'polite');
    }
    
    // Agregar el texto
    const textNode = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, textNode);
    
    // Agregar al DOM
    this.renderer.appendChild(document.body, this.tooltipElement);
    
    // Posicionar el tooltip
    this.positionTooltip();
    
    this.isTooltipVisible = true;
    
    // Mostrar con animación
    setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.addClass(this.tooltipElement, 'show');
      }
    }, 10);
  }

  private hideTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.removeClass(this.tooltipElement, 'show');
      setTimeout(() => {
        if (this.tooltipElement) {
          this.renderer.removeChild(document.body, this.tooltipElement);
          this.tooltipElement = null;
          this.isTooltipVisible = false;
        }
      }, 200);
    }
  }

  private positionTooltip(): void {
    if (!this.tooltipElement) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostRect.top + scrollTop - tooltipRect.height - 8;
        left = hostRect.left + scrollLeft + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + scrollTop + 8;
        left = hostRect.left + scrollLeft + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + scrollTop + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left + scrollLeft - tooltipRect.width - 8;
        break;
      case 'right':
        top = hostRect.top + scrollTop + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + scrollLeft + 8;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  ngOnDestroy(): void {
    this.hideTooltip();
  }
}