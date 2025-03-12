import { Exercice } from './exercice';

export class Seance {
  constructor(
    public id: number = 0,
    public date_heure: Date = new Date(),
    public type_seance: string[] = [],
    public theme_seance: string = '',
    public statut: string = '',
    public niveau_seance: string = '',
    public exercices: Exercice[] = [],
    public coachId: number = 0
  ) {}

  // Méthode pour formater la date au format "jour mois - heure:minute"
  formatDate(): string {
    const jour = this.date_heure.getDate();
    const moisEnTexte = new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
    }).format(this.date_heure);
    const heure = this.date_heure.getHours();
    const minutes = this.date_heure.getMinutes();

    return `${jour} ${moisEnTexte} à ${heure}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
  }
}
