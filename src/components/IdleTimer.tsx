import { useIdleTimer } from "react-idle-timer";
import { toast } from "react-toastify";

import { useAuth } from "@/contexts";

export const IdleTimer = () => {
  const { logout } = useAuth();

  const handleIdle = () => {
    toast.error(
      "You have been inactive for a while, please login to continue using the portal"
    );
    logout();
  };
  const timeout = 5 * 60 * 1000;

  useIdleTimer({
    timeout,
    onIdle: handleIdle,
    debounce: 500,
  });

  return null;
};
