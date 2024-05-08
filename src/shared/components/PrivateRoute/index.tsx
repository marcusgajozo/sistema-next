import { APP_ROUTES } from "@/shared/constants/app-routes";
import { checkUserAuthenticated } from "@/shared/functions/check-user-authenticated";
import useAuth from "@/shared/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { push } = useRouter();

  const isUserAuthenticated = checkUserAuthenticated();

  useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.login);
    }
  }, [isUserAuthenticated, push]);

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
