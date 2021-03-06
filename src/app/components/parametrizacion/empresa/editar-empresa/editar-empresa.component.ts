import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/modelos/empresa';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from 'src/app/servicios/util.service';
import Swal from 'sweetalert2';

/**
 * Componente para editar una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html'
})
export class EditarEmpresaComponent implements OnInit {

  cod: any;
  empresa = new Empresa;
  public archivos: any = [];
  previsualizacion: string | undefined;
  nombreArchivo: string = "";

  constructor( private route: ActivatedRoute, private sanitizer: DomSanitizer, public util: UtilService, private router: Router, 
    private http: HttpClient, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cod = params.get("Id")
    })
    this.buscarEmpresaPorId(this.cod);
  }

  buscarEmpresaPorId(id: number) {
    this.apiService.obtenerEmpresaPorId(id).subscribe(res => {
      let empresa = res as Empresa;
      this.empresa = empresa; 
    })
  }

  guardarEmpresa( form: NgForm ) {
    console.log(this.empresa);
    if( form.invalid ) {
      Swal.fire({
        title: "Registro",
        text: 'NO se actualizó correctamente',
        icon: 'error'
      });
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
      if (res != null || res != undefined) {
        Swal.fire({
         title: "Empresa",
         text: 'se actualizó correctamente',
         icon: 'success'
        });
        this.router.navigate(['crear-empresa'])
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

  capturarFile(event: any): any {
    console.log('Entro a capturarFile');
    const archivoCapturado = event.target.files[0];
    console.log(archivoCapturado.name);
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    })
    this.archivos.push(archivoCapturado); //captura varios archivos
    console.log(this.archivos[0].name);
    this.nombreArchivo = this.archivos[0].name;
  }

  extraerBase64 = async ($event: any) => new Promise((resolve): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader;
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
        reader.onerror = error => {
          resolve({
            base: null
          });
        };
    } catch (error) {
      return null;
    };
  }) 

  subirArchivo(): any {
    let empId = sessionStorage.getItem('empresa');
    try {
      const formularioDeDatos = new FormData;
      this.archivos.forEach((archivo: string | Blob) => {
        formularioDeDatos.append('files', archivo);
      });
      if (empId) formularioDeDatos.append('empId', empId);
      this.apiService.guardarAdjuntos(formularioDeDatos).subscribe(res => {
        console.log('Respuesta del servidor', res);
      })
    } catch (error) {
      console.log('Error al subir archivos: ',error);
    }
  }

}
