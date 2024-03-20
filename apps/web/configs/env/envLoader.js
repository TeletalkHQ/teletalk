import dotenv from "dotenv";

export const evnLoader = () => {
  ["base", process.env.NODE_ENV].forEach((fileName) => {
    dotenv.config({
      path: `./configs/env/.env.${fileName}`,
      override: true,
    });
  });
};
