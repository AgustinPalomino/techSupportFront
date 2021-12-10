import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from 'src/app/interfases/Select';
import { Empresa } from 'src/app/modelos/empresa';
import { FiltroEmpRef } from 'src/app/modelos/filtroEmpRef';
import { Referencia } from 'src/app/modelos/referencia';
import { Usuarios } from 'src/app/modelos/usuarios';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import Swal from 'sweetalert2';
import { UtilService } from '../../../../servicios/util.service';


/**
 * Componente para editar un usuario
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html'
})
export class EditarUsuarioComponent implements OnInit {

  fil = new FiltroEmpRef;
  usuario = new Usuarios;
  codigos: Select [] = [];
  empresas: Select [] = [];
  codigo: any;
  id: any;
  empresa = new Empresa();

  constructor( public util: UtilService, private router: Router, private http: HttpClient, 
    public apiService: AplicacionService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("Id")
    })
    this.listarEmpresas();
    this.obtenerCodigoRol();
    this.buscarUsuarioPorId(this.id);
  }

  buscarUsuarioPorId(cod: number) {
    this.apiService.traerUsuarioPorId(cod).subscribe(res => {
      let usuario = res as Usuarios
      this.usuario = usuario;
    });
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
    //this.empresa.id = this.usuario.empresa.id;
    console.log(this.usuario)
    this.apiService.guardarUsuario(this.usuario).subscribe(res => {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
        allowOutsideClick: false
      }
);
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
    }, 
    (error) =>{
    console.log('El error es: ', error)});
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
    console.log('EN ROL',this.fil.codRef);
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
