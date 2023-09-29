<script>
	// @ts-nocheck

	import App from '$lib/components/App.svelte';

	import { carSpeed, yaw, obj1, obj2, obj3, obj4 } from '$lib/stores.js';

	export let data;
</script>

<div class="w-full h-full flex">
	<div class="grow">
		<App {data} />
	</div>
	<div class="grow p-4 bg-base-200 flex flex-col gap-2 h-full overflow-auto">
		<div class="stats shadow">
			<div class="stat">
				<div class="stat-title">Ego speed:</div>
				<div class="stat-value font-bold text-lg">{$carSpeed.toFixed(2)} m/s</div>
			</div>

			<div class="stat">
				<div class="stat-title">Ego yaw:</div>
				<div class="stat-value font-bold text-lg">{$yaw}</div>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<div class="collapse collapse-arrow bg-base-100">
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">Object 1</div>
				<div class="collapse-content flex flex-col">
                    <p>Relative x-distance: <span>{$obj1.dx.toFixed(1)} m</span></p>
                    <p>Relative y-distance: <span>{$obj1.dy.toFixed(1)} m</span></p>
                    <p>Speed: <span>{$obj1.speed.toFixed(1)} m/s</span></p>
                </div>
			</div>
			<div class="collapse collapse-arrow bg-base-100">
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">Object 2</div>
				<div class="collapse-content flex flex-col">
                    <p>Relative x-distance: <span>{$obj2.dx.toFixed(1)} m</span></p>
                    <p>Relative y-distance: <span>{$obj2.dy.toFixed(1)} m</span></p>
                    <p>Speed: <span>{$obj2.speed.toFixed(1)} m/s</span></p>
                </div>
			</div>
			<div class="collapse collapse-arrow bg-base-100">
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">Object 3</div>
				<div class="collapse-content flex flex-col">
                    <p>Relative x-distance: <span>{$obj3.dx.toFixed(1)} m</span></p>
                    <p>Relative y-distance: <span>{$obj3.dy.toFixed(1)} m</span></p>
                    <p>Speed: <span>{$obj3.speed.toFixed(1)} m/s</span></p>
                </div>
			</div>
			<div class="collapse collapse-arrow bg-base-100">
				<input type="checkbox" />
				<div class="collapse-title text-xl font-medium">Object 4</div>
				<div class="collapse-content flex flex-col">
                    <p>Relative x-distance: <span>{$obj4.dx.toFixed(1)} m</span></p>
                    <p>Relative y-distance: <span>{$obj4.dy.toFixed(1)} m</span></p>
                    <p>Speed: <span>{$obj4.speed.toFixed(1)} m/s</span></p>
                </div>
			</div>
		</div>
	</div>
</div>
