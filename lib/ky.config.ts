import ky from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const token = cookies().get("token");
const api = ky.create({
  prefixUrl: "https://demo-app-775818477993.us-central1.run.app/",
  headers: {},
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          console.error("Unauthorized! Redirecting to login...");
          redirect("/");
        }
        return response;
      },
    ],
  },
});

export default api;
