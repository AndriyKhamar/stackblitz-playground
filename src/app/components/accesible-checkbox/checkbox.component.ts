import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() id?: string;
  @Input() name?: string;
  @Input() type: 'checkbox' | 'radio' = 'checkbox';
  @Input() isChecked = false;
  @Input() isReadOnly = false;
  @Input() disabled = false;
  @Input() isRequired = false;
  @Input() label?: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'default' | 'ghost' | 'accent' = 'default';
  @Input() disableBuiltInStyles = false;
  @Input() hostClass = '';

  @Output() checkChange = new EventEmitter<boolean>();

  hasFocus = false;

  toggleValue(event?: Event) {
    if (this.isReadOnly || this.disabled) return;
    this.isChecked = !this.isChecked;
    this.checkChange.emit(this.isChecked);
  }

  onFocus() {
    this.hasFocus = true;
  }
  onBlur() {
    this.hasFocus = false;
  }
}
