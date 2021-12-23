import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from 'src/app/interfases/Select';
import { Casos } from 'src/app/modelos/casos';
import { Empresa } from 'src/app/modelos/empresa';
import { FiltroEmpRef } from 'src/app/modelos/filtroEmpRef';
import { Referencia } from 'src/app/modelos/referencia';
import { Usuarios } from 'src/app/modelos/usuarios';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from 'src/app/servicios/util.service';
import Swal from 'sweetalert2';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-editar-caso',
  templateUrl: './editar-caso.component.html'
})
export class EditarCasoComponent implements OnInit {

  constructor( private sanitizer: DomSanitizer, public util: UtilService, private router: Router, 
    private http: HttpClient, public apiService: AplicacionService, private route: ActivatedRoute ) { }

  public page!: number;
  id: any;
  caso = new Casos;
  fil = new FiltroEmpRef;
  tipos: Select [] = [];
  tipo: any;
  severidads: Select [] = [];
  severidad: any;
  estado: any;
  estados: Select [] = [];
  public archivos: any = [];
  previsualizacion: string | undefined;
  nombreArchivo: string = "";
  empresa = new Empresa;
  loadding! : boolean;
  idEmp: string = '';
  archivoCapturado = '';
  usr = new Usuarios;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("Id")
    })
    this.buscarCasoPorId(this.id);
    this.obtenerSeveridad();
    this.obtenerTipoSoft();
    this.obtenerEstados();
  }

  buscarCasoPorId(id: number) {
    this.apiService.traerCasoPorId(id).subscribe(res => {
      let caso = res as Casos
      this.caso = caso;
      console.log(this.caso)
    })
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
    
    this.caso.terminado ? this.caso.casFechaFinalizado = new Date() : this.caso.casFechaFinalizado = new Date(0);
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
    this.apiService.traerReferenciasPorCodigo(this.fil.codRef).subscribe(res => {
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
    this.apiService.traerReferenciasPorCodigo(this.fil.codRef).subscribe(res => {
      let tipos = res as Referencia[]
      tipos.forEach(tipo => {
        this.tipos.push({
          etiqueta: tipo.refNombre,
          valor: tipo.refCodigo
        })
      })
    })
  }

  private obtenerEstados() {
    this.fil.codRef = 'E00';
    this.apiService.traerReferenciasPorCodigo(this.fil.codRef).subscribe(res => {
      let estados = res as Referencia[]
      estados.forEach(estado => {
        this.estados.push({
          etiqueta: estado.refNombre,
          valor: estado.refCodigo
        })
      })
    })
  }
  

}
