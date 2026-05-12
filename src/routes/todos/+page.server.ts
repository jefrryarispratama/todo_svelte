import prisma from '$lib/prisma';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	try {
		const todos = await prisma.todo.findMany({
			orderBy: {
				id: 'desc'
			}
		});

		return { todos };
	} catch {
		return { success: false, message: 'gagal memanggil data' };
	}
};
