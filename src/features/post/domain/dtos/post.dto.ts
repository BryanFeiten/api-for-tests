import '../../../../shared/utils/extension_methods';


export class PostDto {
  public uid?: string;
  public userUid: string;
  public title: string;
  public description: string;
  public createdAt?: string;

  constructor(
    userUid: string,
    title: string,
    description: string,
    uid?: string,
  ) {
    
    this.uid = uid;
    this.userUid = userUid;
    this.title = title;
    this.description = description;
    this.createdAt = new Date().toAppDate();
  };
}