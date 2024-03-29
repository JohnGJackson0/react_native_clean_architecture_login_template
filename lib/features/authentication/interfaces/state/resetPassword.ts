import {atom} from 'jotai';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';

interface Payload {
  email: string;
}
const baseError = atom<string>('');
const baseLoading = atom<boolean>(false);

export const isSubmittedAtom = atom<boolean>(false);
export const errorAtom = atom(get => get(baseError));
export const isLoadingAtom = atom(get => get(baseLoading));

export const dispatchResetPasswordUseCaseAtom = atom(
  null,
  async (_get, set, payload: Payload) => {
    set(baseLoading, true);
    set(baseError, '');

    try {
      const ResetPasswordUseCase = await AppIOCContainer.get(
        'ResetPasswordUseCase',
      ).execute(payload?.email);
      E.fold(
        error => {
          if (typeof error === 'string') {
            set(baseError, error);
          }
        },
        (value: boolean) => {
          set(isSubmittedAtom, value);
          set(baseError, '');
        },
      )(ResetPasswordUseCase);
    } catch (e: unknown) {
      set(baseError, (e ?? 'Unknown Error').toString());
    } finally {
      set(baseLoading, false);
    }
  },
);
