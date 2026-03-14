export const drawLinePreview = (context, tool, { x, y }, snapshot) => {
  context.putImageData(snapshot, 0, 0);
  context.beginPath();
  context.moveTo(tool.startX, tool.startY);
  context.lineTo(x, y);
  context.stroke();
};

export const drawRectPreview = (context, tool, { x, y }, snapshot) => {
  context.putImageData(snapshot, 0, 0);
  const width = x - tool.startX;
  const height = y - tool.startY;
  context.lineWidth = tool.lineWidth;

  context.strokeRect(tool.startX, tool.startY, width, height);
};
