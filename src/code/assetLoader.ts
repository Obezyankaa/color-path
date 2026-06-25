import { Assets } from "pixi.js";

export class AssetLoader {
    constructor() {
      this.preload()
  }

  preload() {
      const assets = [
        { alias: "platform_shadow", src: "src/assets/platform_shadow.png" },
        { alias: "shadow_blue_ball", src: "src/assets/shadow_blue_ball.png" },
        { alias: "blue_platform", src: "src/assets/platform_blue.png" },
        { alias: "blue_ball", src: "src/assets/ball_blue.png" },
        { alias: "purple", src: "src/assets/platform_purple.png" },
      ];
    return Assets.load(assets);
  }
}
