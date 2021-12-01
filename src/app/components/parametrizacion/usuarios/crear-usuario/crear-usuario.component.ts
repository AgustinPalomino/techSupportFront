import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/modelos/usuarios';
import { Select } from 'src/app/interfases/Select';
import { UtilService } from '../../../../servicios/util.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Empresa } from 'src/app/modelos/empresa';
import { FiltroEmpRef } from 'src/app/modelos/filtroEmpRef';
import { Referencia } from 'src/app/modelos/referencia';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html'
})
export class CrearUsuarioComponent implements OnInit {

  fil = new FiltroEmpRef;
  usuario = new Usuarios;
  codigos: Select [] = [];
  codigo: any;
  empresas: Select [] = [];

  constructor( public util: UtilService, private router: Router, private http: HttpClient, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.listarEmpresas();
    this.obtenerCodigoRol();
  }

  guardarUsuario( form: NgForm ) {
    if( form.invalid ) {
      Swal.fire({
        title: "Usuario",
        text: 'NO se actualizó correctamente',
        icon: 'error'
      });
      Swal.showLoading();
      Swal.fire({
      title: "Registro",
      text: 'NO se actualizó correctamente',
      icon: 'error'
    });
      return;
    }
    this.apiService.guardarUsuario(this.usuario).subscribe(res => {
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

  listarEmpresas() { 
    this.apiService.traerTodasEmpresas().subscribe(res => {
      let empresas = res as Empresa[]
      empresas.forEach(empresa => {
        this.empresas.push({
          etiqueta: empresa.empNombre,
          valor: empresa.id
        })
      })
    })
  }

  //Método para obtener los códigos de roles
  private obtenerCodigoRol() {
    this.fil.codRef = 'R00'; //******PENDIENTE FILTRAR POR EMPRESA SI ES NECESARIO */
    //this.fil.empId = Number(sessionStorage.getItem('empresa'));
    this.apiService.traerReferenciasPorCodigo(this.fil.codRef).subscribe(res =>{
      let codigos = res as Referencia[]
      codigos.forEach(codigo => {
        this.codigos.push({
          etiqueta: codigo.refNombre,
          valor: codigo.refCodigo
        })
      })
    })
  }

}
