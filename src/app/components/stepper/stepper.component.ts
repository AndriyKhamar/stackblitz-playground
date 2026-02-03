import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {

  steps = [
    { id: 1, title: 'Flights', icon: '✈️' },
    { id: 2, title: 'Passengers', icon: '🧑‍🤝‍🧑' },
    { id: 3, title: 'Extras', icon: '➕' },
    { id: 4, title: 'Seats', icon: '💺' },
    { id: 5, title: 'Payment', icon: '💳' },
    { id: 6, title: 'Opcion super larga en turco ............', icon: '✅' }
  ];

  // índice de paso activo (0-based). Cambiar según estado real.
  activeIndex = 0;
 
}
