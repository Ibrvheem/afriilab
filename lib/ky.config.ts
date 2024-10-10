import ky from "ky";
import { redirect } from "next/navigation";

const api = ky.create({
  prefixUrl: "https://demo-app-775818477993.us-central1.run.app/",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}` || "",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = process.env.token;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
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
