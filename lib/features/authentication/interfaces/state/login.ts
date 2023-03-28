import {atom} from 'jotai';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';

interface User {
  email: string;
  password: string;
}
const baseError = atom<string>('');
export const isSignedInAtom = atom<boolean>(false);
const baseLoading = atom<boolean>(false);

export const errorAtom = atom(get => get(baseError));
export const isLoadingAtom = atom(get => get(baseLoading));

export const dispatchSignUpUseCaseAtom = atom(
  null,
  async (_get, set, payload: User) => {
    set(baseLoading, true);

    try {
      const loginUseCase = await AppIOCContainer.get('LoginUseCase').execute(
        payload?.email,
        payload?.password,
      );
      E.fold(
        error => {
          if (typeof error === 'string') {
            set(baseError, error);
          }
        },
        (value: boolean) => {
          set(isSignedInAtom, value);
          set(baseError, '');
        },
      )(loginUseCase);
    } catch (e: unknown) {
      set(baseError, (e ?? 'Unknown Error').toString());
    } finally {
      set(baseLoading, false);
    }
  },
);
