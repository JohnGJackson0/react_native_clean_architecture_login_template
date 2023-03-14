import * as E from 'fp-ts/Either';
import {Client} from '../types/client';

async function request<TResponse, TFailResponse>(
  url: string,
  config: RequestInit = {},
  fetchParam: typeof fetch = fetch,
): Promise<E.Either<TFailResponse | string, TResponse>> {
  try {
    const response = await fetchParam(url, config);

    if (!response.ok) {
      const data: TFailResponse = await response.json();
      return E.left(data);
    } else {
      const data: TResponse = await response.json();
      return E.right(data as TResponse);
    }
  } catch (e: unknown) {
    return E.left(
      `Cannot fetch the specified resource most likely because of a network error.`,
    );
  }
}

export const client: Client = {
  request: request,
};
