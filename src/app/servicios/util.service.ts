import { EventEmitter, Injectable } from '@angular/core';
import { Referencia } from 'src/app/modelos/referencia';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AplicacionService } from './aplicacion.service';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  referencias: Referencia [] = [];

  constructor( private _location: Location, private route:Router, public apiService: AplicacionService ) { }

  nombreUser$ = new EventEmitter<string>();
  
  paginaAnterior() {
    this._location.back();
  }

  paginaInicio(){
    this.route.navigate(['components/home'])
  }
 
  logout() {
    let username = null;
    sessionStorage.clear();
    localStorage.clear();
  }

  estaAutenticado(): boolean {
    if (sessionStorage.getItem('email') != null) {
        return true;
      } else {
        return false;
      }
  }
  
  
}