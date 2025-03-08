export class Utilisateur {

  constructor(
    public id: number,
    public email: string,
    public roles: string[],
    public nom: string,
    public prenom: string,
    public type: string
  ) {}
}
