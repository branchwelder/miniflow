export default function audioDestination() {
  let ctx;
  return {
    displayName: "AudioDestination",
    inputConfig: {
      node: { type: "AudioNode" },
    },
    init({ inputs, state }, context) {
      ctx = context.audio;
    },
    updated({ inputs }) {
      inputs.node.connect(ctx.destination);
      return {};
    },
  };
}
