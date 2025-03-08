import { Utilisateur } from "./utilisateur";

export class Sportif {

  constructor(
    public id: number,
    public email: string,
    public roles: string[],
    public nom: string,
    public prenom: string,
    public date_inscription: Date,
    public niveau_sportif: string
  ) {
  }

}
