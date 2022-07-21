import {
  getRepository,
  Repository,
} from "typeorm";

import '../../../../../shared/utils';
import { PostEntity } from "../../../../../core/infra/database/entities/post";
import { PostDto } from "../../../domain/dtos/post.dto";


export class PostRepository {
  private _repository: Repository<PostEntity>;

  constructor() {
    this._repository = getRepository(PostEntity);
  }

  async create(post: PostDto): Promise<PostEntity> {
    const postInstance = this._repository.create(post);
    const postCreated = await this._repository.save(postInstance);

    return postCreated;
  }

  async getByUid(uid: string): Promise<PostEntity> {
    const post = await this._repository.findOneOrFail({where: {uid: uid}});

    return post;
  }

  async getByAccountUid(accountUid: string): Promise<PostEntity[]> {
    const postsOfOneUser = await this._repository.find({ where: { accountUid: accountUid } });

    return postsOfOneUser;
  }

  async postList(): Promise<PostEntity[]> {
    const postList = await this._repository.find();

    return postList;
  }

  async delete(uid: string): Promise<boolean> {
    const deleted = !!await this._repository.delete(uid);

    return deleted;
  }

  async update(
    post: PostDto,
    actualPost: PostEntity,
  ): Promise<PostEntity> {

    actualPost.title = post.title.isNotEmpty()
      ? post.title
      : actualPost.title;

    actualPost.description = post.description.isNotEmpty()
      ? post.description
      : actualPost.description;

    const postUpdated = await this._repository.save(actualPost);

    return postUpdated;
  }
}
