import { writable } from "svelte/store";

export const playRate = writable(3);

export const carSpeed = writable(0);
export const yaw = writable(0);
export const time = writable(0);

export const obj1 = writable({});
export const obj2 = writable({});
export const obj3 = writable({});
export const obj4 = writable({});

export const relevantIndex = writable(-1);
export const collisionType = writable("-");

export const playing = writable(false);

export const frame = writable(0);