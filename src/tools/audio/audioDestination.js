export default function audioDestination() {
  return {
    displayName: "AudioDestination",
    inputConfig: {
      node: {
        type: "AudioNode",
        change({ global }, current, last) {
          if (last) last.disconnect(global.audioContext.destination);
          if (current) current.connect(global.audioContext.destination);
        },
      },
    },
  };
}
