import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import prisma from '$lib/prisma';

export const actions: Actions = {
	createTodo: async ({ request }) => {
		const formData = await request.formData();

		const title = formData.get('title') as string;
		const description = formData.get('description') as string;

		if (!title || !description) {
			return fail(400, {
				error: 'Title dan description tidak boleh kosong!',
				title,
				description
			});
		}

		await prisma.todo.create({
			data: {
				title,
				description
			}
		});
		return {
			success: true,
			message: 'Todo berhasil ditambah'
		};
	},
	deleteTodo: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('todoId') as string;

		if (!id) {
			return fail(400, { error: 'Id tidak ditemukan' });
		}

		try {
			await prisma.todo.delete({
				where: {
					id: id
				}
			});
		} catch {
			return fail(500, { message: 'Gagal menghapus data ke database' });
		}
	}
};
