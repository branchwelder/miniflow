# mini flow

### tool definition

```js

{
  displayName: "Hello World", // The name shown in the toolbar
  inputConfig: {
    exampleInput: {
      type: "Number",
      change(tool, newValue, lastValue) {
        // Runs whenever this input value changes
        console.log(newValue);
      },
    },
  },
  outputConfig: {
    exampleOutput: { type: "Boolean" },
  },
  stateConfig: {
    exampleState: {
      value: "Hello World", // Initial value for the state
      type: "String",
      change(tool, newValue, lastValue) {
          // Runs whenever this state value changes
        console.log(newValue);
      },
    },
  },
  setup(tool) {
    // Runs when the tool is added to the toolchain, before the dom is connected
  },
  connected(tool) {
    // Runs after the tool dom is connected
  },
  teardown(tool) {
    // Runs when the tool is removed from the toolchain
  },
  render(tool) {
    // Runs as part of the main render cycle
  },
  saveState(state) {
    // Save state to JSON
    return Object.fromEntries(
      Object.entries(state).map(([key, val]) => [key, val])
    );
  }
};

```
