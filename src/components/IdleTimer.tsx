import React, { useState } from "react";
import { useIdleTimer } from "react-idle-timer";

import { useAuth } from "@/contexts";
import { toast } from "react-toastify";

export const IdleTimer = () => {
  const { logout } = useAuth();
  const [isIdle, setIdle] = useState(false);

  const handleIdle = () => {
    setIdle(true);
    console.log("about to fire");
    logout();
  };
  const timeout = 1 * 1000 * 60;

  const idleTimer = useIdleTimer({
    timeout,
    onIdle: handleIdle,
    debounce: 500,
  });

  return (
    idleTimer.getElapsedTime() > timeout / 2 &&
    isIdle &&
    toast.error("You have been inactive for a while, please log in")
  );
};
