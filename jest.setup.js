import { server } from "./mocks/server";

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.resetHandlers();
});
afterEach(() => {
  server.close();
});
