export default function extractWaveform() {
  return {
    displayName: "Extract Waveform",
    outputConfig: {
      numberArray: { type: "Number[]" },
    },
    extract({ outputs, inputs }) {
      if (!inputs.audioBuffer) {
        outputs.numberArray = undefined;
        return;
      }
      const rawData = inputs.audioBuffer.getChannelData(0); // We only need to work with one channel of data
      const samples = inputs.numSamples ?? 70; // Number of samples we want to have in our final data set
      const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
      const filteredData = [];
      for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i; // the location of the first sample in the block
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
        }
        filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
      }

      const multiplier = Math.pow(Math.max(...filteredData), -1);
      outputs.numberArray = filteredData.map((n) => n * multiplier);
    },
    inputConfig: {
      audioBuffer: {
        type: "AudioBuffer",
        change(tool, audioBuffer) {
          tool.extract(tool);
        },
      },
      numSamples: {
        type: "Number",
        change(tool) {
          tool.extract(tool);
        },
      },
    },
  };
}
