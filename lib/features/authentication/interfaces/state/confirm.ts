import {atom} from 'jotai';
import * as E from 'fp-ts/Either';
import {AppIOCContainer} from '../../../../core/ioc/container';

interface payload {
  email: string;
  password: string;
  confirmCode: string;
}

const baseSuccess = atom<boolean>(false);
const baseError = atom<string>('');
const baseLoading = atom<boolean>(false);

export const errorAtom = atom(get => get(baseError));
export const isLoadingAtom = atom(get => get(baseLoading));
export const successAtom = atom(get => get(baseSuccess));

export const dispatchConfirmUserAtom = atom(
  null,
  async (_get, set, payload: payload) => {
    set(baseLoading, true);

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
          set(baseSuccess, value);
        },
      )(confirmUseCaseResponse);
    } catch (e: unknown) {
      set(baseError, (e ?? 'unknown error')?.toString());
    } finally {
      set(baseLoading, false);
    }
  },
);
