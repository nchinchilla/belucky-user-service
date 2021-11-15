export class User {
  private username: string;
  private password: string;
  private id: number;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  public getUserId() {
    return this.id;
  }
}
