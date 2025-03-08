export class Exercice {
  constructor(
    public id: number,
    public nom: string[],
    public description: string,
    public duree: number,
    public difficulte: string
  ) {}
}
