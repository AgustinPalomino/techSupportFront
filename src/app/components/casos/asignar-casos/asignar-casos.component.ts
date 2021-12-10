import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from 'src/app/interfases/Select';
import { Casos } from 'src/app/modelos/casos';
import { AplicacionService } from 'src/app/servicios/aplicacion.service';
import { UtilService } from 'src/app/servicios/util.service';
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

  asignarCaso(id: number) {
    console.log(id)

  }

}
