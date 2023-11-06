import "./css/style.css";
import Zapp from "./elements/Zapp";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

new Zapp({ canvas });
