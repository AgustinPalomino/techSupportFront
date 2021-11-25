import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Referencia } from 'src/app/modelos/referencia';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import Swal from 'sweetalert2';
import { UtilService } from '../../../../../servicios/util.service';


/**
 * Componente para crear una Referencia
 * @author dev-sumset Agustín Palomino P. 
 */

@Component({
  selector: 'app-crear-hijos',
  templateUrl: './crear-hijos.component.html'
})
export class CrearHijosComponent implements OnInit {

  cod: any;
  referencia = new Referencia();
  nombrePadre: any;
  ref: Referencia [] = [];

  constructor( private route: ActivatedRoute, public util: UtilService, 
    private router: Router, private http: HttpClient, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    const cod = this.route.snapshot.paramMap.get("codRef");
    this.referencia.refValor = ""; 
    this.cod = cod;
    this.obtenerNombre(this.cod); 
  }

  obtenerNombre(codigo: string) {
    this.apiService.traerReferenciasPorCodigo(codigo).subscribe(res =>{
      let ref = res as Referencia []
      this.ref = ref;
      this.nombrePadre = ref[0].refNombre;
    })
  }

  guardarReferencia( form: NgForm ) {

    if( form.invalid ) {
      console.log("Formulario no válido")
      Swal.fire({
        title: "Regla",
        text: 'NO se guardó',
        icon: 'success'
      });
      return;
    }
    this.referencia.refRefCodigo = this.cod;
    this.apiService.guardarReferencia(this.referencia).subscribe(res => {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      if (res != null || res != undefined) {
        console.log('Entré')
        Swal.fire({
         title: "Referencia",
         text: 'se actualizó correctamente',
         icon: 'success'
        });
        this.router.navigate([`crear-referencia/${this.cod}`])
      } else {
        Swal.showLoading();
        Swal.fire({
          title: "Registro",
          text: 'NO se actualizó correctamente',
          icon: 'error'
        });
      }
    });
  }

}
