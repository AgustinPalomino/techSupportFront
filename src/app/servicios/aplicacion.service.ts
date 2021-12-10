import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../modelos/empresa';
import { Usuarios } from '../modelos/usuarios';
import { Referencia } from '../modelos/referencia';
import { Casos } from '../modelos/casos';

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
    return this.http.get<any>(this.urlEndPoint+'ref/obtenertodas')
  }

  //GET que realiza el consumo que trae la lista de todas las Empresas
  traerTodasEmpresas():Observable<any> {
    return this.http.get<any>(this.urlEndPoint+'empresa/obtenertodas')
  }

  //POST para consulta Empresa por Id
  obtenerEmpresaPorId(id: number):Observable<any> {
    return this.http.post<any>(this.urlEndPoint+`empresa/porid/${id}`, id)
  }

  //POST para registrar una Empresa
  guardarEmpresa(empresa: Empresa) {
    return this.http.post<any>(this.urlEndPoint+'empresa/crear', empresa)
  }

  //POST para eliminar Empresa
  eliminarEmpresa(id: number) {
    return this.http.post<any>(this.urlEndPoint+`empres/borrar/${id}`, id)
  }

  //POST obtener usuario por mail y empresa
  traerUsuarioporMail(mail: String) {
   return this.http.post<any>(this.urlEndPoint+`usuario/buscarpormail/${mail}`, mail)
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
    return this.http.post<any>(this.urlEndPoint+`ref/refporcod/${cod}`, cod)
  }

  //POST para traer usuario por Id
  traerUsuarioPorId(id: number) {
    return this.http.post<any>(this.urlEndPoint+`usuario/${id}`, id)
  }

   //GET que realiza el consumo que trae todos los padres en referencia
   traerRefPadre() {
    return this.http.get<any>(this.urlEndPoint+'ref/refpad')
  }

  //POST para registrar una referencia
  guardarReferencia(ref: Referencia) {
    return this.http.post<any>(this.urlEndPoint+'ref/guardar', ref)
  }

  //POST para guardar archivo
  guardarAdjuntos(form: FormData) {
    return this.http.post<any>(this.urlEndPoint+'upload', form)
  }

  upload(file: File): Observable<HttpEvent<any>>{
    let empId = sessionStorage.getItem('empresa');
    const formData: FormData = new FormData();
    formData.append('files', file);
    if (empId) formData.append('empId', empId);
   
    const req = new HttpRequest('POST', this.urlEndPoint+'upload', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //Metodo para Obtener los archivos
  getFiles(){
    return this.http.get(this.urlEndPoint+'files');
  }

  //Metodo para borrar los archivos cargados
  deleteFile(filename: string){
    return this.http.get(this.urlEndPoint+`delete/${filename}`);
  }

  //POST para autenticar usuario
  autenticarUsuario(usuario: Usuarios) {
    return this.http.post<any>(this.urlEndPoint+'usuario/autenticar', usuario)
  }

  //POST para buscar casos por usuario
  traerCasosPorUsr(id: number) {
    return this.http.post<any>(this.urlEndPoint+`casos/buscarporusr/${id}`, id)
  }

  //POST para registrar un Caso
  guardarCaso(caso: Casos) {
    return this.http.post<any>(this.urlEndPoint+'casos/crear', caso)
  }  

  //GET para buscar casos sin asignar
  traerCasosSinAsignar() {
    return this.http.get<any>(this.urlEndPoint+'casos/buscarnoasinados')
  }

  listarTecnicos() {
    return this.http.get<any>(this.urlEndPoint+'usuario/buscartecnicos')
  }

}