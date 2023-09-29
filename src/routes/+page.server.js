// @ts-nocheck
import { createReadStream } from "fs";
import { parse } from "csv-parse";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const obj1 = {
        dx: [],
        dy: [],
        vx: [],
        vy: []
    };
    const obj2 = {
        dx: [],
        dy: [],
        vx: [],
        vy: []
    };
    const obj3 = {
        dx: [],
        dy: [],
        vx: [],
        vy: []
    };
    const obj4 = {
        dx: [],
        dy: [],
        vx: [],
        vy: []
    };

    const carSpeed = [];
    const yaw = [];
    const time = [];

    const data = []

    createReadStream("src/lib/data.csv")
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', (r) => {
            data.push(r);
        })
        .on('end', () => {
            data.forEach(row => {
                obj1.dx.push(row[1] / 128);
                obj1.dy.push(row[2] / 128);
                obj2.dx.push(row[3] / 128);
                obj2.dy.push(row[4] / 128);
                obj3.dx.push(row[5] / 128);
                obj3.dy.push(row[6] / 128);
                obj4.dx.push(row[7] / 128);
                obj4.dy.push(row[8] / 128);

                carSpeed.push(row[9] / 256);

                obj1.vx.push(row[10] / 256);
                obj1.vy.push(row[11] / 256);
                obj2.vx.push(row[12] / 256);
                obj2.vy.push(row[13] / 256);
                obj3.vx.push(row[14] / 256);
                obj3.vy.push(row[15] / 256);
                obj4.vx.push(row[16] / 256);
                obj4.vy.push(row[17] / 256);

                yaw.push(row[17]);

                time.push(row[18]);
            });
        })


    return {obj1, obj2, obj3, obj4, carSpeed, yaw, time};
};


