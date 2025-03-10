import { Exercice } from "./exercice";

export class Seance {
  constructor(
    public id: number = 0,
    public coach_id: number = 0,
    public date_heure: Date = new Date(),
    public type_seance: string[] = [],
    public theme_seance: string = "",
    public statut: string = "",
    public niveau_seance: string = "",
    public exercices: Exercice[] = []
  ) {}
}
