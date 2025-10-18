// Authentication utility functions

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const getUserEmail = (): string | null => {
  return localStorage.getItem('userEmail');
};

export const getUserName = (): string | null => {
  return localStorage.getItem('userName');
};

export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};
