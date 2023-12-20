const isNumber = (value) => /^\d+$/.test(value);

const validateForm = (formData) => {
  const errors = {};

  if (formData.name.trim() === "" || formData.name.length > 30 || (!/^[A-Za-z\s]+$/.test(formData.name))) {
    errors.name = "El nombre es inválido";
  }

  if (formData.maxHeight.trim() !== "" && !isNumber(formData.maxHeight)) {
    errors.maxHeight = "La altura es inválida";
  }

  if (formData.minHeight.trim() !== "" && !isNumber(formData.minHeight)) {
    errors.minHeight = "La altura es inválida";
  }

  if (
    formData.minHeight.trim() !== "" &&
    formData.maxHeight.trim() !== "" &&
    parseInt(formData.minHeight, 10) > parseInt(formData.maxHeight, 10)
  ) {
    errors.altura = "La altura es inválida";
  }

  if (formData.maxWeight.trim() !== "" && !isNumber(formData.maxWeight)) {
    errors.maxWeight = "El peso es inválido";
  }

  if (formData.minWeight.trim() !== "" && !isNumber(formData.minWeight)) {
    errors.minWeight = "El peso es inválido";
  }

  if (
    formData.minWeight.trim() !== "" &&
    formData.maxWeight.trim() !== "" &&
    parseInt(formData.minWeight, 10) > parseInt(formData.maxWeight, 10)
  ) {
    errors.peso = "El peso es inválido";
  }

  if (!isNumber(formData.life_span) || formData.life_span.length > 2) {
    errors.life_span = "Los años de vida son inválidos";
  }

  // Nueva validación para peso y altura
  if (
    (formData.minWeight.trim() !== "" && formData.maxWeight.trim() !== "" && parseInt(formData.minWeight, 10) > parseInt(formData.maxWeight, 10)) ||
    (formData.minHeight.trim() !== "" && formData.maxHeight.trim() !== "" && parseInt(formData.minHeight, 10) > parseInt(formData.maxHeight, 10))
  ) {
    errors.pesoAltura = "El peso máximo o la altura máxima no deben ser menores que el peso mínimo o la altura mínima";
  }

  if (formData.temperaments.length === 0) {
    errors.temperaments = "Debes elegir al menos un temperamento";
  }
  console.log(errors);

  return errors;
};

export default validateForm;
