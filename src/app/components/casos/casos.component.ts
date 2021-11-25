import { Component, OnInit } from '@angular/core';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html'
})
export class CasosComponent implements OnInit {

  banderaS : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public banderasoft() {
    this.banderaS = true;
  }

}
