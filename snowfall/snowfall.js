const randomTop = () => Math.round(Math.random() * -100);
const randomLeft = () => Math.round(Math.random() * 100);
const randomSize = () => Math.round(Math.random() * 3);
const randomTime = (low, high) =>
  Math.round(Math.random() * low + (high - low));

const createSnowsStyles = (length) => {
  const body = `body {
  height: 100vh;
  width: 100%;
  background-image: url("https://cdn.wallpapersafari.com/97/62/0DMAbc.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}`;
  const animation = `@keyframes snowFall {
  from {
    top: var(--start-top);
    left: var(--start-left);
  }
  to {
    top: 100%;
    left: calc(var(--start-left) + 20%);
  }
}`;
  const snows = [body];
  for (let i = 0; i < length; i++) {
    const size = randomSize();
    const snowStyle = `#snow-${i} {
  --start-top: ${randomTop()}%;
  --start-left: ${randomLeft() - 10}%;
  position: absolute;
  top: var(--start-top);
  left: var(--start-left);
  height: ${size}px;
  width: ${size}px;
  background-color: rgb(251, 245, 245);
  border-radius: 50%;
  animation: snowFall ${randomTime(15, 30)}s linear infinite;
}`;
    snows.push(snowStyle);
  }

  snows.push(animation);
  return snows.join("\n");
};

const createSnowsHtml = (length, path) => {
  const top = `<!doctype html>
<html lang="en">
  <head>
    <title>Document</title>
    <link rel="stylesheet" href="${path}.css" />
  </head>
  <body>`;
  const bottom = `</body>
</html>`;
  const snows = [top];
  for (let i = 0; i < length; i++) {
    const snow = `    <div id="snow-${i}"></div>`;
    snows.push(snow);
  }
  snows.push(bottom);
  return snows.join("\n");
};

const craetePage = async (path, length) => {
  const snowsStyles = createSnowsStyles(length);
  const snowsHtml = createSnowsHtml(length, path);
  await Deno.writeTextFile(`${path}.css`, snowsStyles);
  await Deno.writeTextFile(`${path}.html`, snowsHtml);
};

craetePage("snowfall", 1500);
