import {atom} from 'jotai';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';
import {UserSignUpDTO} from '../../domain/entities/UserSignUpDTO';

interface User {
  email: string;
  password: string;
}
const baseError = atom<string>('');
export const signedUpUserAtom = atom<User>({
  email: '',
  password: '',
});
const baseLoading = atom<boolean>(false);

export const errorAtom = atom(get => get(baseError));
export const isLoadingAtom = atom(get => get(baseLoading));

export const dispatchSignUpUseCaseAtom = atom(
  null,
  async (_get, set, payload: User) => {
    set(baseLoading, true);
    set(baseError, '');

    try {
      const signUpUseCase = await AppIOCContainer.get('SignUpUseCase').execute(
        payload?.email,
        payload?.password,
      );
      E.fold(
        error => {
          if (typeof error === 'string') {
            set(baseError, error);
          }
        },
        (value: UserSignUpDTO) => {
          set(signedUpUserAtom, {email: value.email, password: value.password});
          set(baseError, '');
        },
      )(signUpUseCase);
    } catch (e: unknown) {
      set(baseError, (e ?? 'Unknown Error').toString());
    } finally {
      set(baseLoading, false);
    }
  },
);
