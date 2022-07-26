import { SignInDto } from "../../../../../src/features/authentication/domain/dtos/sign_in.dto";

export class SignInDtoBuilder {
  #email = 'any_email@test.com';
  #password = 'any_password';

  static init(): SignInDtoBuilder {
    return new SignInDtoBuilder();
  }

  withInvalidEmail(): SignInDtoBuilder {
    this.#email = 'any_invalid_email';

    return this;
  }

  emailWithoutMinCharacters(): SignInDtoBuilder {
    this.#email = 'any_email';

    return this;
  }

  passWithouMinCharacters(): SignInDtoBuilder {
    this.#password = 'pass';

    return this;
  }

  build(): SignInDto {
    return new SignInDto(this.#email, this.#password);
  }
}