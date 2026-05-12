<!-- src/components/Pagination.svelte -->
<script lang="ts">
	// Import buttonVariants dihapus karena tidak digunakan

	let { currentPage, totalPages } = $props<{
		currentPage: number;
		totalPages: number;
	}>();

	let pages = $derived(Array.from({ length: totalPages }, (_, i) => i + 1));
</script>

<div class="mt-6 flex items-center gap-1">
	{#if currentPage > 1}
		<a
			href="?page={currentPage - 1}"
			class="rounded-none border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
		>
			Prev
		</a>
	{:else}
		<span
			class="cursor-not-allowed rounded-none border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400"
		>
			Prev
		</span>
	{/if}

	{#each pages as p (p)}
		<a
			href="?page={p}"
			class="rounded-none border px-4 py-2 text-sm font-medium transition-colors
                   {currentPage === p
				? 'border-black bg-black text-white'
				: 'border-gray-200 bg-white text-black hover:bg-gray-50'}"
		>
			{p}
		</a>
	{/each}

	{#if currentPage < totalPages}
		<a
			href="?page={currentPage + 1}"
			class="rounded-none border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
		>
			Next
		</a>
	{:else}
		<span
			class="cursor-not-allowed rounded-none border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400"
		>
			Next
		</span>
	{/if}
</div>
