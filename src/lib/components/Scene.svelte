<script>
	// @ts-nocheck

	import { T, useFrame } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import * as Three from 'three';

	useFrame((state, delta) => {});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[20, 10, 0]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
    fov={75}
    far={200}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<Grid
    infiniteGrid
    position.y={0}
	cellSize={1}
	sectionThickness={0}
	fadeDistance={200}
/>

<T.Mesh position={[0, 0, -5]} rotation.x={-Math.PI/2}>
	<T.PlaneGeometry args={[10,6]} />
	<T.MeshBasicMaterial color="blue" />
</T.Mesh>

<T.Mesh position={[0, 0.1, 0]} rotation.x={-Math.PI/2}>
	<T.PlaneGeometry args={[400,.25]} />
	<T.MeshBasicMaterial color="white" />
</T.Mesh>