export class User {
  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public patronymic: string,
    public phoneNumber: string,
    public placeOfWorkStudy: string,
    public TShirt: string,
    public size: string,
    public description: string,
    public skills: [{
      skill: string,
      skillLevel: string,
    }],
  ) {}
}
