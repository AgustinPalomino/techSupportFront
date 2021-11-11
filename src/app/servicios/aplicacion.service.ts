import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../modelos/empresa';

/**
 * Clase que expone servicios de la aplicación
 * @author dev-sumset Agustín Palomino P. 
 */

@Injectable({
  providedIn: 'root'
})

export class AplicacionService {

  urlEndPoint:string ="http://localhost:8989/home/"

  constructor( private http:HttpClient ) { }

  //GET que realiza el consumo que trae la lista de todas las Referencias
  traerTodasReferencias():Observable<any> {    
    return this.http.get<any>(this.urlEndPoint+'referencia')
  }

  //GET que realiza el consumo que trae la lista de todas las Empresas
  traerTodasEmpresas():Observable<any> {
    return this.http.get<any>(this.urlEndPoint+'empresa')
  }

  //POST para registrar una Empresa
  guardarEmpresa(empresa: Empresa) {
    return this.http.post<any>(this.urlEndPoint+'empresa', empresa)
  }

  


}