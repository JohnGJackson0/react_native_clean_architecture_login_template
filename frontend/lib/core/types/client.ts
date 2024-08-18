import * as E from 'fp-ts/Either';

export interface Client {
  request<TResponse, TFailResponse>(
    url: string,
    config?: RequestInit,
  ): Promise<E.Either<TFailResponse | string, TResponse>>;
}
