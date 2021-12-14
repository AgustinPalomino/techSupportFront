import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from 'src/app/interfases/Select';
import { Casos } from 'src/app/modelos/casos';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from 'src/app/servicios/util.service';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios';

@Component({
  selector: 'app-asignar-casos',
  templateUrl: './asignar-casos.component.html'
})
export class AsignarCasosComponent implements OnInit {

  public page!: number;
  casos: Casos [] = [];
  tecnicos: Select [] = [];
  tecnico = new Usuarios;
  caso = new Casos;

  constructor(  public util: UtilService,  private router: Router, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.listarCasosPendientes();
    this.listarTécnicos();
  }

  listarCasosPendientes() {
    this.apiService.traerCasosSinAsignar().subscribe(resp => {
      let casos = resp as Casos[]
      this.casos = casos;
    })
  }

  listarTécnicos() {
    this.apiService.listarTecnicos().subscribe( res => {
      let tecnicos = res as Usuarios[]
      tecnicos.forEach(tecnico => {
        this.tecnicos.push({
          etiqueta: tecnico.usrNombre,
          valor: tecnico.id
        })
      })
      console.log(tecnicos);
    })
  }

  asignarCaso(idCaso: number, idTecnico: number) {
    this.apiService.traerCasoPorId(idCaso).subscribe( resp => {
      let caso = resp as Casos
      this.caso = caso
      this.caso.casAtiende = idTecnico;
    
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
      })
    })
  }

}
