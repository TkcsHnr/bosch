<script>
	// @ts-nocheck

	import { T, useFrame } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import * as Three from 'three';

	export let data;

	import Car from './models/Car.svelte';
	import Truck from './models/Truck.svelte';

    import * as stores from '$lib/stores.js';

	let position1 = [0, 0, 0];
	let position2 = [0, 0, 0];
	let position3 = [0, 0, 0];
	let position4 = [0, 0, 0];

	let frame = 0;
	let everyother = 2;
	let count = 0;
	useFrame((state, delta) => {
		if (count == everyother) {
			if (frame >= data.time.length) {
				frame = 0;
			}

            stores.carSpeed.set(data.carSpeed[frame]);
            stores.yaw.set(data.yaw[frame]);
            stores.time.set(data.time[frame]);

            stores.obj1.set({
                dx: data.obj1.dx[frame],
                dy: data.obj1.dy[frame],
                speed: Math.sqrt(Math.pow(data.obj1.vx[frame], 2) + Math.pow(data.obj1.vy[frame], 2))
            });
            stores.obj2.set({
                dx: data.obj2.dx[frame],
                dy: data.obj2.dy[frame],
                speed: Math.sqrt(Math.pow(data.obj2.vx[frame], 2) + Math.pow(data.obj2.vy[frame], 2))
            });
            stores.obj3.set({
                dx: data.obj3.dx[frame],
                dy: data.obj3.dy[frame],
                speed: Math.sqrt(Math.pow(data.obj3.vx[frame], 2) + Math.pow(data.obj3.vy[frame], 2))
            });
            stores.obj4.set({
                dx: data.obj4.dx[frame],
                dy: data.obj4.dy[frame],
                speed: Math.sqrt(Math.pow(data.obj4.vx[frame], 2) + Math.pow(data.obj4.vy[frame], 2))
            });

			position1[0] = data.obj1.dx[frame];
			position1[2] = data.obj1.dy[frame];

			position2[0] = data.obj2.dx[frame];
			position2[2] = data.obj2.dy[frame];

			position3[0] = data.obj3.dx[frame];
			position3[2] = data.obj3.dy[frame];

			position4[0] = data.obj4.dx[frame];
			position4[2] = data.obj4.dy[frame];

			frame++;
            count = 0;
		}
        count++;
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[-20, 10, 0]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
	fov={75}
	far={200}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<Grid infiniteGrid position.y={0} cellSize={1} sectionThickness={0} fadeDistance={200} />

<!-- <T.Mesh position={[0, 0, 0]} rotation.x={-Math.PI / 2}>
	<T.PlaneGeometry args={[10, 6]} />
	<T.MeshBasicMaterial color="blue" />
</T.Mesh> -->
<Car position={[0, 0, 0]} scale={0.2} rotation.y={Math.PI} />

<T.Mesh position={position1} rotation.x={-Math.PI / 2}>
	<T.PlaneGeometry args={[4, 4]} />
	<T.MeshBasicMaterial color="red" />
</T.Mesh>
<T.Mesh position={position2} rotation.x={-Math.PI / 2}>
	<T.PlaneGeometry args={[4, 4]} />
	<T.MeshBasicMaterial color="green" />
</T.Mesh>
<T.Mesh position={position3} rotation.x={-Math.PI / 2}>
	<T.PlaneGeometry args={[4, 4]} />
	<T.MeshBasicMaterial color="white" />
</T.Mesh>
<T.Mesh position={position4} rotation.x={-Math.PI / 2}>
	<T.PlaneGeometry args={[4, 4]} />
	<T.MeshBasicMaterial color="yellow" />
</T.Mesh>

<!-- felezovonal -->
<T.Mesh position={[0, 0.1, 0]} rotation.x={-Math.PI / 2}>
	<T.PlaneGeometry args={[400, 0.25]} />
	<T.MeshBasicMaterial color="white" />
</T.Mesh>
