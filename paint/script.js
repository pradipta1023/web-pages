import {
  draw,
  endDrawing,
  startDrawing,
  getCanvasCoordinates,
} from "/drawing.js";

const tools = {
  pencil: {
    name: "pencil",
    lineWidth: 2,
    cursor: `url('pencil-cursor.svg') -24 24, crosshair`,
  },

  line: { name: "line", lineWidth: 3, cursor: "crosshair" },

  eraser: {
    name: "eraser",
    lineWidth: 40,
    cursor: `url('eraser-cursor.svg') -24 24, crosshair`,
  },

  rectangle: { name: "rectangle", lineWidth: 3, cursor: "crosshair" },
};

const validTools = ["pencil", "line", "eraser", "rectangle"];
const validColors = ["red", "black", "green", "blue", "yellow"];

const setTool = (target, drawingTool) =>
  validTools.includes(target.id) ? tools[target.id] : drawingTool;

const setColor = (target, colorSelected) =>
  validColors.includes(target.id) ? target.id : colorSelected;

const init = () => ({
  color: "black",
  drawingTool: tools.pencil,
  toDraw: false,
  snapshot: null,
});

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
    draw(canvas, toDraw, tool, ctx, event, snapshot);
  });

  canvas.addEventListener("mouseup", (event) => {
    [toDraw, snapshot] = handleMouseUp(event, ctx, tool, canvas, snapshot);
  });
};

const handleMouseUp = (event, ctx, tool, canvas, snapshot) => {
  const { x, y } = getCanvasCoordinates(event, canvas);
  canvas.style.background = `radial-gradient(circle ${tool.lineWidth}px at ${x}px ${y}px, transparent 20%, transparent 5%)`;
  endDrawing(event, ctx, tool, canvas, snapshot);
  return [false, null];
};

const handleMouseDown = (event, ctx, tool, canvas, color) => {
  tool = startDrawing(ctx, event, canvas, tool, color);
  const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return [true, snapshot, tool];
};
