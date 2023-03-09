import {atom} from 'jotai';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';
// import {loadable} from 'jotai/utils';

/*
interface SignedUpUserState {
  email: string;
  password: string;
}
*/
export const UserSignedUp = atom({email: '', password: ''});
export const UserSignUpLoading = atom<boolean>(false);
export const userSignUpError = atom<string>('');

/*
export const SignUpUserLoadableAsyncAtom = loadable(
  atom(async (_get: unknown, email: string, password: string) =>
    SignUpUser({email, password}),
  ),
);
*/
/*

export const signUpErrorAtom = atom<string>('');
export const signUpUserAtom = atom<SignedUpUserState>({
  email: '',
  password: '',
});
export const signUpLoadingAtom = atom<boolean>(false);

export const SignUpUserTest = (_: SignedUpUserState) =>
  atom(async () => {
    SignUpUser(_);
  });

export const SignUpUserTestTwo = atom((_: SignedUpUserState) => SignUpUser(_));
*/
export const SignUpUser = async (
  email: string,
  password: string,
): Promise<E.Either<string, UserSignUpDTO>> => {
  const useCase = AppIOCContainer.get('SignUpUseCase');
  const result = await useCase.execute(email, password);

  return E.fold(
    (error: string) => {
      return E.left(error);
    },
    (value: UserSignUpDTO) => {
      return E.right(value);
    },
  )(result);
};
