export default function mediaStreamSource() {
  return {
    displayName: "Media Stream Source",
    outputConfig: {
      node: { type: "AudioNode" },
    },
    inputConfig: {
      mediaStream: {
        type: "MediaStream",
        change({ outputs, global }, current) {
          if (current) {
            outputs.node = global.audioContext.createMediaStreamSource(current);
          }
        },
      },
    },
    teardown({ outputs }) {
      outputs.node.disconnect();
    },
  };
}
