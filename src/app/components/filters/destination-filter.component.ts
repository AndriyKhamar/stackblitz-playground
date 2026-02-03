import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-destination-filter',
  templateUrl: './destination-filter.component.html',
  styleUrls: ['./destination-filter.component.css'],
})
export class DestinationFilterComponent {
  isOpenDestination = false;
  isOpenPax = false;
  isOpenOther = false;
  adults = 0;
  infants = 0;
  childs = 0;

  readyToLoadDestination = false;
  hidePaxArea = true;
  @ViewChild('paxDialog') paxDialogRef: ElementRef<HTMLDivElement>;
  @ViewChild('otherDialog') otherDialogRef: ElementRef<HTMLDivElement>;

  @ViewChild('destinationDialog')
  destinationDialogRef: ElementRef<HTMLDivElement>;

  openDialog(): void {
    this.isOpenDestination = true;
    // Esperar a que Angular renderice el contenido
    setTimeout(() => {
      this.destinationDialogRef.nativeElement.querySelector('input').focus();
      setTimeout(() => {
        this.readyToLoadDestination = true;
      }, 500);
    });
  }

  openDialog2(): void {
    this.isOpenPax = true;
    // Esperar a que Angular renderice el contenido
    setTimeout(() => {
      const but = this.paxDialogRef.nativeElement.querySelector(
        'button:not([disabled])'
      ) as HTMLDivElement;
      if (but) {
        but.focus();
      }
      setTimeout(() => {
        this.hidePaxArea = false;
      });
    });
  }

  openDialog3(): void {
    this.isOpenOther = true;
    // Esperar a que Angular renderice el contenido
    setTimeout(() => {
      this.otherDialogRef.nativeElement.querySelector('button').focus();
      // setTimeout(() => {
      //   this.hidePaxArea = false;
      // }, 500);
    });
  }

  closeDialog(): void {
    this.isOpenDestination = false;
    this.readyToLoadDestination = false;
  }

  closeDialog2(): void {
    this.isOpenPax = false;
    this.hidePaxArea = true;
    this.initPaxSelctor();
  }

  closeDialog3(): void {
    this.isOpenOther = false;
  }

  public increase(type: string) {
    if (type === 'adults') {
      this.adults += 1;
    }
    if (type === 'infants') {
      this.infants += 1;
    }
    if (type === 'childs') {
      this.childs += 1;
    }
  }

  private initPaxSelctor(): void {
    this.adults = 0;
    this.infants = 0;
    this.childs = 0;
  }
}
