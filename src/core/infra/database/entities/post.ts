import { randomUUID } from "crypto";
import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "./user";

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
  @PrimaryColumn({
    length: 50,
  })
  uid: string;

  @Column({
    name: 'user_uid',
    length: 50,
  })
  userUid: string;

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

  @ManyToOne(type => UserEntity, user => user.posts)
  @JoinColumn({ name: 'user_uid', referencedColumnName: 'uid' })
  user?: UserEntity;

  constructor(
    userId: string,
    title: string,
    description: string,
    createdAt: string,
  ) {
    super();
    this.uid = randomUUID();
    this.userUid = userId;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
  }
}