// src/routes/todos/+page.server.ts
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
