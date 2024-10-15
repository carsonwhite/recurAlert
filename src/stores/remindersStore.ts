import { writable } from "svelte/store";
import type { Rule } from "../lib/types";

export let remindersStore = writable(<Rule[]>[]);