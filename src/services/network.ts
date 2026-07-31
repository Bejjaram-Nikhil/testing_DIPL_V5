type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
};

export function shouldConserveData(navigatorValue: Navigator = navigator) {
  const candidate = navigatorValue as NavigatorWithConnection;
  const connection = candidate.connection ?? candidate.mozConnection ?? candidate.webkitConnection;
  const effectiveType = connection?.effectiveType?.toLowerCase();

  return connection?.saveData === true || effectiveType === "slow-2g" || effectiveType === "2g";
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

