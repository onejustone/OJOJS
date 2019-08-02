export * from "./dom/dom"; // export 和 import 的复合写法，整体导出 dom 模块

export * from "./energy";
import energy from "./energy";

export * from "./env";
import env from "./env";

export * from "./format/format";
import format from "./format/format";

export * from "./math/operator";
import operator from "./math/operator";

export * from "./other";
import other from "./other";

export * from "./shortcut";
import shortcut from "./shortcut";

// export * from "./time";
// import time from "./time";

export * from "./type";
import type from "./type";

export * from './prototype/mixins';
import mixins from "./prototype/mixins";

export default {
  energy,
  env,
  format,
  operator,
  other,
  shortcut,
  type,
  mixins: mixins,
};
