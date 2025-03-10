export class Sportif {
  constructor(
    public id: number = 0,
    public email: string = "",
    public roles: string[] = [],
    public nom: string = "",
    public prenom: string = "",
    public date_inscription: Date = new Date(),
    public niveau_sportif: string = ""
  ) {}
}
