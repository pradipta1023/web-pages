import { drawLine, drawWithPencil, drawRect } from "/drawing_tools.js";

export const getCanvasCoordinates = (event, canvas) => {
  const canvasPosition = canvas.getBoundingClientRect();
  return {
    x: event.clientX - canvasPosition.left,
    y: event.clientY - canvasPosition.top,
  };
};

export const startDrawing = (context, event, canvas, drawingTool, color) => {
  context.lineWidth = drawingTool.lineWidth;
  if (drawingTool.name === "eraser") {
    context.globalCompositeOperation = "destination-out";
  } else {
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = color;
  }
  context.beginPath();
  const { x, y } = getCanvasCoordinates(event, canvas);

  drawingTool.name === "line"
    ? context.moveTo(x, y)
    : ([drawingTool.startX, drawingTool.startY] = [x, y]);

  return drawingTool;
};

export const draw = (canvas, toDraw, tool, context, event) => {
  const { x, y } = getCanvasCoordinates(event, canvas);

  if (toDraw) {
    canvas.style.background = `radial-gradient(circle ${tool.lineWidth}px at ${x}px ${y}px, orange 20%, transparent 5%)`;
  }

  if (["pencil", "eraser"].includes(tool.name)) {
    drawWithPencil(context, x, y, toDraw);
  }
};

export const endDrawing = (event, context, drawingTool, canvas) => {
  if (drawingTool.name === "line") {
    const { x, y } = getCanvasCoordinates(event, canvas);
    drawLine(context, x, y);
  }
  if (drawingTool.name === "rectangle") {
    const { startX: x, startY: y } = drawingTool;
    const endCoordinates = getCanvasCoordinates(event, canvas);
    drawRect(context, { x, y }, endCoordinates);
  }
};
