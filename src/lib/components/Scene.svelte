<script>
	// @ts-nocheck
	export let data;

	import { T, useFrame } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import { relevantIndex, frame, playing, playRate } from '$lib/stores.js';

	import * as Predictor from './predictor';
	import Car from '$lib/components/models/Car.svelte';
	import Capsule from './models/Capsule.svelte';
	import * as stores from '$lib/stores.js';

	import { calculate } from './breakdistance';
	import { get } from 'svelte/store';

	let futureCar = [];
	let objectFutures = [];

	let relevantPosition = [0, 1.5, 0];

	let count = 0;
	useFrame(() => {
		if ($playing) {
			if (count >= 5 - $playRate) {
				if ($frame >= data.time.length - 1) {
					stores.playing.set(false);
				}

				stores.carSpeed.set(data.carSpeed[$frame]);
				stores.yaw.set(data.yaw[$frame]);
				stores.time.set(data.time[$frame]);
				stores.obj1.set({
					dx: data.obj1.dx[$frame],
					dy: data.obj1.dy[$frame],
					vx: data.obj1.vx[$frame],
					vy: data.obj1.vy[$frame]
				});
				stores.obj2.set({
					dx: data.obj2.dx[$frame],
					dy: data.obj2.dy[$frame],
					vx: data.obj1.vx[$frame],
					vy: data.obj1.vy[$frame]
				});
				stores.obj3.set({
					dx: data.obj3.dx[$frame],
					dy: data.obj3.dy[$frame],
					vx: data.obj1.vx[$frame],
					vy: data.obj1.vy[$frame]
				});
				stores.obj4.set({
					dx: data.obj4.dx[$frame],
					dy: data.obj4.dy[$frame],
					vx: data.obj1.vx[$frame],
					vy: data.obj1.vy[$frame]
				});

				if ($frame > 0) {
					let dv = data.carSpeed[$frame] - data.carSpeed[$frame - 1];
					let dt = data.time[$frame] - data.time[$frame - 1];
					stores.aEgo.set(dv / dt);
				}

				if (!get(stores.detected)) {
					stores.breakDistance.set(calculate().distance);
					stores.breakTime.set(calculate().time);
				}

				let prediction = Predictor.predict();
				futureCar = prediction.futureCar;
				objectFutures = prediction.objectFutures;
				if ($relevantIndex != -1) {
					let objects = [data.obj1, data.obj2, data.obj3, data.obj4];
					relevantPosition[0] = objects[$relevantIndex].dx[$frame];
					relevantPosition[2] = objects[$relevantIndex].dy[$frame];
				}

				stores.frame.set($frame + 1);
				count = 0;
			}
			count++;
		}
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[-10, 10, -5]}
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

<T.Mesh position={[0, 0, 0]} rotation.x={-Math.PI / 2}>
	<T.PlaneGeometry args={[0.1, 2]} />
	<T.MeshBasicMaterial color="white" />
</T.Mesh>
<Car position={[-2, 0, 0]} scale={0.08} rotation.y={Math.PI} />

{#each futureCar as point}
	<T.Mesh position={[point[0], 0, point[1]]} rotation.x={-Math.PI / 2}>
		<T.CircleGeometry args={[0.3, 9]} />
		<T.MeshBasicMaterial color="blue" />
	</T.Mesh>
{/each}

{#if $relevantIndex != -1}
	<Capsule position={relevantPosition} scale={0.5} rotation.x={Math.PI / 2} />

	{#each objectFutures[$relevantIndex] as point}
		<T.Mesh position={[point[0], 0, point[1]]} rotation.x={-Math.PI / 2}>
			<T.CircleGeometry args={[0.3, 9]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
	{/each}
{/if}
