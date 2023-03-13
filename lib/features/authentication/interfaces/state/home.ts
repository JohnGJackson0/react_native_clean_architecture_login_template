import {AppIOCContainer} from '../../../../core/ioc/container';
import * as E from 'fp-ts/Either';
import {atom} from 'jotai';
import {LoginSanityDTO} from '../../domain/entities/LoginSanityDTO';

interface UserData {
  email: string;
  verifiedEmail: boolean;
}

const baseUserData = atom<UserData | null>(null);
const baseError = atom<string>('');
const baseLoading = atom<boolean>(false);

export const userDataAtom = atom(get => get(baseUserData));
export const errorAtom = atom(get => get(baseError));
export const isLoadingAtom = atom(get => get(baseLoading));

export const dispatchLoginSanityUseCaseAtom = atom(null, async (_get, set) => {
  set(baseLoading, true);
  try {
    const useCase = AppIOCContainer.get('LoginSanityUseCase');
    const result = await useCase.execute();

    E.fold(
      (error: unknown) => {
        if (typeof error === 'string') {
          set(baseError, error.toString());
        }
      },
      (value: LoginSanityDTO) => {
        set(baseError, '');
        set(baseUserData, {
          email: value.email,
          verifiedEmail: value.verifiedEmail,
        });
      },
    )(result);
  } catch (e) {
    set(baseError, (e ?? 'unknown error')?.toString());
  } finally {
    set(baseLoading, false);
  }
});
