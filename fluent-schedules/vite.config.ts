// @ts-expect-error
import peggyLoader from "vite-plugin-peggy-loader";
import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    plugins: [peggyLoader()],
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
