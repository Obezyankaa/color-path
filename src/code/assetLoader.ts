import { Assets } from "pixi.js";

export class AssetLoader {
  constructor() {
    this.preload();
  }

  preload() {
    const assets = [
      { alias: "shadow_platform", src: "src/assets/shadow_platform.png" },
      { alias: "shadow_blue_ball", src: "src/assets/shadow_blue_ball.png" },
      { alias: "shadow_purple_ball", src: "src/assets/shadow_purple_ball.png" },
      { alias: "shadow_yellow_ball", src: "src/assets/shadow_yellow_ball.png" },
      { alias: "shadow_orange_ball", src: "src/assets/shadow_orange_ball.png" },

      { alias: "blue_ball", src: "src/assets/ball_blue.png" },
      { alias: "red_ball", src: "src/assets/ball_red.png" },
      { alias: "yellow_ball", src: "src/assets/ball_yellow.png" },
      { alias: "purple_ball", src: "src/assets/ball_purple.png" },
      { alias: "orange_ball", src: "src/assets/ball_orange.png" },
      { alias: "light_orange_ball", src: "src/assets/ball_light_orange.png" },
      { alias: "green_ball", src: "src/assets/ball_green.png" },

      { alias: "platform_blue", src: "src/assets/platform_blue.png" },
      { alias: "platform_red", src: "src/assets/platform_red.png" },
      { alias: "platform_yellow", src: "src/assets/platform_yellow.png" },
      { alias: "platform_orange", src: "src/assets/platform_orange.png" },
      {
        alias: "platform_light_orange",
        src: "src/assets/platform_light_orange.png",
      },
      { alias: "platform_green", src: "src/assets/platform_green.png" },
      { alias: "platform_purple", src: "src/assets/platform_purple.png" },
    ];
    return Assets.load(assets);
  }
}
