import { ToolchainGraph } from "./toolchain/ToolchainGraph";

const SNAPSHOT_FIELDS = ["toolchain", "pan", "scale", "layout"];
const SNAPSHOT_INTERVAL = 1000;
const MAX_SNAPSHOTS = 30;

let GLOBAL_STATE = {
  title: "toolchain",
  toolchain: new ToolchainGraph(),
  toolbox: import.meta.glob("./tools/**/*.js", { import: "default" }),
  danglingPipe: null,
  layout: {},
  pan: { x: 0, y: 0 },
  scale: 1,
  lastSnapshot: 0,
  transforming: false,
  snapshots: [],
  selectBox: { start: null, end: null },
  heldKeys: new Set(),
};

function shouldSnapshot(action) {
  if (!(GLOBAL_STATE.lastSnapshot < Date.now() - SNAPSHOT_INTERVAL))
    return false;

  for (const field of SNAPSHOT_FIELDS) {
    if (field in action) return true;
  }

  return false;
}

function snapshotUpdate(action) {
  GLOBAL_STATE = {
    ...GLOBAL_STATE,
    ...action,
    snapshots: [
      Object.fromEntries(
        SNAPSHOT_FIELDS.map((field) => [field, GLOBAL_STATE[field]])
      ),
      ...GLOBAL_STATE.snapshots,
    ],
    lastSnapshot: Date.now(),
  };

  return GLOBAL_STATE;
}

function normalUpdate(action) {
  GLOBAL_STATE = { ...GLOBAL_STATE, ...action };
  return GLOBAL_STATE;
}

function updateState(action) {
  return shouldSnapshot(action) ? snapshotUpdate(action) : normalUpdate(action);
}

function undo() {
  if (GLOBAL_STATE.snapshots.length < 1) return;
  const changes = Object.keys(GLOBAL_STATE.snapshots[0]);

  GLOBAL_STATE = {
    ...GLOBAL_STATE,
    ...GLOBAL_STATE.snapshots[0],
    lastSnapshot: 0,
    snapshots: GLOBAL_STATE.snapshots.slice(1),
  };

  StateObserver.notify(changes);
}

async function dispatch(action) {
  const changes = Object.keys(action);

  return new Promise((resolve) => {
    updateState(action);
    StateObserver.notify(changes);
    resolve(changes);
  });
}

const StateObserver = (() => {
  const stateFields = Object.fromEntries(
    Object.keys(GLOBAL_STATE).map((field) => [field, new Set()])
  );

  function notify(changedFields) {
    changedFields.forEach((field) => stateFields[field].forEach((cb) => cb()));
  }

  function subscribe(field, ...cbs) {
    cbs.forEach((cb) => stateFields[field].add(cb));
  }

  function unsubscribe(field, ...cbs) {
    cbs.forEach((cb) => stateFields[field].delete(cb));
  }

  return {
    subscribe,
    notify,
    unsubscribe,
  };
})();

export { GLOBAL_STATE, undo, dispatch, StateObserver };
