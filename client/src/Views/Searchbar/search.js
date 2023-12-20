export const validateSearchText = (text) => {
  const trimmedText = text.trim();
  return trimmedText.length > 2 && !/^[\s]*$/.test(text); // Verifica que haya al menos 4 caracteres y no solo espacios en blanco
};