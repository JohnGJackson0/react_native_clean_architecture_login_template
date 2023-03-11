import {client} from '../../../../lib/core/services/request';
import * as E from 'fp-ts/Either';
describe('Client Service', () => {
  it('shows network error message on failure to fetch', async () => {
    const mockFetch: typeof fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(''));
    // @ts-ignore
    const result = await client.request('', {}, mockFetch);

    const test = E.fold(
      error => error,
      value => value,
    )(result);

    expect(test).toEqual(
      'Cannot fetch the specified resource most likely because of a network error.',
    );
  });

  it('returns left when fetch response returns !ok', async () => {
    const mockFetch: typeof fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => {
        return {message: 'fakeMessage'};
      },
    });
    // @ts-ignore
    const result = await client.request('', {}, mockFetch);

    const test = E.fold(
      error => error,
      value => value,
    )(result);

    expect(test).toEqual({message: 'fakeMessage'});
    expect(E.isLeft(result)).toEqual(true);
    expect(E.isRight(result)).toEqual(false);
  });

  it('returns right when fetch reponse returns ok', async () => {
    const mockFetch: typeof fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => {
        return {message: 'fakeMessage'};
      },
    });
    // @ts-ignore
    const result = await client.request('', {}, mockFetch);

    const test = E.fold(
      error => error,
      value => value,
    )(result);

    expect(test).toEqual({message: 'fakeMessage'});
    expect(E.isLeft(result)).toEqual(false);
    expect(E.isRight(result)).toEqual(true);
  });
});
