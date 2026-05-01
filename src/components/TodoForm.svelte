<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { toast } from 'svelte-sonner';
	let props = $props();
	let isSubmitting = $state(false);
</script>

<form
	action="?/createTodo"
	method="POST"
	use:enhance={() => {
		isSubmitting = true;

		return async ({ update }) => {
			await update();

			if (props.form?.success) {
				toast.success(props.form.message);
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
					<Field.Description>Adding new todo using sveltekit...</Field.Description>
				</div>
				<div>
					<a href="/todos" class={`${buttonVariants({ variant: 'outline' })}`}>Lihat Todos</a>
				</div>
			</div>
			<div>
				{#if props.form?.error}
					<p class="mb-4 text-sm font-medium text-red-500">{props.form.error}</p>
				{/if}
			</div>

			<Field.Group>
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
						{isSubmitting ? 'Loading...' : 'Simpan'}
					</Button>
				</Field.Field>
			</Field.Group>
		</Field.Set>
	</Field.Group>
</form>
