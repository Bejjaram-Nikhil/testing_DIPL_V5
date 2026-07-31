import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  startPerformanceTracking,
  trackPageView,
} from "../../services/analytics";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function scheduleAfterFirstPaint(callback: () => void) {
  const idleWindow = window as IdleWindow;
  let idleHandle: number | undefined;
  const frameHandle = window.requestAnimationFrame(() => {
    idleHandle = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(callback, { timeout: 2000 })
      : window.setTimeout(callback, 250);
  });

  return () => {
    window.cancelAnimationFrame(frameHandle);
    if (idleHandle === undefined) return;
    if (idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idleHandle);
    else window.clearTimeout(idleHandle);
  };
}

export function AnalyticsTracker() {
  const location = useLocation();
  const initialPath = useRef(location.pathname);

  useEffect(
    () => scheduleAfterFirstPaint(() => void trackPageView(location.pathname)),
    [location.pathname],
  );

  useEffect(() => {
    let stopTracking: () => void = () => undefined;
    const cancelSchedule = scheduleAfterFirstPaint(() => {
      stopTracking = startPerformanceTracking(initialPath.current);
    });

    return () => {
      cancelSchedule();
      stopTracking();
    };
  }, []);

  return null;
}

