<script>
	// @ts-nocheck
	export let data;

	import App from '$lib/components/App.svelte';
	import Pause from '$lib/components/Pause.svelte';
	import Play from '$lib/components/Play.svelte';
	import Again from '$lib/components/Again.svelte';

	import {
		playRate,
		relevantIndex,
		collisionType,
		playing,
		frame,
		carSpeed,
		obj1,
		obj2,
		obj3,
		obj4,
		time,
		breakDistance,
		collisionDistance,
		breakTime,
		aEgo,
		detected,
		canStop
	} from '$lib/stores.js';
	import { get } from 'svelte/store';

	function handleStart() {
		if (get(frame) >= data.time.length - 1 && !$playing) {
			relevantIndex.set(-1);
			collisionType.set('-');
			frame.set(0);
			collisionDistance.set(0);
			breakDistance.set(0);
			breakTime.set(0);
			aEgo.set(0);
			detected.set(false);
			canStop.set(false);
		}
		playing.set(!get(playing));
	}
</script>

<div class="w-full h-full flex">
	<div class="grow">
		<App {data} />
	</div>
	<div
		class="grow w-[22rem] p-4 bg-base-200 flex flex-col gap-2 h-full overflow-auto border-base-300 border-l shadow-xl"
	>
		<div class="stats stats-vertical shadow">
			<div class="stat">
				<div class="stat-title">Timestamp:</div>
				<div class="stat-value text-lg font-bold">{$time}s</div>
			</div>
			<div class="stat">
				<div class="stat-title">Ego speed:</div>
				<div class="stat-value text-lg font-bold">{$carSpeed}m/s</div>
			</div>
			<div class="stat">
				<div class="stat-title">Break distance:</div>
				<div class="stat-value text-lg font-bold">{Math.max(0, $breakDistance)}m</div>
			</div>
			{#if $collisionDistance > 0}
				<div class="stat">
					<div class="stat-title">Distance to collision:</div>
					<div class="stat-value text-lg font-bold">{$collisionDistance}m</div>
				</div>
			{/if}
			{#if $collisionType != '-'}
				<div class="stat">
					<div class="stat-title">Collision type:</div>
					<div class="stat-value text-lg font-bold flex">
						{$collisionType}
					</div>
				</div>
			{/if}
			{#if $detected}
				<div class="stat {$canStop ? "text-success" : "text-error"}">
					<div class="stat-title">Avoiding collision:</div>
					<div class="stat-value text-lg font-bold flex">
						{$canStop ? 'Successful' : 'Unsuccessful'}
					</div>
				</div>
			{/if}
			{#if $relevantIndex != -1}
				<div class="stat">
					<div class="stat-title">Object longitudial distance:</div>
					<div class="stat-value text-lg font-bold flex">
						{[$obj1, $obj2, $obj3, $obj4][$relevantIndex].dx}m
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Object lateral distance:</div>
					<div class="stat-value text-lg font-bold flex">
						{[$obj1, $obj2, $obj3, $obj4][$relevantIndex].dy}m
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Object speed (relative):</div>
					<div class="stat-value text-lg font-bold flex">
						{Math.sqrt(
							Math.pow([$obj1, $obj2, $obj3, $obj4][$relevantIndex].vx, 2) +
								Math.pow([$obj1, $obj2, $obj3, $obj4][$relevantIndex].vy, 2)
						)}m/s
					</div>
				</div>
			{/if}
		</div>

		<div class="grow" />

		<div class="flex items-center gap-2">
			<button type="button" class="btn btn-square btn-neutral" on:click={handleStart}>
				{#if $playing}
					<Pause />
				{:else if $frame == data.time.length}
					<Again />
				{:else}
					<Play />
				{/if}
			</button>
			<progress class="progress w-full" value={$frame} min={0} max={data.time.length} />
		</div>

		<p>Simulation speed: {(1 / (5 - $playRate)).toFixed(2)}x</p>
		<input type="range" min="1" max="4" bind:value={$playRate} class="range" step="1" />
		<div class="w-full flex justify-between text-xs px-2">
			<span>|</span>
			<span>|</span>
			<span>|</span>
			<span>|</span>
		</div>
	</div>
</div>

<style>
	div.stat-value {
		overflow: hidden;
	}
</style>
