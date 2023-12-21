export const API_ROUTER = {
  USER_LIST: '/users',
  USER_DETAIL: (id: string): string => `/users/${id}`,
  TECH_LIST: '/techstacks',
  TECH_DETAIL: (id: string): string => `/techstacks/${id}`
};

export const PAGE_ROUTES = {
  HOME: '/home',
  USER_LIST: '/users',
  USER_CREATE: '/users/create',
  USER_DETAIL: (id: string): string => `/users/${id}/details`,
  USER_EDIT: (id: string): string => `/users/${id}/edit`,
  TECH_LIST: '/techstacks',
  TECH_CREATE: '/techstacks/create',
  TECH_DETAIL: (id: string): string => `/techstacks/${id}`
};
