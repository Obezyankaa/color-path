import { Container, Sprite, Texture, Assets } from "pixi.js";
import gsap from "gsap";

export class Platform extends Container {
  private sprite: Sprite;
  private shadow: Sprite;
  private baseScale = 0.4;

  constructor(texture: Texture) {
    super();

    // Тень — нижний слой, добавляем первой
    const shadowTexture = Assets.get("platform_shadow");
    this.shadow = new Sprite(shadowTexture);
    this.shadow.anchor.set(0.6, 0.3);
    this.shadow.scale.set(this.baseScale);
    this.addChild(this.shadow);

    // Сама платформа — верхний слой
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(this.baseScale);
    this.addChild(this.sprite);
  }

  get topY(): number {
    return this.y - this.sprite.height / 2;
  }

  bounce() {
    gsap.killTweensOf(this.sprite.scale);
    gsap.killTweensOf(this.shadow.scale);

    const tl = gsap.timeline();

    tl.to(this.sprite.scale, {
        x: this.baseScale * 1.25,
        y: this.baseScale * 0.6,
        duration: 0.08,
        ease: "power2.out",
      })
      .to(this.sprite.scale, {
        x: this.baseScale,
        y: this.baseScale,
        duration: 0.4,
        ease: "elastic.out(1, 0.35)",
      });

    // Shadow follows sprite x scale
    tl.to(this.shadow.scale, {
        x: this.baseScale * 1.25,
        duration: 0.08,
        ease: "power2.out",
      }, 0)
      .to(this.shadow.scale, {
        x: this.baseScale,
        duration: 0.4,
        ease: "elastic.out(1, 0.35)",
      }, 0.08);
  }
}
