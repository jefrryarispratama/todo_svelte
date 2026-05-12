<script lang="ts">
	import { page } from '$app/state';
	import EditTodoForm from '../../../../components/EditTodoForm.svelte';
	let { form } = $props();
	const todoId = $derived(page.params.todoId);
</script>

<div class="mx-auto max-w-md p-10">
	<EditTodoForm {todoId} {form} />
</div>
