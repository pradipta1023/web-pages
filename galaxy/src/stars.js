const starsCss = (length) => {
  const pOfStars = [];
  for (let i = 400; i < length; i++) {
    const star = `#star-${i} {
  position: fixed;
  top: ${random(0, 100)}%;
  left: ${random(0, 100)}%;
}`;
    pOfStars.push(star);
  }

  return pOfStars.join("\n\n");
};

const random = (low, high) => Math.floor(low + (Math.random() * (high - low)));

console.log(starsCss(500));

const starsHtml = (length) => {
  const stars = ["⋆", "✦", "✧", "⭑", "★", "☆", "✩", "✬"];
  const paras = [];
  for (let i = 400; i < length; i++) {
    paras.push(`<p id="star-${i}">${stars[random(0, stars.length)]}</p>`);
  }
  return paras.join("\n");
};

// console.log(starsHtml(500));
