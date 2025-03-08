import { Utilisateur } from "./utilisateur";

export class Coach {
  constructor(
    public id: number,
    public email: string,
    public roles: string[],
    public nom: string,
    public prenom: string,
    public specialites: string,
    public tarif_horaire: number
  ) {
  }
}
