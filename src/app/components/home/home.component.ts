import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from '../../servicios/util.service';
import { Usuarios } from '../../modelos/usuarios';
import { CasosTabla } from 'src/app/modelos/casosTabla';


/**
 * Componente para crear una Empresa
 * @author dev-sumset Agustín Palomino P. 
 */


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public page!: number;
  usr = new Usuarios();
  casos: CasosTabla [] = [];
  id!: number;

  constructor( public util: UtilService,  private router: Router, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.buscarUsuario();
    //this.listarEmpresas();
  }

  private buscarUsuario() {
    let mail = sessionStorage.getItem('email');
    if (mail) {
      this.apiService.traerUsuarioporMail(mail).subscribe(res => {
        let usr = res as Usuarios;
        this.usr = usr;
        this.listarCasos(this.usr.id);      
      })
    } 
  }

  private listarCasos(id: number) {
    this.apiService.traerCasosPorUsr(id).subscribe(resp => {
      let casos = resp as CasosTabla[]
      this.casos = casos;
    })
  }
  

}
