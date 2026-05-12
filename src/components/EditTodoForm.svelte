<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { toast } from 'svelte-sonner';
	let { todoId, form } = $props();
	let isSubmitting = $state(false);
</script>

<form
	action="?/editTodo"
	method="POST"
	use:enhance={() => {
		isSubmitting = true;

		return async ({ result, update }) => {
			await update();

			if (result.type === 'success') {
				toast.success('Todo berhasil di edit');
			}

			isSubmitting = false;
		};
	}}
>
	<Field.Group>
		<Field.Set>
			<div class="flex-col-2 flex items-center justify-between">
				<div>
					<Field.Legend>Toodo</Field.Legend>
					<Field.Description>Edit your existing todo</Field.Description>
				</div>
				<a href="/todos" class={`${buttonVariants({ variant: 'outline' })}`}>kembali</a>
			</div>
			<div>
				{#if form?.error}
					<p class="mb-4 text-sm font-medium text-red-500">{form.error}</p>
				{/if}
			</div>

			<Field.Group>
				<Input type="hidden" id="todoId" disabled={isSubmitting} value={todoId} name="todoId" />

				<Field.Field>
					<Field.Label for="title">Title</Field.Label>
					<Input type="text" id="title" disabled={isSubmitting} name="title" />
				</Field.Field>

				<Field.Field>
					<Field.Label for="description">description</Field.Label>
					<Textarea name="description" disabled={isSubmitting} />
				</Field.Field>

				<Field.Field orientation="horizontal">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Loading...' : 'Edit'}
					</Button>
				</Field.Field>
			</Field.Group>
		</Field.Set>
	</Field.Group>
</form>
