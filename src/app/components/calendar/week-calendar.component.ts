import { Component, OnInit } from '@angular/core';
import { FocusTrapMode } from 'src/app/models/focus-trap-mode.enum';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.css'],
})
export class WeekCalendarComponent implements OnInit {
  FocusTrapMode = FocusTrapMode;
  focusTrapMode: FocusTrapMode.TAB;
  currentDate: CalendarDay = {
    day: new Date(),
    isSelected: false,
  } as CalendarDay;
  visibleDays: CalendarDay[] = [];
  selectedDay: CalendarDay | null = null;
  firstInitDone = false; // bandera para saber si ya hicimos la selección inicial

  ngOnInit() {
    this.updateVisibleDays();

    // Selección inicial SOLO la primera vez
    if (!this.firstInitDone && this.visibleDays.length > 0) {
      this.selectDay(this.visibleDays[0].day);
      this.firstInitDone = true;
    }
  }

  updateVisibleDays() {
    const startOfWeek = this.getStartOfWeek(this.currentDate.day);
    this.visibleDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return { day: day, isSelected: false };
    });

    // Mantener selección si ya existe
    if (this.selectedDay) {
      const found = this.visibleDays.find(
        (d) => d.day.toDateString() === this.selectedDay.day.toDateString()
      );
      if (found) {
        found.isSelected = true;
        this.selectedDay = found;
      }
    }
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay(); // 0 = domingo
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // lunes como inicio
    return new Date(date.setDate(diff));
  }

  previousWeek() {
    this.currentDate.day.setDate(this.currentDate.day.getDate() - 7);
    this.updateVisibleDays();
  }

  nextWeek() {
    this.currentDate.day.setDate(this.currentDate.day.getDate() + 7);
    this.updateVisibleDays();
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return day.toDateString() === today.toDateString();
  }

  selectDay(day: Date) {
    // Limpia selección previa
    this.visibleDays.forEach((x) => (x.isSelected = false));

    // Busca el día seleccionado y márcalo
    const found = this.visibleDays.find(
      (d) => d.day.toDateString() === day.toDateString()
    );
    if (found) {
      found.isSelected = true;
      this.selectedDay = found;
    }

    console.log('Día seleccionado:', day);
  }
}

export interface CalendarDay {
  day: Date;
  isSelected: boolean;
}
