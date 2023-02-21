export interface Client {
  fetch: (
    input: RequestInfo,
    init?: RequestInit | undefined,
    // TODO needs proper mock
  ) => Promise<Response | any>;
}
