// @ts-nocheck
import * as stores from "$lib/stores";
import { get } from "svelte/store";
import { Vector2 } from "three";
import { honk } from "./horn";

import { breakTime } from "$lib/stores";

let dt = .1;

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function predict() {
    //predict car
    let steps = parseInt(2.5*get(breakTime)/dt);

    let carSteps = [];
    let futureCar = [];
    let carSpeed = get(stores.carSpeed);
    let x = 0;
    let y = 0;
    if (get(stores.yaw) == 0) {
        for (let i = 0; i < steps; i++) {
            let dx = carSpeed * dt;
            x += dx;

            futureCar.push([x, y]);
            carSteps.push([dx, 0]);
        }
    } else {
        let yaw = get(stores.yaw);
        let dAngle = yaw * dt;
        let angle = Math.PI / 2;
        for (let i = 0; i < steps; i++) {
            angle -= dAngle;
            let dx = carSpeed * dt * Math.sin(angle);
            let dy = carSpeed * dt * Math.cos(angle);
            x += dx;
            y += dy;

            futureCar.push([x, y]);
            carSteps.push([dx, dy]);
        }
    }

    let objects = [get(stores.obj1), get(stores.obj2), get(stores.obj3), get(stores.obj4)];

    //predict objects
    let objectFutures = [];

    objects.forEach(obj => {
        let objectFuture = [];
        let ox = obj.dx;
        let oy = obj.dy;
        for (let i = 0; i < steps; i++) {
            ox += obj.vx * dt;
            ox += carSteps[i][0];
            oy += obj.vy * dt;
            oy += carSteps[i][1];

            objectFuture.push([ox, oy]);
        }
        objectFutures.push(objectFuture);
    })

    //compare
    for (let i = 0; i < 4; i++) {
        if (objects[i].dx != 0 && objects[i].dy != 0) {
            futureCar.forEach(car => {
                objectFutures[i].forEach(obj => {
                    let d = distance(obj[0], obj[1], car[0], car[1]);
                    if (d < .25) {
                        honk();
                        stores.relevantIndex.set(i);

                        let vAngle = new Vector2(carSpeed, 0).angleTo(new Vector2(objects[i].vx), objects[i].vy);

                        if(Math.abs(get(stores.yaw)) > 0.05) {
                            //turning
                            stores.collisionType.set("CPTA");
                        }
                        else if((vAngle > 3 && vAngle < 3.3) || (vAngle < 0.2 || vAngle > 6.1)) {
                            //longitudal
                            stores.collisionType.set("CPLA");
                        } else {
                            //cross
                            stores.collisionType.set("CPNCO");
                        }

                        return { futureCar, objectFutures }
                    }
                })
            });
        }

    }

    return { futureCar, objectFutures }
}