import prisma from '$lib/prisma';

export async function getTodoById(id: string) {
	return await prisma.todo.findUnique({
		where: {
			id
		}
	});
}

export async function createTodoAction(data: { title: string; description: string }) {
	return await prisma.todo.create({
		data: {
			title: data.title,
			description: data.description
		}
	});
}

export async function editTodoAction(data: { id: string; title: string; description: string }) {
	return await prisma.todo.update({
		where: { id: data.id },
		data: {
			title: data.title,
			description: data.description
		}
	});
}

export async function deleteTodoAction(id: string) {
	return await prisma.todo.delete({
		where: {
			id
		}
	});
}
