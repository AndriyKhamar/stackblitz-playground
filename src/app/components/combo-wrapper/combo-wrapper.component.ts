import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'combo-wrapper',
  templateUrl: './combo-wrapper.component.html',
  styleUrls: ['./combo-wrapper.component.css'],
})
export class ComboWrapperComponent {
  @ViewChild('searchInput')
  private searchInput: ElementRef;

  public isEditMode = false;
  public searchValue = '';

  public get isClickable(): boolean {
    return this.searchValue.trim().length > 0;
  }

  public onComboClick(event: MouseEvent): void {
    if (this.isEditMode) return;
    this.enterEdit(event);
  }

  public onComboFocus(event: FocusEvent): void {
    if (this.isEditMode) return;
    this.enterEdit(event);
  }

  public onComboKeydown(event: KeyboardEvent): void {
    var key = event.key;
    if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
      event.preventDefault();
      if (!this.isEditMode) {
        this.enterEdit(event);
      }
    }
  }

  public activateFromIcon(event: MouseEvent): void {
    this.enterEdit(event);
  }

  public activateFromLabel(event: MouseEvent): void {
    this.enterEdit(event);
  }

  public onInput(event: Event): void {
    var target = event.target as HTMLInputElement;
    this.searchValue = target && target.value ? target.value : '';
  }

  public clearSearch(event: MouseEvent): void {
    event.stopPropagation();
    this.searchValue = '';
    this.enterEdit();
  }

  public exitEdit(): void {
    this.isEditMode = false;
  }

  private enterEdit(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    this.isEditMode = true;

    setTimeout(() => {
      var inputEl = this.searchInput && this.searchInput.nativeElement;
      if (inputEl && inputEl.focus) {
        inputEl.focus();
      }
    }, 0);
  }
}
