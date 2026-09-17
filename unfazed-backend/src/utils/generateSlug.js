export const generateSlug = (name) => {
  if (!name) return `therapist-${Date.now()}`;
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base || `therapist-${Date.now()}`;
};

export default generateSlug;
