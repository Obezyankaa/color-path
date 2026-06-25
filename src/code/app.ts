import { Application, Assets, TextureSource } from "pixi.js";
import { Platform } from "../entities/Platform";
import { Ball } from "../entities/Ball";
import { AssetLoader } from "./assetLoader";

TextureSource.defaultOptions.scaleMode = "linear";

export async function createApp() {
  const app = new Application();

  async function setup() {
    await app.init({
      resizeTo: window,
      background: "#ffffff",
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    document.body.appendChild(app.canvas);
  }

(async () => {
  await setup();
  await new AssetLoader().preload();

  const texture = Assets.get("blue_platform");
  const platform = new Platform(texture);
  platform.x = app.screen.width / 2;
  platform.y = app.screen.height / 2;
  app.stage.addChild(platform);

  const ball = new Ball(Assets.get("blue_ball"));
  ball.x = platform.x;
  app.stage.addChild(ball);
  ball.land(platform.topY);

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (ball.isOnGround) ball.jump();
    }
  });

  app.ticker.add((ticker) => {
    ball.update(ticker.deltaTime);
    ball.updateShadow(platform.topY);

    // Ball lands on platform
    if (!ball.isOnGround && ball.isFalling && ball.bottomY >= platform.topY) {
      ball.land(platform.topY);
      platform.bounce();
    }
  });
})();

  return app;
}
