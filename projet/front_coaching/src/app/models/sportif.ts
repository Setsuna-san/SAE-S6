import { Seance } from "./seance";

export class Sportif {
  constructor(
    public id: number = 0,
    public email: string = "",
    public nom: string = "",
    public prenom: string = "",
    public date_inscription: Date = new Date(),
    public niveau_sportif: string = "",
    public seances: Seance[] = []
  ) {}

  formatDate(): string {
    const jour = this.date_inscription.getDate();
    const moisEnTexte = new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
    }).format(this.date_inscription);

    return `${jour} ${moisEnTexte} `;
  }
}
