import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name, params = {}) {
  console.log("Navigate to", name);
  console.log("ref", navigationRef);

  navigationRef.current?.navigate(name, params);
}
