export const drawLine = (context, start, end, snapshot) => {
  context.putImageData(snapshot, 0, 0);
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
};

export const drawWithPencil = (context, x, y, toDraw) => {
  if (!toDraw) return;
  context.lineTo(x, y);
  context.stroke();
};

export const drawRect = (context, start, end, snapshot) => {
  context.putImageData(snapshot, 0, 0);
  const height = end.y - start.y;
  const width = end.x - start.x;
  context.strokeRect(start.x, start.y, width, height);
};
