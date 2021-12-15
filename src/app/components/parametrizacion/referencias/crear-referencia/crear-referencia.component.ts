import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltroEmpRef } from 'src/app/modelos/filtroEmpRef';
import { Referencia } from 'src/app/modelos/referencia';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from '../../../../servicios/util.service';


/**
 * Componente para listar Referencias
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-crear-referencia',
  templateUrl: './crear-referencia.component.html'
})
export class CrearReferenciaComponent implements OnInit {

  public page!: number;
  cod: any;
  refer = new Referencia();
  nombrePadre: any;
  referencias: Referencia [] = [];
  referencia: any;
  ref = new Referencia();
  codigo: any;
  regla = new Referencia;
  fil = new FiltroEmpRef;
  
  constructor( private route: ActivatedRoute, public util: UtilService, 
    private router: Router, public apiService: AplicacionService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cod = params.get("codRef")
    })
    this.obtenerRefPorCodigo(this.cod);
  }

  //Método que realiza el consumo que lista todos los padres en referencia
  private obtenerRefPorCodigo(ref: string) {
    this.nombrePadre = this.obtenerNombre(ref);
    this.refer.refRefCodigo = ref;
    this.apiService.traerReferenciasPorCodigo(ref).subscribe(res =>{
      let referenciasarr = res as Referencia[]
      referenciasarr.forEach(referencia => {
      this.referencias = referenciasarr;
      });
    });
  }

  obtenerNombre(codigo: string) {
    this.apiService.traerNombreRef(codigo).subscribe(res =>{
      let ref = res as Referencia
      this.ref = ref;
      this.nombrePadre = ref.refNombre;
    })
  }

}
