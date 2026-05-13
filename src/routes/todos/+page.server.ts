// src/routes/todos/+page.server.ts
import prisma from '$lib/prisma';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deleteTodoAction } from '$lib/actions/TodoAction';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const page = Number(url.searchParams.get('page')) || 1;

		const searchQuery = url.searchParams.get('q') || '';

		const limit = 5;
		const skip = (page - 1) * limit;

		const whereCondition = searchQuery
			? {
					OR: [{ title: { contains: searchQuery } }, { description: { contains: searchQuery } }]
				}
			: {};

		const [todos, totalCount] = await Promise.all([
			prisma.todo.findMany({
				where: whereCondition,
				orderBy: { id: 'desc' },
				take: limit,
				skip: skip
			}),
			prisma.todo.count({
				where: whereCondition
			})
		]);

		const totalPages = Math.ceil(totalCount / limit);

		return {
			todos,
			currentPage: page,
			totalPages,
			searchQuery
		};
	} catch {
		throw error(500, 'Gagal memanggil data dari database');
	}
};

export const actions: Actions = {
	deleteTodo: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('todoId') as string;

		if (!id) {
			return fail(400, { message: 'Id tidak ditemukan' });
		}

		try {
			await deleteTodoAction(id);
			return { success: true };
		} catch {
			return fail(500, { message: 'Gagal menghapus data' });
		}
	}
};
