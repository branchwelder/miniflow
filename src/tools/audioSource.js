import { html, render } from "lit-html";

export default function audioSource() {
  const ctx = new AudioContext();
  const source = ctx.createMediaStreamSource(stream);

  return {
    displayName: "AudioContext",

    outputConfig: {
      source: { type: "AudioContext" },
    },

    updated({ state }) {
      return { source: source };
    },
  };
}
