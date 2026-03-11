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

window.onload = () => {
  const options = document.querySelector(".options-box");
  const colorOptions = document.querySelector(".color-options");

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  let colorSelected = "black";
  canvas.style.cursor = "url('pencil-cursor.svg') -24 24, crosshair";
  let drawingTool = {
    name: "pencil",
    width: 2,
    cursor: `url('pencil-cursor.svg') -24 24, crosshair`,
  };
  let toDraw = false;

  colorOptions.addEventListener(
    "click",
    ({ target }) => (colorSelected = setColor(target, colorSelected)),
  );

  options.addEventListener("click", ({ target }) => {
    drawingTool = setTool(target, drawingTool);
    canvas.style.cursor = drawingTool.cursor || canvas.style.cursor;
  });

  canvas.addEventListener("mousedown", (event) => {
    toDraw = true;
    drawingTool = startDrawing(ctx, event, canvas, drawingTool, colorSelected);
  });

  canvas.addEventListener("mousemove", (event) => {
    draw(canvas, toDraw, drawingTool, ctx, event);
  });

  canvas.addEventListener("mouseup", (event) => {
    toDraw = false;
    const { x, y } = getCanvasCoordinates(event, canvas);
    canvas.style.background = `radial-gradient(circle ${drawingTool.lineWidth}px at ${x}px ${y}px, transparent 20%, transparent 5%)`;
    endDrawing(event, ctx, drawingTool, canvas);
  });
};
