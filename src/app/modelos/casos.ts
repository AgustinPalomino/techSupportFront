import { Usuarios } from 'src/app/modelos/usuarios';
import { Adjuntos } from './adjuntos';
/**
 * Modelo que representa el modelo de Referencias en la bd
 * @author Agustín Palomino Pardo
 */
export class Casos {
    id!: number;
    casFechaIni!: Date;
    casTipo!: string;
    casAtiende!: number;
    casSeveridad!: string;
    casSubject!: string;
    casDescripcion!: string;
    casAdjuntos: Adjuntos [] = [];
    usuario!: Usuarios;
    casFechaFinalizado!: Date;
    casEstado!: string;
    casCategoria!: string;
}