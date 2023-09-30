// @ts-nocheck
import csvParser from "csv-parser";
import axios from "axios";

import * as stores from '$lib/stores.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    let obj1 = {
        dx: [],
        dy: [],
        vx: [],
        vy: []
    };
    let obj2 = {
        dx: [],
        dy: [],
        vx: [],
        vy: []
    };
    let obj3 = {
        dx: [],
        dy: [],
        vx: [],
        vy: []
    };
    let obj4 = {
        dx: [],
        dy: [],
        vx: [],
        vy: []
    };

    let carSpeed = [];
    let yaw = [];
    let time = [];

    let data = [];

    // Replace with the raw GitHub CSV URL you want to fetch
    const githubCsvUrl = 'https://raw.githubusercontent.com/TkcsHnr/bosch/main/src/lib/data.csv';

    // Make an HTTP GET request to fetch the raw CSV data
    axios.get(githubCsvUrl, { responseType: 'stream' })
        .then((response) => {
            if (response.status === 200) {
                response.data
                    .pipe(csvParser())
                    .on('data', (r) => {
                        data.push(r);
                    })
                    .on('end', () => {
                        data.forEach(row => {
                            obj1.dx.push(parseFloat(row.FirstObjectDistance_X) / 128);
                            obj1.dy.push(parseFloat(row.FirstObjectDistance_Y) / 128);
                            obj2.dx.push(parseFloat(row.SecondObjectDistance_X) / 128);
                            obj2.dy.push(parseFloat(row.SecondObjectDistance_Y) / 128);
                            obj3.dx.push(parseFloat(row.ThirdObjectDistance_X) / 128);
                            obj3.dy.push(parseFloat(row.ThirdObjectDistance_Y) / 128);
                            obj4.dx.push(parseFloat(row.FourthObjectDistance_X) / 128);
                            obj4.dy.push(parseFloat(row.FourthObjectDistance_Y) / 128);

                            carSpeed.push(parseFloat(row.VehicleSpeed) / 256);

                            obj1.vx.push(parseFloat(row.FirstObjectSpeed_X) / 256);
                            obj1.vy.push(parseFloat(row.FirstObjectSpeed_Y) / 256);
                            obj2.vx.push(parseFloat(row.SecondObjectSpeed_X) / 256);
                            obj2.vy.push(parseFloat(row.SecondObjectSpeed_Y) / 256);
                            obj3.vx.push(parseFloat(row.ThirdObjectSpeed_X) / 256);
                            obj3.vy.push(parseFloat(row.ThirdObjectSpeed_Y) / 256);
                            obj4.vx.push(parseFloat(row.FourthObjectSpeed_X) / 256);
                            obj4.vy.push(parseFloat(row.FourthObjectSpeed_Y) / 256);

                            yaw.push(parseFloat(row.YawRate));

                            time.push(parseFloat(row.Timestamp));
                        });

                        stores.carSpeed.set(carSpeed[0]);
                        stores.yaw.set(yaw[0]);
                        stores.time.set(time[0]);
                        stores.obj1.set({
                            dx: obj1.dx[0],
                            dy: obj1.dy[0],
                            vx: obj1.vx[0],
                            vy: obj1.vy[0]
                        });
                        stores.obj2.set({
                            dx: obj2.dx[0],
                            dy: obj2.dy[0],
                            vx: obj1.vx[0],
                            vy: obj1.vy[0]
                        });
                        stores.obj3.set({
                            dx: obj3.dx[0],
                            dy: obj3.dy[0],
                            vx: obj1.vx[0],
                            vy: obj1.vy[0]
                        });
                        stores.obj4.set({
                            dx: obj4.dx[0],
                            dy: obj4.dy[0],
                            vx: obj1.vx[0],
                            vy: obj1.vy[0]
                        });
                    });
            } else {
                console.error('Failed to fetch CSV data from GitHub.');
            }
        })
        .catch((error) => {
            console.error('Error fetching CSV data:', error);
        });




    return { obj1, obj2, obj3, obj4, carSpeed, yaw, time };
};


