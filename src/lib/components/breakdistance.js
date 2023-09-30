import { carSpeed, aEgo as a} from "$lib/stores";
import { get } from "svelte/store";


//100ms
const tlat = 0.1;
//m/s^3
const maxJerk = -30;
//m/s^2
const aMax = -9;


export function calculate() {
    let vEgo = get(carSpeed);
    let aEgo = get(a);

    let d1 = vEgo*tlat + aEgo/2*(tlat*tlat);
    let t2 = (aMax - aEgo)/maxJerk;
    let d2 = maxJerk/6*(t2*t2*t2) + aEgo/2*(t2*t2) + vEgo*t2;
    let dv1 = maxJerk/2*(t2*t2) + aEgo * t2;
    let v1 = vEgo + dv1;
    let dv2 = -v1;
    let t3 = dv2/aMax;
    let d3 = aMax/2*(t3*t3) + v1*t3;

    let distance = d1 + d2 + d3;
    let time = tlat + t2 + t3;

    return {distance, time};
}