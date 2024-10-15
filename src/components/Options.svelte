<script lang="ts">
	import { onMount } from 'svelte';
	import RuleForm from './RuleForm.svelte';
	import { addNewRuleStore, showEditStore } from '../stores/controlsStore';
	import { remindersStore } from '../stores/remindersStore';
	import { isBetweeen } from '../lib/helpers';

	onMount(async () => {
		let storage = await browser.storage.local.get('reminders');

		if (!storage.reminders) {
			browser.storage.local.set({ reminders: [] });
			$addNewRuleStore = true;
		} else {
			$remindersStore = storage.reminders;
		}
	});

	$: $remindersStore, updateAlarms();

	const updateAlarms = async () => {
		let currentAlarms = await browser.alarms.getAll();

		for (let i = 0; i < $remindersStore.length; i++) {
			let r = $remindersStore[i];

			let alarm = `${i}-${r.title}-${r.message}`;
			let alarmIndex = currentAlarms.findIndex((a) => a.name === alarm);

			if (alarmIndex !== -1) {
				continue;
			} else {
				browser.alarms.create(alarm, { periodInMinutes: r.frequency });
			}
		}
	};
</script>

<main class="font-mono m-2">
	<section class="text-center mb-8">
		<h1 class="text-3xl">RecurAlert</h1>
		<h3 class="text-xs text-gray-600">Create recurring reminders so you don't forget to hydrate/stand/breath</h3>
	</section>

	{#each $remindersStore as reminder, index}
		<div class=" border-2 border-black rounded-sm mb-2">
			<div class="grid grid-cols-8">
				{#if !($showEditStore === index)}
					<div class="col-span-5 grid pl-2">
						<h2 class="text-lg">{reminder.title}</h2>
						<span class="flex indent-4">
							<p>Every {reminder.frequency} minutes</p>
						</span>
					</div>
					<div class="col-span-2 grid place-content-center">
						{#if isBetweeen(reminder.startTime, reminder.endTime) && reminder.days[new Date().getDay()]}
							<p class="text-green-700">Active</p>
						{:else}
							<p class="text-gray-500">Inactive</p>
						{/if}
					</div>
				{:else}
					<div class="col-span-7"></div>
				{/if}
				<button
					type="button"
					class="text-2xl grid place-content-center hover:scale-110 hover:cursor-pointer"
					class:rotate-180={$showEditStore === index}
					on:click={() => ($showEditStore = $showEditStore === index ? -1 : index)}>
					v
				</button>
			</div>
			{#if $showEditStore === index}
				<div class="m-4">
					<RuleForm id={index} />
				</div>
			{/if}
		</div>
	{/each}
	{#if ($addNewRuleStore || $remindersStore.length === 0) && $showEditStore === -1}
		<section class="grid place-content-center">
			<RuleForm id="new" />
		</section>
	{:else}
		<div class="grid place-content-center">
			<button
				class="text-teal-900 bg-teal-200 hover:bg-teal-400 border-2 border-teal-300 rounded-sm text-xl px-1"
				type="button"
				on:click={() => {
					$showEditStore = -1;
					$addNewRuleStore = true;
				}}>New</button>
		</div>
	{/if}
</main>
