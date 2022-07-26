import { SignInUseCase } from '../../../../../src/features/authentication/domain/usecases/sign_in.usecase';
import { AuthenticationRepository } from '../../../../../src/features/authentication/infra/database/repositories/authentication.repository';
import { JwtAdapter } from '../../../../../src/shared/adapters/jwt.adapter';
import { BadRequestError, NotFoundError, ServerError } from '../../../../../src/shared/presentation/errors';
import { SignInDtoBuilder } from '../../../builders/authentication/dtos/sign_in.dto.builder';

jest.mock('../../../../../src/features/authentication/infra/database/repositories/authentication.repository');
jest.mock('../../../../../src/shared/adapters/jwt.adapter');

const makeSut = (): SignInUseCase => {
  const repository = new AuthenticationRepository();
  return new SignInUseCase(repository);
}

describe('SignInUseCase -', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Cenários de erro no banco -', () => {
    test('Deve retornar ServerError quando ocorrer falha ao buscar o userUid', () => {
      const sut = makeSut();
      jest.spyOn(AuthenticationRepository.prototype, 'getAccountByEmail').mockRejectedValue('');
      const dto = SignInDtoBuilder.init().build();

      const result = sut.run(dto);

      expect(result).rejects.toThrow(new ServerError('Erro na comunicação com o banco'));
    });

    test('Deve retornar ServerError quando ocorrer falha ao validar senha do usuário', () => {
      const sut = makeSut();
      jest.spyOn(AuthenticationRepository.prototype, 'getAccountByEmail').mockResolvedValue('any_user_uid');
      jest.spyOn(AuthenticationRepository.prototype, 'validatePassword').mockRejectedValue('');
      const dto = SignInDtoBuilder.init().build();

      const result = sut.run(dto);

      expect(result).rejects.toThrow(new ServerError('Erro na comunicação com o banco'));
    });
  });

  test('Deve chamar os métodos getAccountByEmail e validatePassword', async () => {
    const sut = makeSut();

    const findUserUid = jest.spyOn(AuthenticationRepository.prototype, 'getAccountByEmail').mockResolvedValue('any_user_uid');
    const validPass = jest.spyOn(AuthenticationRepository.prototype, 'validatePassword').mockResolvedValue(true);

    const dto = SignInDtoBuilder.init().build();

    await sut.run(dto);

    expect(findUserUid).toHaveBeenCalledWith(dto.email);
    expect(findUserUid).toHaveBeenCalledTimes(1);
    expect(validPass).toHaveBeenCalledWith('any_user_uid', dto.password);
    expect(validPass).toHaveBeenCalledTimes(1);
  });

  test('Deve lançar um BadRequestError por não ter os caractéres mínimos no email', async () => {
    const sut = makeSut();
    const dto = SignInDtoBuilder.init().emailWithoutMinCharacters().build();

    const result = sut.run(dto);

    expect(result).rejects.toThrow(new BadRequestError('O campo E-mail deve conter pelo menos 10 caractéres'));
  });

  test('Deve lançar um BadRequestError pelo E-mail ser inválido', async () => {
    const sut = makeSut();
    const dto = SignInDtoBuilder.init().withInvalidEmail().build();

    const result = sut.run(dto);

    expect(result).rejects.toThrow(new BadRequestError('E-mail inválido'));
  });

  test('Deve lançar um BadRequestError por não ter os caractéres mínimos na senha', async () => {
    const sut = makeSut();
    const dto = SignInDtoBuilder.init().passWithouMinCharacters().build();

    const result = sut.run(dto);

    expect(result).rejects.toThrow(new BadRequestError('O campo Senha deve conter pelo menos 6 caractéres'));
  });

  test('Deve lançar um NotFoundError por não encontrar o usuário no banco', async () => {
    const sut = makeSut();
    jest.spyOn(AuthenticationRepository.prototype, 'getAccountByEmail').mockResolvedValue('');
    const dto = SignInDtoBuilder.init().build();

    const result = sut.run(dto);

    expect(result).rejects.toThrow(new NotFoundError('E-mail ou Senha incorreto(s)'));
  });

  test('Deve lançar um NotFoundError pois o password está incorreto', async () => {
    const sut = makeSut();
    jest.spyOn(AuthenticationRepository.prototype, 'getAccountByEmail').mockResolvedValue('any_user_uid');
    jest.spyOn(AuthenticationRepository.prototype, 'validatePassword').mockResolvedValue(false);
    const dto = SignInDtoBuilder.init().build();

    const result = sut.run(dto);

    expect(result).rejects.toThrow(new NotFoundError('E-mail ou Senha incorreto(s)'));
  })

  test('Deve retornar um token válido para o usuário usar nas futuras requisições', async () => {
    const encrypted = 'any_data_encrypted';
    const sut = makeSut();
    jest.spyOn(AuthenticationRepository.prototype, 'getAccountByEmail').mockResolvedValue('any_user_uid');
    jest.spyOn(AuthenticationRepository.prototype, 'validatePassword').mockResolvedValue(true);
    jest.spyOn(JwtAdapter.prototype, 'encrypt').mockResolvedValue(encrypted);
    const dto = SignInDtoBuilder.init().build();

    const result = await sut.run(dto);

    expect(result).toEqual(encrypted);
  })
});