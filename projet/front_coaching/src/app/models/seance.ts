import { Exercice } from "./exercice";

export class Seance {
  constructor(
    public id: number,
    public coach_id: number,
    public date_heure: Date,
    public type_seance: string[],
    public theme_seance: string,
    public statut: string,
    public niveau_seance: string,
    public exercices: Exercice[]
  ) {}

}
