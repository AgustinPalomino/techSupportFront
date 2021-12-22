/**
 * Modelo que representa el modelo de Referencias en la bd
 * @author Agustín Palomino Pardo
 */

import { Adjuntos } from "./adjuntos";

export class CasoConAdjuntos {
    id!: number;
    solicita!: number;
	atiende!: number;
	categoria!: string;
	severidad!: string;
	descripcion!:string;
	estado!:string;
	creacion!:Date;
	asunto!: string;
	tipo!: string;
	observaciones!: string;
	adjuntos!: Adjuntos[];
}