export * from "./dom"; // export 和 import 的复合写法，整体导出 dom 模块
import dom from "./dom";

export * from "./energy";
import energy from "./energy";

export * from "./env";
import env from "./env";

export * from "./format";
import format from "./format";

export * from "./operator";
import operator from "./operator";

export * from "./other";
import other from "./other";

export * from "./shortcut";
import shortcut from "./shortcut";

export * from "./time";
import time from "./time";

export * from "./type";
import type from "./type";

export default {
  ...dom,
  ...energy,
  ...env,
  ...format,
  ...operator,
  ...other,
  ...shortcut,
  ...time,
  ...type,
};
