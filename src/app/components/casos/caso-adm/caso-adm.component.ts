import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Casos } from 'src/app/modelos/casos';
import { FiltroEmpRef } from 'src/app/modelos/filtroEmpRef';
import { Referencia } from 'src/app/modelos/referencia';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from '../../../servicios/util.service';
import { Select } from 'src/app/interfases/Select';
import { Empresa } from 'src/app/modelos/empresa';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios';
import { HttpClient } from '@angular/common/http';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-caso-adm',
  templateUrl: './caso-adm.component.html'
})
export class CasoAdmComponent implements OnInit {

  caso = new Casos;
  fil = new FiltroEmpRef;
  tipos: Select [] = [];
  tipo: any;
  severidads: Select [] = [];
  severidad: any;
  public archivos: any = [];
  previsualizacion: string | undefined;
  nombreArchivo: string = "";
  empresa = new Empresa;
  loadding! : boolean;
  idEmp: string = '';
  archivoCapturado = '';
  usr = new Usuarios;

  constructor( private sanitizer: DomSanitizer, public util: UtilService, private router: Router, 
    private http: HttpClient, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.obtenerSeveridad();
    this.obtenerTipoSoft();
  }
  
  guardarCaso( form: NgForm ) {
    if( form.invalid ) {
      Swal.fire({
        title: "Registro",
        text: 'NO se actualizó correctamente',
        icon: 'error'
      });
      return;
    }

    let usrMail = sessionStorage.getItem('email');
    if (usrMail) this.apiService.traerUsuarioporMail(usrMail).subscribe(res => {
        let usuario  = res as Usuarios;
        this.caso.usuario = usuario;
        });

    if (this.caso.casAdjuntos.length = 0) this.caso.casAdjuntos = [];
    this.caso.casCategoria = 'C01';
    this.caso.casFechaIni = new Date();
    this.caso.casEstado = 'E01';
    console.log(this.caso)
    this.apiService.guardarCaso(this.caso).subscribe(res => {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      if (res != null || res != undefined) {
        Swal.fire({
         title: "Caso",
         text: 'actualizado correctamente',
         icon: 'success'
        });
        this.router.navigate(['casos'])
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

  //Método para obtener los códigos de severidad
  private obtenerSeveridad() {
    this.fil.codRef = 'S00'; //******PENDIENTE FILTRAR POR EMPRESA SI ES NECESARIO */
    //this.fil.empId = Number(sessionStorage.getItem('empresa'));
    this.apiService.traerReferenciasPorCodigo(this.fil.codRef).subscribe(res =>{
      let severidads = res as Referencia[]
      severidads.forEach(severidad => {
        this.severidads.push({
          etiqueta: severidad.refNombre,
          valor: severidad.refCodigo
        })
      })
    })
  }

  //Método para obtener los códigos de tipo casos software
  private obtenerTipoSoft() {
    this.fil.codRef = 'CA00'; //******PENDIENTE FILTRAR POR EMPRESA SI ES NECESARIO */
    //this.fil.empId = Number(sessionStorage.getItem('empresa'));
    this.apiService.traerReferenciasPorCodigo(this.fil.codRef).subscribe(res =>{
      let tipos = res as Referencia[]
      tipos.forEach(tipo => {
        this.tipos.push({
          etiqueta: tipo.refNombre,
          valor: tipo.refCodigo
        })
      })
    })
  }

  capturarFile(event: any): any {
    for (let i = 0; i < event.target.files.length; i++) {
      const archivoCapturado = event.target.files[i];
      this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.previsualizacion = imagen.base;
      })
      this.archivos.push(archivoCapturado); //captura varios archivos
      this.caso.casAdjuntos.push(archivoCapturado.name);
      this.nombreArchivo = this.archivos[i].name;
    }
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
      })
    } catch (error) {
      console.log('Error al subir archivos: ',error);
    }
  }

}
