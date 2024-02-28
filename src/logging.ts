import { configure, getLogger } from "log4js";

export const logger = getLogger();
logger.level = "debug";

configure({
  appenders: {
    cheese: {
      type: "file",
      filename: `logs/${new Date().getTime()}.log`,
      flags: "w",
    },
  },
  categories: { default: { appenders: ["cheese"], level: "debug" } },
});
