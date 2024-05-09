import { getStorageItem } from "@/shared/utils/localStorage";
import checkExpiredToken from "../check-expired-token";

export const checkUserAuthenticated = () => {
  const userToken = getStorageItem("token");
  return checkExpiredToken(userToken);
};
