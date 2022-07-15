export const charactersLengthValidator = (field: string, fieldName: string, minLength: number, maxLength?: number,) => {
  if (field.length < minLength) {
      throw new Error(`O campo ${fieldName} deve conter pelo menos ${minLength} caractéres`);
  }
  if (maxLength ? field.length > maxLength : false) {
      throw new Error(`O campo ${fieldName} excedeu o número máximo (${maxLength}) de caractéres`);
  }
}

export const emailValidator = (email: string) => {
  if (!(email.includes('@')) || !(email.includes('.co'))) {
    throw new Error('E-mail inválido');
  }
}