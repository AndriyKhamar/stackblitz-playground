import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CheckboxComponent } from './components/accesible-checkbox/checkbox.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { DestinationFilterComponent } from './components/filters/destination-filter.component';
import { WeekCalendarComponent } from './components/calendar/week-calendar.component';
import { WCAGDemoComponent } from './components/wcag-demo/wcag-demo.component';
import { WcagCaseTemplateDirective } from './components/wcag-demo/wcag-case-template.directive';
import { WcagCaseTemplatesComponent } from './components/wcag-demo/wcag-case-templates.component';
import { FocusTrapDirective } from './directives/focus.trap.directive';
import { ComboWrapperComponent } from './components/combo-wrapper/combo-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    StepperComponent,
    DestinationFilterComponent,
    WeekCalendarComponent,
    WCAGDemoComponent,
    ComboWrapperComponent,
    WcagCaseTemplateDirective,
    WcagCaseTemplatesComponent,
    FocusTrapDirective,
  ],
  imports: [BrowserModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
