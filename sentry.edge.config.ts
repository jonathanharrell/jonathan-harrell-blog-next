import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://72321008fc7be000e4836d4c63dace00@o87029.ingest.us.sentry.io/4509226043834368",
  sendDefaultPii: true,
});
