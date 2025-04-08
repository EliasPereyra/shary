import { Appconfig } from "@/services/appwrite";
import { http, HttpResponse } from "msw";

const session = {
  $id: "session-id",
  userId: "user-id",
  provider: "email",
};

const account = {
  $id: "account-id",
  email: "john@mail.com",
};

export const handlers = [
  http.post(`${Appconfig.endpoint}/account/sessions/email`, () => {
    return HttpResponse.json(session, {
      status: 201,
    });
  }),
  http.post(`${Appconfig.endpoint}/account`, () => {
    return HttpResponse.json(account, {
      status: 201,
    });
  }),
];
