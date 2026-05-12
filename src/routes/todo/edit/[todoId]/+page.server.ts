import { editTodoAction } from '$lib/actions/TodoAction';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	editTodo: async function name({ request }) {
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
