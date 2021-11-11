import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/modelos/empresa';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import Swal from 'sweetalert2';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html'
})
export class CrearEmpresaComponent implements OnInit {

  empresa = new Empresa;

  constructor(private router: Router, private http: HttpClient, public apiService: AplicacionService ) { }

  ngOnInit(): void {
  }

  guardarEmpresa( form: NgForm ) {

    if( form.invalid ) {
      Swal.fire({
        title: "Registro",
        text: 'NO se actualizó correctamente',
        icon: 'error'
      });
      //this.traductor.mensajeError();
      return;
    }
    this.apiService.guardarEmpresa(this.empresa).subscribe(res => {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      if (res.codigoRespuesta == 200) {
        //this.traductor.mensajeOk;
        Swal.fire({
          title: "Empresa",
          text: 'se actualizó correctamente',
          icon: 'success'
        });
        this.router.navigate(['/crear-empresa'])
      }
    });
  }

}
