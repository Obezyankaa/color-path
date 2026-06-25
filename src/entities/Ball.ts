import { Assets, Container, Sprite, Texture } from "pixi.js";

export class Ball extends Container {
  private sprite: Sprite;
  private shadow: Sprite;
  private vy = 0;
  private readonly gravity = 0.8;
  private readonly jumpForce = -18;
  isOnGround = false;

  constructor(texture: Texture) {
    super();

    // Shadow — added first so it renders below the ball
    this.shadow = new Sprite(Assets.get("shadow_blue_ball"));
    this.shadow.anchor.set(0.5, -0.2 );
    this.shadow.scale.set(0.3);
    this.addChild(this.shadow);

    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5 , 0.1);
    this.sprite.scale.set(0.3);
    this.addChild(this.sprite);
  }

  get bottomY(): number {
    return this.y + this.sprite.height / 2;
  }

  get halfHeight(): number {
    return this.sprite.height / 2;
  }

  get isFalling(): boolean {
    return this.vy > 0;
  }

  jump() {
    this.vy = this.jumpForce;
    this.isOnGround = false;
  }

  land(groundY: number) {
    this.y = groundY - this.halfHeight;
    this.vy = 0;
    this.isOnGround = true;
  }

  // groundY — world y of the platform top surface
  updateShadow(groundY: number) {
    // Offset shadow so it stays at groundY in world space
    this.shadow.y = groundY - this.y;

    // Shadow shrinks as ball moves higher
    const dist = Math.max(0, groundY - this.y);
    const scale = Math.max(0.1, 0.3 * (1 - dist / 400));
    this.shadow.scale.set(scale);
    this.shadow.alpha = scale / 0.3;
  }

  update(delta: number) {
    if (this.isOnGround) return;
    this.vy += this.gravity * delta;
    this.y += this.vy * delta;
  }
}
