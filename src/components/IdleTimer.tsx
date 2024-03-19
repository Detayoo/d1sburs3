import { useIdleTimer } from "react-idle-timer";
import { toast } from "react-toastify";

import { useAuth } from "@/contexts";

export const IdleTimer = () => {
  const { logout } = useAuth();

  const timeout = 5 * 60 * 1000;

  const handleIdle = () => {
    toast.error(
      "You have been inactive for a while, please login to continue using the portal"
    );
    logout();
  };

  useIdleTimer({
    timeout,
    onIdle: handleIdle,
    debounce: 500,
  });

  return null;
};
