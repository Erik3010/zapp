import { Scale } from "../types";

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const map = (value: number, oldScale: Scale, newScale: Scale) => {
  return (
    ((value - oldScale.start) / (oldScale.stop - oldScale.start)) *
    (newScale.stop - newScale.start + newScale.start)
  );
};

export const clamp = (value: number, min: number, max: number) => Math.max(Math.min(value, max), min)
