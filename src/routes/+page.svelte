<script lang="ts">
	import type { ActionData } from './$types';
	import TodoForm from '../components/TodoForm.svelte';
	let { form }: { form: ActionData } = $props();
</script>

<main class="mx-auto max-w-md p-10"><TodoForm {form} /></main>
