import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { hashSync } from 'bcrypt';
import { randomUUID } from "crypto";
import 'dotenv/config';

import { PostEntity } from "./post";

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @PrimaryColumn({
    length: 50,
  })
  uid: string;

  @Column({
    length: 30,
  })
  username: string;

  @Column({
    name: 'first_name',
    length: 30,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    length: 30,
  })
  lastName: string;

  @Column({
    length: 100,
  })
  email: string;

  @Column({
    length: 75,
  })
  password: string;

  private tempPassword?: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, Number(process.env.BCRYPT_SALT));
  }

  @AfterLoad()
  loadTempPassword(): void {
    this.tempPassword = this.password;
  }


  @BeforeUpdate()
  encryptPassword(): void {
    if (this.tempPassword !== this.password) {
      this.hashPassword();
    }
  }

  @OneToMany(type => PostEntity, post => post.accountUid)
  posts?: PostEntity[];

  constructor(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    super();
    this.uid = randomUUID();
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
