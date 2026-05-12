<script lang="ts">
	import EditTodoForm from '../../../../components/EditTodoForm.svelte';
	let { data, form } = $props();
</script>

<div class="mx-auto max-w-md p-10">
	<EditTodoForm todo={data.todo} {form} />
</div>
