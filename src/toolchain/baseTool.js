export default {
  displayName: "Tool",
  inputConfig: {},
  stateConfig: {},
  outputConfig: {},
  saveState: (state) => {
    return Object.fromEntries(
      Object.entries(state).map(([key, val]) => {
        return [key, val];
      })
    );
  },
};
