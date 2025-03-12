
export class Exercice {
  constructor(
    public id: number = 0,
    public nom: string = "",
    public description: string = "",
    public duree_estimee: number = 0,
    public difficulte: string = ""
  ) {}
}
