import {atom} from 'jotai';
import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';

interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  confimCode: string;
}
const baseError = atom<string>('');
const baseLoading = atom<boolean>(false);
const baseConfirmed = atom<boolean>(false);
const baseConfirmedMessage = atom<string>('');

export const isConfirmedAtom = atom(get => get(baseConfirmed));
export const confirmedMessageAtom = atom(get => get(baseConfirmedMessage));
export const errorAtom = atom(get => get(baseError));
export const isLoadingAtom = atom(get => get(baseLoading));

export const dispatchConfirmResetUseCaseAtom = atom(
  null,
  async (_get, set, payload: ResetPasswordPayload) => {
    set(baseLoading, true);

    try {
      const ConfirmPasswordReset = await AppIOCContainer.get(
        'ConfirmPasswordResetUseCase',
      ).execute(payload.email, payload.confimCode, payload.newPassword);
      E.fold(
        error => {
          if (typeof error === 'string') {
            set(baseError, error);
          }
        },
        (_value: string) => {
          set(baseConfirmed, true);
          set(baseError, '');
        },
      )(ConfirmPasswordReset);
    } catch (e: unknown) {
      set(baseError, (e ?? 'Unknown Error').toString());
    } finally {
      set(baseLoading, false);
    }
  },
);
