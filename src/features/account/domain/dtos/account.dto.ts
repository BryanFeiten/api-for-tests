export class AccountDto {
  public uid?: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    uid?: string,
  ) {
    this.uid = uid;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  };
}