import React from "react";

export const useForceUpdate = () => React.useReducer(() => ({}), {})[1];
