import { useRouter } from "next/router";

import { UrlName } from "~/types";

export const useCustomRouter = () => {
  const router = useRouter();

  return {
    ...router,
    push: (url: UrlName) => router.push(url),
  };
};
