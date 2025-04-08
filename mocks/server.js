import { setupServer } from "msw/node";
import { handlers } from "@/mocks/handlers";

export const servers = setupServer(...handlers);

export async function enableMocking() {
  if (!__DEV__) {
    return;
  }

  await import("./msw.polyfills");

  return servers;
}
