import { HttpClient } from '@angular/common/http';
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
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { now } from 'jquery';
import { Usuarios } from '../../../modelos/usuarios';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-caso-soft',
  templateUrl: './caso-soft.component.html',
  styleUrls: ['./caso-soft.component.scss']
})
export class CasoSoftComponent implements OnInit {

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

  //Lista de archivos seleccionados
  selectedFiles!: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo:any = [];
  //Mensaje que almacena la respuesta de las Apis
  message = '';
  //Nombre del archivo para usarlo posteriormente en la vista html
  fileName = "";
  fileInfos!: Observable<any>;

  constructor( private sanitizer: DomSanitizer, public util: UtilService, private router: Router, 
    private http: HttpClient, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.obtenerSeveridad();
    this.obtenerTipoSoft();
  }
  
  guardarCaso( form: NgForm ) {
    console.log(this.caso);
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
        this.usr = usuario;
        this.caso.casUsrId = this.usr.id;
        });

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

  selectFiles(event: any) {
    this.progressInfo = [];
    //Validación para obtener el nombre del archivo si es uno solo
    //En caso de que sea >1 asigna a fileName length
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(index: any, file: any) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.apiService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
          this.archivos.push(file.name);
          console.log(this.archivos);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.apiService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
  }

  deleteFile(filename: string) {
    this.apiService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.apiService.getFiles();
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
    this.fil.codRef = 'CS00'; //******PENDIENTE FILTRAR POR EMPRESA SI ES NECESARIO */
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


}
