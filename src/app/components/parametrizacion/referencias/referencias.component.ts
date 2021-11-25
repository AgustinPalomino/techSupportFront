import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Referencia } from 'src/app/modelos/referencia';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from '../../../servicios/util.service';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html'
})
export class ReferenciasComponent implements OnInit {

  aplicacionService: AplicacionService | undefined;
  codRef: any;

  referencias: Referencia [] = [];

  navegarCrearRegla() {
    this.router.navigate(['/crear-reglas', this.codRef])
  }
  
  constructor( public util: UtilService, private router: Router, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    
  }

}
