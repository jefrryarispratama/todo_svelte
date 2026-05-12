<script lang="ts">
	import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import DeleteTodo from '../../components/DeleteTodo.svelte';
	import SquarePen from '@lucide/svelte/icons/square-pen';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Pagination from '../../components/Pagination.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let { data } = $props();
</script>

<main class="mx-auto mt-4 max-w-md p-6">
	<div class="flex justify-between">
		<h1 class="mb-6 text-2xl font-bold tracking-tight">✨ My Todo</h1>
		<Tooltip.Root>
			<a href="/">
				<Tooltip.Trigger class={`${buttonVariants({ variant: 'outline' })} cursor-pointer `}>
					<SquarePen />
				</Tooltip.Trigger>
			</a>
			<Tooltip.Content>
				<p>Tambah todo</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>

	<form method="GET" class="mb-6 flex items-center gap-2">
		<Input
			type="text"
			name="q"
			placeholder="Cari todo..."
			value={data.searchQuery}
			class="rounded-none focus-visible:ring-black"
		/>
		<Button type="submit" class="rounded-none">Cari</Button>

		{#if data.searchQuery}
			<a href="/todos" class={`${buttonVariants({ variant: 'outline' })} rounded-none`}> Reset </a>
		{/if}
	</form>

	{#if data.todos?.length === 0}
		<Card class="border  border-dashed">
			<CardContent class="flex flex-col items-center justify-center gap-2  p-10 text-gray-500">
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
						<a
							href="todo/edit/{todo.id}"
							class={`${buttonVariants({ variant: 'outline' })} bg-amber-100 hover:bg-amber-200`}
							>Edit</a
						>
						<DeleteTodo todoId={todo.id} action="/?/deleteTodo" />
					</CardContent>
				</Card>
			{/each}
		</div>

		<div class="mt-8 flex justify-center">
			<Pagination currentPage={data.currentPage} totalPages={data.totalPages} />
		</div>
	{/if}
</main>
