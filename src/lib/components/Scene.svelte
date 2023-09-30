<script>
	// @ts-nocheck

	import { T, useFrame } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import { playRate, relevantIndex, frame } from '$lib/stores.js';

	import * as Predictor from './predictor';

	export let data;

	import * as stores from '$lib/stores.js';
	import { get } from 'svelte/store';

	let futureCar = [];
	let objectFutures = [];

	let relevantPosition = [0, 0, 0];

	let count = 0;
	useFrame((state, delta) => {
		if (get(stores.playing)) {
			if (count >= 5 - $playRate) {
				if (get(stores.frame) >= data.time.length - 1) {
					stores.playing.set(false);
				}

				stores.carSpeed.set(data.carSpeed[get(stores.frame)]);
				stores.yaw.set(data.yaw[get(stores.frame)]);
				stores.time.set(data.time[get(stores.frame)]);
				stores.obj1.set({
					dx: data.obj1.dx[get(stores.frame)],
					dy: data.obj1.dy[get(stores.frame)],
					vx: data.obj1.vx[get(stores.frame)],
					vy: data.obj1.vy[get(stores.frame)]
				});
				stores.obj2.set({
					dx: data.obj2.dx[get(stores.frame)],
					dy: data.obj2.dy[get(stores.frame)],
					vx: data.obj1.vx[get(stores.frame)],
					vy: data.obj1.vy[get(stores.frame)]
				});
				stores.obj3.set({
					dx: data.obj3.dx[get(stores.frame)],
					dy: data.obj3.dy[get(stores.frame)],
					vx: data.obj1.vx[get(stores.frame)],
					vy: data.obj1.vy[get(stores.frame)]
				});
				stores.obj4.set({
					dx: data.obj4.dx[get(stores.frame)],
					dy: data.obj4.dy[get(stores.frame)],
					vx: data.obj1.vx[get(stores.frame)],
					vy: data.obj1.vy[get(stores.frame)]
				});

				let prediction = Predictor.predict();
				futureCar = prediction.futureCar;
				objectFutures = prediction.objectFutures;
				if ($relevantIndex != -1) {
					let objects = [data.obj1, data.obj2, data.obj3, data.obj4];
					relevantPosition[0] = objects[get(stores.relevantIndex)].dx[get(stores.frame)];
					relevantPosition[2] = objects[get(stores.relevantIndex)].dy[get(stores.frame)];
				}

				stores.frame.set(get(stores.frame) + 1);
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
	<!-- <OrbitControls enableDamping /> -->
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<Grid infiniteGrid position.y={0} cellSize={1} sectionThickness={0} fadeDistance={200} />


<T.Mesh position={[-1, 0, 0]} rotation.x={-Math.PI / 2}>
	<T.CircleGeometry args={[1, 12]} />
	<T.MeshBasicMaterial color="white" />
</T.Mesh>

{#each futureCar as point}
	<T.Mesh position={[point[0], 0, point[1]]} rotation.x={-Math.PI / 2}>
		<T.CircleGeometry args={[0.3, 9]} />
		<T.MeshBasicMaterial color="blue" />
	</T.Mesh>
{/each}

{#if $relevantIndex != -1}
	<T.Mesh position={relevantPosition} rotation.x={-Math.PI / 2}>
		<T.CircleGeometry args={[0.6, 12]} />
		<T.MeshBasicMaterial color="red" />
	</T.Mesh>

	{#each objectFutures[$relevantIndex] as point}
		<T.Mesh position={[point[0], 0, point[1]]} rotation.x={-Math.PI / 2}>
			<T.CircleGeometry args={[0.3, 9]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
	{/each}
{/if}
