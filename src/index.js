export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "nicholaschew.me") {
      url.hostname = "www.nicholaschew.me";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  }
};
