import { editTodoAction, getTodoById } from '$lib/actions/TodoAction';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.todoId;
	const existingTodo = await getTodoById(id);
	if (!existingTodo) {
		throw fail(404, 'Todo tidak ditemukan');
	}
	return {
		todo: existingTodo
	};
};

export const actions: Actions = {
	editTodo: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('todoId') as string;
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;

		if (!id) {
			return fail(400, { error: 'Id tidak ditemukan' });
		}

		if (!title || !description) {
			return fail(400, {
				error: 'Title dan description tidak boleh kosong!',
				title,
				description
			});
		}

		try {
			await editTodoAction({ id, title, description });
		} catch {
			return fail(500, { message: 'gagal mengedit data' });
		}
	}
};
