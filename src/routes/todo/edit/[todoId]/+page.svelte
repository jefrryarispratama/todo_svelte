<script>
	import { page } from '$app/state';
	const todoId = $derived(page.params.todoId);
</script>

<a href="/todos">Kembali</a>
<p>
	{todoId}
</p>
