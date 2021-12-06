import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/modelos/usuarios';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import Swal from 'sweetalert2';
import { UtilService } from '../../../servicios/util.service';
import * as CryptoJS from 'crypto-js';
import { NgxRolesService } from 'ngx-permissions';


/**
 * Componente para hacer el login a la aplicación 
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new Usuarios();
  $username: any;
  empresa!: string;

  constructor( public util: UtilService, public apiService: AplicacionService, private router: Router, 
    private rolesService: NgxRolesService ) {
     }

  ngOnInit(): void {
  }

  login( form: NgForm ) {
    if (  form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    let claveCifrada = CryptoJS.AES.encrypt(this.usuario.usrClave,'a1b2c3d4e5').toString();
    this.usuario.usrClave = claveCifrada;
    this.apiService.autenticarUsuario(this.usuario)
      .subscribe(res => {
        if (res != null || res != undefined) {
          Swal.close();
          this.rolesService.addRole(res.usrRol, []);
          this.$username = res.usrAlias;
          this.empresa = res.empresa.id;
          this.util.nombreUser$.emit(this.$username);
          sessionStorage.setItem('username', this.$username);
          sessionStorage.setItem('email', this.usuario.usrMail);
          sessionStorage.setItem('empresa', this.empresa);
          this.router.navigateByUrl('/home');
        } else {
          Swal.fire({
                icon: 'error',
                title: 'Error al autenticar',
                text: 'Usuario o clave inválidos'
              });
        }
      });
  }

}
