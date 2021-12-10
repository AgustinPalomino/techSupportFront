/**
 * Modelo que representa el modelo de Referencias en la bd
 * @author Agustín Palomino Pardo
 */

 export class CasosTabla {
    id!: number;
    creacion!: Date;
    asunto!: string;
    descripcion!: string;
    estado!: string;
}