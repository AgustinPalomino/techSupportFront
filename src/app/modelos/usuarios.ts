import { Empresa } from './empresa';
/**
 * Modelo que representa el modelo de Referencias en la bd
 * @author Agustín Palomino Pardo
 */

export class Usuarios {
    id!: number;
    usrNombre!: string;
    usrAlias!: string;
    usrClave!: string;
    usrMail!: string;
    usrRol!: string;
    empresa!: Empresa;
    
}