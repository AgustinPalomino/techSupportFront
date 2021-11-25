import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../modelos/empresa';
import { Usuarios } from '../modelos/usuarios';
import { Referencia } from '../modelos/referencia';

/**
 * Clase que expone servicios de la aplicación
 * @author dev-sumset Agustín Palomino P. 
 */

@Injectable({
  providedIn: 'root'
})

export class AplicacionService {

  urlEndPoint:string ="http://localhost:8789/home/"

  constructor( private http:HttpClient ) { }

  //GET que realiza el consumo que trae la lista de todas las Referencias
  traerTodasReferencias():Observable<any> {    
    return this.http.get<any>(this.urlEndPoint+'referencia')
  }

  //GET que realiza el consumo que trae la lista de todas las Empresas
  traerTodasEmpresas():Observable<any> {
    return this.http.get<any>(this.urlEndPoint+'empresa/obtenertodas')
  }

  obtenerEmpresaPorId(id: number) {
    return this.http.post<any>(this.urlEndPoint+'empresa/porid', id)
  }

  //POST para registrar una Empresa
  guardarEmpresa(empresa: Empresa) {
    return this.http.post<any>(this.urlEndPoint+'empresa/crear', empresa)
  }

  //POST para eliminar Empresa
  eliminarEmpresa(id: number) {
    return this.http.post<any>(this.urlEndPoint+'empres/borrar', id)
  }

  //POST obtener usuario por mail y empresa
  traerUsuarioporMail(mail: String):Observable<any> {
    return this.http.post<any>(this.urlEndPoint+'usuario/buscarpormail', mail)
  }

  //GET para obtener todos los usuarios por empresa
  traerTodosUsuarios(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint+'usuario/obtenertodos')
  }

  //POST para eliminar usuario
  eliminarUsuario(id: number) {
    return this.http.post<any>(this.urlEndPoint+'usuario/borrar', id)
  }

  //POST para registrar un Usuario
  guardarUsuario(usuario: Usuarios) {
    return this.http.post<any>(this.urlEndPoint+'usuario/guardar', usuario)
  }

  //POST para obtener las referencias hijos por codigo padre
  traerReferenciasPorCodigo(cod: string){
    return this.http.post<any>(this.urlEndPoint+'ref/refporcod', cod)
  }

  //POST para traer usuario por Id
  traerUsuarioPorId(id: number) {
    return this.http.post<any>(this.urlEndPoint+'usuario', id)
  }

   //GET que realiza el consumo que trae todos los padres en referencia
   traerRefPadre() {
    return this.http.get<any>(this.urlEndPoint+'ref/refpad')
  }

  //POST para registrar una referencia
  guardarReferencia(ref: Referencia) {
    return this.http.post<any>(this.urlEndPoint+'ref/guardar', ref)
  }

}