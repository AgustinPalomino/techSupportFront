import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/modelos/empresa';
import { Usuarios } from 'src/app/modelos/usuarios';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from 'src/app/servicios/util.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html'
})
export class EmpresaComponent implements OnInit {

  public page!: number;
  empresa: Empresa [] = [];
  emp = new Empresa;
  usr = new Usuarios();

  constructor( public util: UtilService, private router: Router, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.listarEmpresas();
  }

  //Metodo que realiza el consumo que lista todos las Empresas
  private listarEmpresas() {
    // Averiguar Rol
    //this.usr.usrMail = sessionStorage.getItem('email');
    //this.usr.usrCiaId = Number(sessionStorage.getItem('empresa'));
    // this.apiService.traerUsuarioporMail(this.usr).subscribe(res => {
    //   if (res.listaObjetos[0].usrRol === 'RO01') {
    //     this.apiService.traerTodasEmpresas().subscribe(res => {
    //       let empresa = res.listaObjetos as Empresa []
    //       this.empresa = empresa;
    //     });
    //   } else {
    //     this.apiService.traerEmpresaPorId(this.emp).subscribe(res => {
    //       let empresa = res.listaObjetos as Empresa []
    //       this.empresa = empresa;
    //     });
    //   }
    // });
    this.apiService.traerTodasEmpresas().subscribe(res => {
      let empresa = res as Empresa [];
      this.empresa = empresa;
    });
  }

  eliminarEmpresa(id: number) {
    //this.emp.id = id;
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está seguro que desea borrar el registro',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.apiService.eliminarEmpresa(id).subscribe(res => {
          if (res.codigoRespuesta == 200) {
            Swal.fire({
              title: "Empresa",
              text: 'se eliminó correctamente',
              icon: 'success'
            });
            this.listarEmpresas();
            this.router.navigate(['/empresa'])
          }
        });
      };
    });
  }
}


