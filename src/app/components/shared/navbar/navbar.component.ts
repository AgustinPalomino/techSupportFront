import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../servicios/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  username : any;
  constructor( public util: UtilService) { }


  ngOnInit(): void {
    this.util.nombreUser$.subscribe((nombre: string) => {
      this.username = nombre;
    });
  }

  
}