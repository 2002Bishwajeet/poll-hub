export const VARS = {
  APPWRITE_ENDPOINT:
    import.meta.env?.VITE_APPWRITE_ENDPOINT?.toString() || undefined,
  PROJECT_ID:
    import.meta.env?.VITE_APPWRITE_PROJECT_ID?.toString() || undefined,
};
