const drawLine = (context, offsetX, offsetY) => {
  context.lineTo(offsetX, offsetY);
  context.stroke();
  context.closePath();
};

const drawWithPencil = (context, x, y, toDraw) => {
  if (!toDraw) return;
  context.lineTo(x, y);
  context.stroke();
};

const getCanvasCoordinates = (event, canvas) => {
  const canvasPosition = canvas.getBoundingClientRect();
  return {
    currentX: event.clientX - canvasPosition.left,
    currentY: event.clientY - canvasPosition.top,
  };
};

const startDrawing = (context, event, canvas, drawingTool) => {
  context.lineWidth = drawingTool.lineWidth;
  context.strokeStyle = drawingTool.strokeStyle;
  context.beginPath();
  const { currentX, currentY } = getCanvasCoordinates(event, canvas);
  context.moveTo(currentX, currentY);
};

const tools = {
  pencil: { name: "pencil", lineWidth: 2, strokeStyle: "black" },
  line: { name: "line", lineWidth: 3, strokeStyle: "black" },
  eraser: { name: "eraser", lineWidth: 40, strokeStyle: "white" },
};

const validTools = ["pencil", "line", "eraser"];

const setTool = (target, drawingTool) =>
  validTools.includes(target.id) ? tools[target.id] : drawingTool;

window.onload = () => {
  const canvas = document.querySelector("canvas");
  const options = document.querySelector(".options-box");
  const context = canvas.getContext("2d");
  let drawingTool = { name: "pencil", width: 2 };
  let toDraw = false;

  options.addEventListener(
    "click",
    ({ target }) => drawingTool = setTool(target, drawingTool),
  );

  canvas.addEventListener("mousedown", (event) => {
    toDraw = true;
    startDrawing(context, event, canvas, drawingTool);
  });

  canvas.addEventListener("mousemove", (event) => {
    const { currentX, currentY } = getCanvasCoordinates(event, canvas);

    canvas.style.background = toDraw
      ? `radial-gradient(circle 30px at ${currentX}px ${currentY}px, orange 20%, transparent 5%)`
      : "";
    if (["pencil", "eraser"].includes(drawingTool.name)) {
      drawWithPencil(context, currentX, currentY, toDraw);
    }
  });

  canvas.addEventListener("mouseup", (event) => {
    toDraw = false;
    if (drawingTool.name === "line") {
      drawLine(context, event.clientX, event.clientY);
    }
  });
};
