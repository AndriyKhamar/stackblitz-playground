import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  nombreDeCaja = 'Tanya';

  constructor() {}

  ngOnInit(): void {}

  public changeColor(): void {
    setTimeout(() => {
      this.nombreDeCaja = 'Justyna';
      document.getElementById('button').setAttribute('stlye', 'color:blue');
      console.log('oye')
    }, 0);
  }
}
