export function getRotatedBoundingClientRect(
  element: HTMLElement,
  angle: number
) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const corners = [
    { x: rect.left - centerX, y: rect.top - centerY },
    { x: rect.right - centerX, y: rect.top - centerY },
    { x: rect.right - centerX, y: rect.bottom - centerY },
    { x: rect.left - centerX, y: rect.bottom - centerY },
  ];

  const rotatedCorners = corners.map(({ x, y }) => ({
    x: x * cos - y * sin + centerX,
    y: x * sin + y * cos + centerY,
  }));

  let minX = rotatedCorners[0].x;
  let maxX = rotatedCorners[0].x;
  let minY = rotatedCorners[0].y;
  let maxY = rotatedCorners[0].y;

  for (const corner of rotatedCorners) {
    minX = Math.min(minX, corner.x);
    maxX = Math.max(maxX, corner.x);
    minY = Math.min(minY, corner.y);
    maxY = Math.max(maxY, corner.y);
  }

  return {
    left: minX,
    top: minY,
    right: maxX,
    bottom: maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
