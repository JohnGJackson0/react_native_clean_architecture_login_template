import {atom} from 'jotai';
import * as E from 'fp-ts/Either';
import {AppIOCContainer} from '../../../../core/ioc/container';

interface payload {
  email: string;
  password: string;
  confirmCode: string;
}

export const successAtom = atom<boolean>(false);
const baseError = atom<string>('');
const baseLoading = atom<boolean>(false);

export const errorAtom = atom(get => get(baseError));
export const isLoadingAtom = atom(get => get(baseLoading));

export const dispatchConfirmUserAtom = atom(
  null,
  async (_get, set, payload: payload) => {
    set(baseLoading, true);
    set(baseError, '');

    try {
      const confirmUseCaseResponse: E.Either<string, boolean> =
        await AppIOCContainer.get('ConfirmUseCase').execute(
          payload?.email,
          payload?.password,
          payload?.confirmCode,
        );

      E.fold(
        error => {
          if (typeof error === 'string') {
            set(baseError, error.toString());
          }
        },
        (value: boolean) => {
          set(baseError, '');
          set(successAtom, value);
        },
      )(confirmUseCaseResponse);
    } catch (e: unknown) {
      set(baseError, (e ?? 'unknown error')?.toString());
    } finally {
      set(baseLoading, false);
    }
  },
);
