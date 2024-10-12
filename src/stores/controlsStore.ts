import { writable } from "svelte/store";

export let addNewRuleStore = writable(false);

export let showEditStore = writable(-1);