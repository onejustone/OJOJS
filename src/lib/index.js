export * from "./dom"; // export 和 import 的复合写法，整体导出 dom 模块
import dom from "./dom";

export default {
  ...dom
}
