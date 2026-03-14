import { drawLine, drawWithPencil, drawRect } from "/drawing_tools.js";
import { drawLinePreview, drawRectPreview } from "./preview.js";

export const getCanvasCoordinates = (event, canvas) => {
  const canvasPosition = canvas.getBoundingClientRect();
  return {
    x: event.clientX - canvasPosition.left,
    y: event.clientY - canvasPosition.top,
  };
};

export const startDrawing = (context, event, canvas, tool, color) => {
  context.lineWidth = tool.lineWidth;

  context.globalCompositeOperation =
    tool.name === "eraser" ? "destination-out" : "source-over";

  context.strokeStyle = color;

  context.beginPath();
  const { x, y } = getCanvasCoordinates(event, canvas);
  [tool.startX, tool.startY] = [x, y];

  return tool;
};

const previewTools = {
  rectangle: drawRectPreview,
  line: drawLinePreview,
};

export const draw = (canvas, toDraw, tool, context, event, snapshot) => {
  const { x, y } = getCanvasCoordinates(event, canvas);

  if (toDraw) {
    canvas.style.background = `radial-gradient(circle ${tool.lineWidth}px at ${x}px ${y}px, orange 20%, transparent 5%)`;
  }

  if (["pencil", "eraser"].includes(tool.name)) {
    drawWithPencil(context, x, y, toDraw);
  }

  if (snapshot) {
    previewTools[tool.name]?.(context, tool, { x, y }, snapshot);
  }
};

const drawingTools = {
  line: drawLine,
  rectangle: drawRect,
};

export const endDrawing = (event, context, tool, canvas, snapshot) => {
  const { startX: x, startY: y } = tool;
  const end = getCanvasCoordinates(event, canvas);

  drawingTools[tool.name]?.(context, { x, y }, end, snapshot);
};
