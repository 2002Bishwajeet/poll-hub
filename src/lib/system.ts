export const VARS = {
  APPWRITE_ENDPOINT:
    import.meta.env?.VITE_APPWRITE_ENDPOINT?.toString() || undefined,
  PROJECT_ID:
    import.meta.env?.VITE_APPWRITE_PROJECT_ID?.toString() || undefined,
  DATABASE_ID: import.meta.env?.VITE_APPWRITE_DATABASE_ID?.toString() || undefined,
  FUNCTION_ID: import.meta.env?.VITE_APPWRITE_FUNCTION_ID?.toString() || undefined,
};
