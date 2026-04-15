// @ts-expect-error
import peggyPlugin from "vite-plugin-peggy-loader";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [peggyPlugin()],
});
