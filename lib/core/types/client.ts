// TODO switch to service/request for proper types
export interface Client {
  fetch: (
    input: RequestInfo,
    init?: RequestInit | undefined,
  ) => Promise<Response | any>;
}
