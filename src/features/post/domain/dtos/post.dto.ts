import '../../../../shared/utils';

export class PostDto {
  public uid?: string;
  public accountUid: string;
  public title: string;
  public description: string;
  public createdAt?: string;

  constructor(
    accountUid: string,
    title: string,
    description: string,
    uid?: string,
  ) {
    
    this.uid = uid;
    this.accountUid = accountUid;
    this.title = title;
    this.description = description;
    this.createdAt = new Date().toAppDate();
  };
}