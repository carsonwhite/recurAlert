<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { addNewRuleStore } from '../stores/controlsStore';
	import { remindersStore } from '../stores/remindersStore';

	export let id: string | number = 'new';

	let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	let newRule = {
		title: '',
		message: '',
		frequency: 30,
		days: [1, 1, 1, 1, 1, 1, 1],
		startTime: '00:00',
		endTime: '23:59',
	};
	// TODO: custom type for rule
	let rule = newRule;

	onMount(async () => {
		if (id === 'new') {
			rule = newRule;
		} else {
			rule = $remindersStore[+id];
		}
	});

	onDestroy(() => {
		if (id === 'new') {
			$addNewRuleStore = false;
		}
	});

	const updateRule = () => {
		$remindersStore.push(rule);
		browser.storage.local.set({ reminders: $remindersStore });
	};

	const updateNewRuleDay = (day: number) => {
		rule.days[day] = rule.days[day] === 0 ? 1 : 0;
		rule = { ...rule };
	};
	const deleteRule = () => {
		$remindersStore.splice(+id, 1);
		browser.storage.local.set({ reminders: $remindersStore });
	};
</script>

<form on:submit|preventDefault={updateRule} class="border-2 border-black rounded-sm p-1">
	<div class="grid grid-cols-2">
		<label for="title">Title:</label>
		<input type="text" id="title" name="title" placeholder="Title" required bind:value={rule.title} />
	</div>
	<div class="grid grid-cols-2">
		<label for="message">Message:</label>
		<input type="text" id="message" name="message" placeholder="Message" bind:value={rule.message} />
	</div>
	<div class="grid grid-cols-2">
		<label for="frequency">Frequency (mins):</label>
		<input type="number" id="frequency" name="frequency" placeholder="15" required bind:value={rule.frequency} />
	</div>
	<div class="grid grid-cols-2 mb-[2px]">
		<label for="days">Active Days:</label>
		<div class="grid grid-cols-7 border-black border p-1" id="days">
			{#each days as day, i}
				<span class="day-select" on:click={() => updateNewRuleDay(i)} class:day-selected={rule.days[i] !== 0}>{day}</span>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-2">
		<label for="startTime">Start Time:</label>
		<input class="" type="time" name="startTime" required bind:value={rule.startTime} />
		<label for="endTime">End Time:</label>
		<input class="" type="time" name="endTime" required bind:value={rule.endTime} />
	</div>
	<div class="grid" class:grid-cols-2={id !== 'new'}>
		<div class="grid place-content-center" class:hidden={id === 'new'}>
			<button type="button" on:click={deleteRule} class="text-red-900 bg-red-200 hover:bg-red-400 border-2 border-red-300 rounded-sm text-xl px-1 mt-2">
				Delete
			</button>
		</div>
		<div class="grid place-content-center">
			<button type="submit" class="text-green-900 bg-green-200 hover:bg-green-400 border-2 border-green-300 rounded-sm text-xl px-1 mt-2">
				{#if $addNewRuleStore || $remindersStore.length === 0}
					Add
				{:else}
					Update
				{/if}
			</button>
		</div>
	</div>
</form>

<style>
	input {
		border: 1px solid black;
		margin-bottom: 2px;
		padding-left: 2px;
	}

	.day-selected {
		background-color: rgb(169, 218, 169);
	}
	.day-select {
		border: 1px solid white;
		display: grid;
		place-content: center;
		cursor: pointer;
	}
</style>
