import { Application, Assets } from "pixi.js";
import { initAssets } from "./assets";
import Config from "./Config";
import { game } from "./Game";

/** The PixiJS app Application instance, shared across the project */
export const app = new Application();

globalThis.__PIXI_APP__ = app;

/** Set up a resize function for the app */
function resize() {
  const { designConfig } = Config;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const minWidth = designConfig.content.width;
  const minHeight = designConfig.content.height;

  // Calculate renderer and canvas sizes based on current dimensions
  const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
  const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
  const scale = scaleX > scaleY ? scaleX : scaleY;
  const width = windowWidth * scale;
  const height = windowHeight * scale;

  // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
  app.renderer.canvas.style.width = `${windowWidth}px`;
  app.renderer.canvas.style.height = `${windowHeight}px`;
  window.scrollTo(0, 0);

  // Update renderer  and navigation screens dimensions
  app.renderer.resize(width, height);
  game.resize(width, height);
}

/** Setup app and initialise assets */
async function init() {
  // Initialize the app
  await app.init({
    resolution: Math.max(window.devicePixelRatio, 2),
    backgroundColor: 0x000000,
  });

  // Add pixi canvas element (app.view) to the document's body
  document.body.appendChild(app.canvas);

  // Whenever the window resizes, call the 'resize' function
  window.addEventListener("resize", resize);

  // Trigger the first resize
  resize();

  // Setup assets bundles (see assets.ts) and start up loading everything in background
  await initAssets();

  game.init(Config.game, app.stage);
  game.startGameLoop(app.ticker);
}

// Init everything
init();
