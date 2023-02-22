export const whiteListUrl = (path: string) => ['/auth/login', '/auth/register'].includes(path);

export const hashOwner = (query: string, userId: string) => query === userId;
