import { Application, Assets, TextureSource } from "pixi.js";
import { Platform } from "../entities/Platform";
import { Ball } from "../entities/Ball";
import { AssetLoader } from "./assetLoader";
import { PlatformField } from "../world/PlatformField";

TextureSource.defaultOptions.scaleMode = "linear";

export async function createApp() {
  const app = new Application();

  async function setup() {
    await app.init({
      resizeTo: window,
      background: "#000000",
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    document.body.appendChild(app.canvas);
  }

(async () => {
  await setup();
  await new AssetLoader().preload();

  const ballSlot = {
    x: app.screen.width / 2,
    y: app.screen.height * 0.6,
  };

  const field = new PlatformField(app.stage, ballSlot);

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      field.advance();
    }
  });
})();

  return app;
}
