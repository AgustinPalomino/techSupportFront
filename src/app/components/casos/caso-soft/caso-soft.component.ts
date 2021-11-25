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

@Component({
  selector: 'app-caso-soft',
  templateUrl: './caso-soft.component.html'
})
export class CasoSoftComponent implements OnInit {

  caso = new Casos;
  fil = new FiltroEmpRef;
  tipos: Select [] = [];
  tipo: any;
  severidads: Select [] = [];
  severidad: any;

  constructor( public util: UtilService, private router: Router, 
    private http: HttpClient, public apiService: AplicacionService ) { }

  ngOnInit(): void {
    this.obtenerSeveridad();
    this.obtenerTipoSoft();
  }
  
  guardarCaso( form: NgForm ) {
    
    console.log('GuardarCaso');
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    // this.extraerBase64(archivoCapturado).then((imagen: any) => {
    //   this.previsualizacion = imagen.base;
    //   console.log(imagen);
    // })
    // this.archivo = this.previsualizacion;
    // this.archivos.push(archivoCapturado); //captura varios archivos
    // console.log(event.target.files);
    
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
