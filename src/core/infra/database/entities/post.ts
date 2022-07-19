import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { randomUUID } from "crypto";

import { AccountEntity } from "./account";

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
  @PrimaryColumn({
    length: 50,
  })
  uid: string;

  @Column({
    name: 'account_uid',
    length: 50,
  })
  accountUid: string;

  @Column({
    length: 50,
  })
  title: string;

  @Column()
  description: string;

  @Column({
    name: 'created_at',
    // type: process.env.NODE_ENV === "production" ? 'timestamp' : 'datetime',
    // default: () => 'NOW()',
  })
  createdAt: string;

  @ManyToOne(type => AccountEntity, account => account.posts)
  @JoinColumn({ name: 'account_uid', referencedColumnName: 'uid' })
  account?: AccountEntity;

  constructor(
    accountUId: string,
    title: string,
    description: string,
    createdAt: string,
  ) {
    super();
    this.uid = randomUUID();
    this.accountUid = accountUId;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
  }
}