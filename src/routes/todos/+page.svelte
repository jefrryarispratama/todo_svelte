<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';

	let { data } = $props();
</script>

<main class="mx-auto max-w-md p-6">
	<a href="/" class={`${buttonVariants({ variant: 'outline' })} mb-6 inline-block`}> Kembali </a>

	<h1 class="mb-6 text-2xl font-bold tracking-tight">✨ My Todo</h1>

	{#if data.todos.length === 0}
		<Card class="border-dashed">
			<CardContent class="flex flex-col items-center justify-center gap-2 p-10 text-gray-500">
				<span class="text-3xl">📝</span>
				<p>Belum ada todo</p>
			</CardContent>
		</Card>
	{:else}
		<div class="space-y-4">
			{#each data.todos as todo (todo.id)}
				<Card
					class="group relative overflow-hidden rounded-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
				>
					<!-- accent bar -->
					<div
						class="absolute top-0 left-0 h-full w-1 bg-primary opacity-60 group-hover:opacity-100"
					></div>

					<CardHeader class="flex flex-row items-start justify-between gap-3">
						<div class="space-y-1">
							<CardTitle class="text-base leading-tight">
								{todo.title}
							</CardTitle>

							<CardDescription class="text-sm">
								{todo.description}
							</CardDescription>
						</div>

						<input type="checkbox" class="mt-1 h-5 w-5 cursor-pointer accent-primary transition" />
					</CardHeader>

					<CardContent class="flex justify-end gap-2 opacity-0 transition group-hover:opacity-100">
						<Button variant="secondary" class="bg-amber-100 hover:bg-amber-200">Edit</Button>
						<Button variant="destructive">Delete</Button>
					</CardContent>
				</Card>
			{/each}
		</div>
	{/if}
</main>
