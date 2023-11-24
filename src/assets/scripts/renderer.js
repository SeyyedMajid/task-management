document.querySelector("h1").onclick = (event) => {
  event.preventDefault();
  window.electron.function("param");
};
