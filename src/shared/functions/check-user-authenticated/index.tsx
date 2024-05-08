import { getStorageItem } from "@/shared/utils/localStorage";

export const checkUserAuthenticated = () => {
  const userToken = getStorageItem("token");
  return !!userToken;
};
