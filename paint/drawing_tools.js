export const drawLine = (context, offsetX, offsetY) => {
  context.lineTo(offsetX, offsetY);
  context.stroke();
  context.closePath();
};

export const drawWithPencil = (context, x, y, toDraw) => {
  if (!toDraw) return;
  context.lineTo(x, y);
  context.stroke();
};

export const drawRect = (context, { x, y }, endCoordinates) => {
  const height = endCoordinates.y - y;
  const width = endCoordinates.x - x;

  context.strokeRect(x, y, width, height);
};
