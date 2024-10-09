<script lang="ts">
	import { onMount } from 'svelte';
	import RuleForm from './RuleForm.svelte';
	import { addNewRuleStore } from '../stores/controlsStore';
	import { remindersStore } from '../stores/remindersStore';

	let showEdit: number = -1;

	// TODO: don't need this here and in RuleForm component
	onMount(async () => {
		let storage = await browser.storage.local.get('reminders');

		if (!storage.reminders) {
			browser.storage.local.set({ reminders: [] });
			$addNewRuleStore = true;
		} else {
			$remindersStore = storage.reminders;
		}
	});
</script>

<main class="font-mono m-2">
	<section class="text-center mb-8">
		<h1 class="text-3xl">RecurAlert</h1>
		<h3 class="text-xs text-gray-600">Create recurring reminders so you don't forget to hydrate/stand/breath</h3>
	</section>

	{#each $remindersStore as reminder, index}
		<div class=" border-2 border-black rounded-sm mb-2">
			<div class="grid grid-cols-8">
				<div class="col-span-7 grid pl-2">
					<h2 class="text-lg">{reminder.title}</h2>
					<span class="flex indent-4">
						<p class="truncate">{reminder.message}</p>
						<p>{reminder.frequency}</p>
					</span>
				</div>
				<div
					class="text-2xl grid place-content-center hover:scale-110 hover:cursor-pointer"
					class:rotate-180={showEdit === index}
					on:click={() => (showEdit = showEdit === index ? -1 : index)}>
					v
				</div>
			</div>
			{#if showEdit === index}
				<div class="m-4">
					<RuleForm id={index} />
				</div>
			{/if}
		</div>
	{/each}
	{#if ($addNewRuleStore || $remindersStore.length === 0) && showEdit === -1}
		<section class="grid place-content-center">
			<RuleForm id="new" />
		</section>
	{:else}
		<div class="grid place-content-center">
			<button
				class="text-teal-900 bg-teal-200 hover:bg-teal-400 border-2 border-teal-300 rounded-sm text-xl px-1"
				type="button"
				on:click={() => {
					showEdit = -1;
					$addNewRuleStore = true;
				}}>New</button>
		</div>
	{/if}
</main>
