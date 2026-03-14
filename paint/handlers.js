import {
  draw,
  endDrawing,
  startDrawing,
  getCanvasCoordinates,
} from "/drawing.js";

export const handleMouseUp = (event, ctx, tool, canvas, snapshot) => {
  const { x, y } = getCanvasCoordinates(event, canvas);
  canvas.style.background = `radial-gradient(circle ${tool.lineWidth}px at ${x}px ${y}px, transparent 20%, transparent 5%)`;
  endDrawing(event, ctx, tool, canvas, snapshot);
  return [false, null];
};

export const handleMouseDown = (event, ctx, tool, canvas, color) => {
  tool = startDrawing(ctx, event, canvas, tool, color);
  const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return [true, snapshot, tool];
};

export const handleMouseMove = (canvas, toDraw, tool, ctx, event, snapshot) =>
  draw(canvas, toDraw, tool, ctx, event, snapshot);

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

  circle: { name: "circle", lineWidth: 3, cursor: "crosshair" },
};

const validTools = ["pencil", "line", "eraser", "rectangle", "circle"];
const validColors = ["red", "black", "green", "blue", "yellow"];

export const setTool = (target, drawingTool) =>
  validTools.includes(target.id) ? tools[target.id] : drawingTool;

export const setColor = (target, colorSelected) => {
  const color = validColors.includes(target.id) ? target.id : colorSelected;

  if (colorSelected !== target.id) {
    [...target.parentNode.children].forEach((child) =>
      child.classList.remove("selected"),
    );
    target.classList.add("selected");
  }
  return color;
};

export const init = () => ({
  color: "black",
  drawingTool: tools.pencil,
  toDraw: false,
  snapshot: null,
});
