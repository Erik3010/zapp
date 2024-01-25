import "./css/style.css";
import Zapp from "./elements/Zapp";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const setCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
window.addEventListener("resize", setCanvasSize);
setCanvasSize();

new Zapp({ canvas });
