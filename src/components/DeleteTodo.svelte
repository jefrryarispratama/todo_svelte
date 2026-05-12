<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';

	let { todoId, action } = $props();
</script>

<form
	method="POST"
	{action}
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				toast.error(
					(result.data?.error as string) || (result.data?.message as string) || 'Gagal menghapus'
				);
			} else if (result.type === 'success') {
				toast.success('Todo berhasil dihapus! ✨');
			}
			update();
		};
	}}
>
	<input type="hidden" name="todoId" value={todoId} />
	<Button type="submit" variant="destructive">Hapus</Button>
</form>
