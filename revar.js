// rgb2hex: https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
// const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

// If user has a stylesheet applied, follow what they have
(function(){
  const root = document.documentElement;
  const body = document.body;
  const row  = document.querySelector(".row");
  const h1   = document.querySelector("h1");
  const p    = document.querySelector("p");
  const darker = getComputedStyle(body).backgroundColor;
  //const darker = "red";
  root.style.setProperty("--color-darker", darker);
  //alert(darker);
})();