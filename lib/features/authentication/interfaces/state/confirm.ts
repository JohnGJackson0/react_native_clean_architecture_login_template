import {atom} from 'jotai';
import * as E from 'fp-ts/Either';
import {ConfirmDTO} from '../../domain/entities/ConfirmDTO';
import {AppIOCContainer} from '../../../../core/ioc/container';

interface UserTokens {
  jwt: string;
  refresh: string;
}

interface payload {
  email: string;
  password: string;
  confirmCode: string;
}

const baseTokens = atom<UserTokens>({jwt: '', refresh: ''});
const baseError = atom<string>('');
const baseLoading = atom<boolean>(false);

export const errorAtom = atom(get => get(baseError));
export const isLoadingAtom = atom(get => get(baseLoading));
export const tokensAtom = atom(get => get(baseTokens));

export const dispatchConfirmUserAtom = atom(
  null,
  async (_get, set, payload: payload) => {
    set(baseLoading, true);

    try {
      const confirmUseCaseRespone: E.Either<string, ConfirmDTO> =
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
        (value: ConfirmDTO) => {
          set(baseError, '');
          set(baseTokens, {jwt: value.jwtToken, refresh: value.refreshToken});
        },
      )(confirmUseCaseRespone);
    } catch (e: unknown) {
      set(baseError, (e ?? 'unknown error')?.toString());
    } finally {
      set(baseLoading, false);
    }
  },
);
