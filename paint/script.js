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
  if (drawingTool.name === "eraser") {
    context.globalCompositeOperation = "destination-out";
  } else {
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = drawingTool.strokeStyle;
  }
  context.beginPath();
  const { currentX, currentY } = getCanvasCoordinates(event, canvas);
  context.moveTo(currentX, currentY);
};

const tools = {
  pencil: { name: "pencil", lineWidth: 2 },
  line: { name: "line", lineWidth: 3 },
  eraser: { name: "eraser", lineWidth: 40 },
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
      ? `radial-gradient(circle ${drawingTool.lineWidth}px at ${currentX}px ${currentY}px, orange 20%, transparent 5%)`
      : "";
    if (["pencil", "eraser"].includes(drawingTool.name)) {
      drawWithPencil(context, currentX, currentY, toDraw);
    }
  });

  canvas.addEventListener("mouseup", (event) => {
    toDraw = false;
    if (drawingTool.name === "line") {
      const {currentX, currentY} = getCanvasCoordinates(event, canvas);
      drawLine(context, currentX, currentY);
    }
  });
};
