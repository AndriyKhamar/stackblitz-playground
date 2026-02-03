import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() elevated: boolean = false;
  @Input() hasFooter: boolean = false;
  @Input() clickable: boolean = false;
  @Input() ariaLabel: string = '';
  
  // Para OPCIÓN 2: URL real del enlace
  @Input() linkUrl: string = '';
  
  // Para OPCIÓN 3: URL o acción del pseudo-enlace
  @Input() pseudoLinkUrl: string = '';
  
  @Output() cardClick = new EventEmitter<void>();

  // Para OPCIÓN 3: Manejar click del pseudo-enlace
  onPseudoLinkClick(event: Event): void {
    if (!this.pseudoLinkUrl || this.pseudoLinkUrl === '#') {
      event.preventDefault();
      this.cardClick.emit();
    }
    // Si tiene URL real, deja que el navegador maneje la navegación
  }
}