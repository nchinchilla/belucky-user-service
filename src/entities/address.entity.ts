export class Address {
  private readonly id: number;
  private readonly cityId: number;
  private readonly street: string;

  constructor(cityId: number, street: string) {
    this.cityId = cityId;
    this.street = street;
  }

  getAddressId() {
    return this.id;
  }

  getCityId() {
    return this.cityId;
  }

  getStreet() {
    return this.street;
  }
}
