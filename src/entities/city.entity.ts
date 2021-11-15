export class City {
  private readonly id: number;
  private readonly countryId: number;
  private readonly name: string;

  constructor(id: number, countryId: number, name: string) {
    this.id = id;
    this.countryId = countryId;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getcountryId() {
    return this.countryId;
  }

  getName() {
    return this.name;
  }
}
