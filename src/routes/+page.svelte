<script lang="ts">
	import type { ActionData } from './$types';
	import CreateTodoForm from '../components/CreateTodoForm.svelte';
	let { form }: { form: ActionData } = $props();
</script>

<main class="mx-auto max-w-md p-10"><CreateTodoForm {form} /></main>
