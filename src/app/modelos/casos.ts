/**
 * Modelo que representa el modelo de Referencias en la bd
 * @author Agustín Palomino Pardo
 */
export class Casos {
    id!: number;
    casFechaInicio!: Date;
    casTipo!: string;
    casCategoria!: string;
    casSeveridad!: string;
    casSubject!: string;
    casDescripcion!: string;
    casAdjuntos!: string;
    casUsrId!: number;
    casFechaFinalizado!: Date;
    
}