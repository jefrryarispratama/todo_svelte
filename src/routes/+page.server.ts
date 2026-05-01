import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	createTodo: async ({ request }) => {
		const formData = await request.formData();

		const title = formData.get('title');
		const description = formData.get('description');

		if (!title || !description) {
			return fail(400, {
				error: 'Title dan description tidak boleh kosong!',
				title,
				description
			});
		}
		

		return {
			success: true,
			message: 'Todo berhasil ditambah',
			title,
			description
		};
	}
};
