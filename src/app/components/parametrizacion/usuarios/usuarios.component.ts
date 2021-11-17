import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/modelos/usuarios';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import Swal from 'sweetalert2';
import { UtilService } from '../../../servicios/util.service';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  public page!: number;
  usuario: Usuarios [] = [];
  usr = new Usuarios;

  constructor( public util: UtilService, private router: Router, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  //Metodo que realiza el consumo que lista todos las Empresas
  private listarUsuarios() {
    this.apiService.traerTodosUsuarios().subscribe(res => {
       let usuario = res as Usuarios []
       this.usuario = usuario;
    })
  }

  eliminarUsuario(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está seguro que desea borrar el registro',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.apiService.eliminarUsuario(id).subscribe(res => {
          if (res.codigoRespuesta == 200) {
            Swal.fire({
              title: "Usuario",
              text: 'se eliminó correctamente',
              icon: 'success'
            });
            this.listarUsuarios();
            this.router.navigate(['/usuarios'])
          }
        });
      };
    });
  }

}

