// src/world/PlatformField.ts
import { Container, Assets } from "pixi.js";
import gsap from "gsap";
import { Platform } from "../entities/Platform";

const PLATFORM_COLORS = [
  "blue",
  "red",
  "yellow",
  "purple",
  "orange",
  "light_orange",
  "green",
];

interface PathPoint {
  x: number;
  y: number;
  color: string;
}

interface PoolEntry {
  platform: Platform;
  pathIndex: number;
}

export class PlatformField {
  private pool: PoolEntry[] = [];
  private pathCache = new Map<number, PathPoint>();
  private currentIndex = 0;
  private origin: PathPoint;

  private readonly spacing = 220; // расстояние между платформами по Y
  private readonly xRange = 80; // разброс по X между соседними точками
  private readonly poolSize = 6;

  constructor(
    private stage: Container,
    private ballSlot: { x: number; y: number },
  ) {
    this.pathCache.set(0, { x: 0, y: 0, color: PLATFORM_COLORS[0] });
    this.origin = { ...this.getPathPoint(0) };

    for (let i = 0; i < this.poolSize; i++) {
      const point = this.getPathPoint(i);
      const platform = new Platform(Assets.get(`platform_${point.color}`));
      this.stage.addChild(platform);
      this.pool.push({ platform, pathIndex: i });
    }

    this.layout();
  }

  // Лениво генерирует точку пути по индексу, кэширует результат
  private getPathPoint(index: number): PathPoint {
    let point = this.pathCache.get(index);
    if (point) return point;

    const prev = this.getPathPoint(index - 1);
    const color = this.randomColor(prev.color);
    point = {
      x: prev.x + (Math.random() * 2 - 1) * this.xRange,
      y: prev.y - this.spacing,
      color,
    };
    this.pathCache.set(index, point);
    return point;
  }

  private randomColor(exclude: string): string {
    const pool = PLATFORM_COLORS.filter((c) => c !== exclude);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // Пересчитывает экранные координаты всех платформ из их мировых точек
  private layout() {
    for (const entry of this.pool) {
      const point = this.getPathPoint(entry.pathIndex);
      entry.platform.x = this.ballSlot.x + (point.x - this.origin.x);
      entry.platform.y = this.ballSlot.y + (point.y - this.origin.y);
    }
  }

  // ВРЕМЕННО публичный метод для теста — позже вызывается из логики приземления мяча
  advance() {
    const to = this.getPathPoint(this.currentIndex + 1);

    gsap.to(this.origin, {
      x: to.x,
      y: to.y,
      duration: 0.5,
      ease: "power1.inOut",
      onUpdate: () => this.layout(),
      onComplete: () => {
        this.currentIndex++;
        this.recyclePassedPlatforms();
      },
    });
  }

  // Платформы, оставшиеся далеко позади мяча, переставляются вперёд по пути
  private recyclePassedPlatforms() {
    const behindThreshold = this.currentIndex - 1;
    const maxIndex = Math.max(...this.pool.map((e) => e.pathIndex));

    for (const entry of this.pool) {
      if (entry.pathIndex < behindThreshold) {
        const newIndex = maxIndex + 1;
        const point = this.getPathPoint(newIndex);
        entry.platform.setTexture(Assets.get(`platform_${point.color}`));
        entry.pathIndex = newIndex;
      }
    }

    this.layout();
  }
}
