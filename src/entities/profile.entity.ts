export class Profile {
  private readonly id: number;
  private readonly userId: number;
  private readonly addressId: number;
  private readonly name: string;

  constructor(userId: number, addressId: number, name: string) {
    this.userId = userId;
    this.addressId = addressId;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getAddressId() {
    return this.addressId;
  }

  getName() {
    return this.name;
  }
}
