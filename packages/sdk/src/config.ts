export const CONFIG = {
  whiskServerUrl: process.env.WHISK_SDK_ENV == "development" ? "http://localhost:4000" : "https://api.whisk.so",
};
