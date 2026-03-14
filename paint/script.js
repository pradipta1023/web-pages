import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  init,
  setColor,
  setTool,
} from "./handlers.js";

const initElements = () => ({
  options: document.querySelector(".options-box"),
  colorOptions: document.querySelector(".color-options"),
  canvas: document.querySelector("canvas"),
});

window.onload = () => {
  const { options, colorOptions, canvas } = initElements();

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  let { color, drawingTool: tool, toDraw, snapshot } = init();

  canvas.style.cursor = "url('pencil-cursor.svg') -24 24, crosshair";

  colorOptions.addEventListener(
    "click",
    ({ target }) => (color = setColor(target, color)),
  );

  options.addEventListener("click", ({ target }) => {
    tool = setTool(target, tool);
    canvas.style.cursor = tool.cursor || canvas.style.cursor;
  });

  canvas.addEventListener("mousedown", (event) => {
    [toDraw, snapshot, tool] = handleMouseDown(event, ctx, tool, canvas, color);
  });

  canvas.addEventListener("mousemove", (event) => {
    handleMouseMove(canvas, toDraw, tool, ctx, event, snapshot);
  });

  canvas.addEventListener("mouseup", (event) => {
    [toDraw, snapshot] = handleMouseUp(event, ctx, tool, canvas, snapshot);
  });
};
