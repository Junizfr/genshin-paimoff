import elementRepository from '../repositories/elementRepository.js';

export default class Element {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name;
    this.icon = data.icon;

    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || new Date();
    this.error = null;
  }

  static async validate(data, update = false) {
    const errors = {};
    const updatableRows = {};

    if (update) {
      if (data.name) {
        if (data.name.length < 3 || data.name.length > 16) {
          errors.name =
            "Le nom de l'élément doit contenir entre 3 et 16 caractères.";
        } else {
          const existingElement = await elementRepository.findByName(data.name);
          if (existingElement) {
            errors.name = "Ce nom d'élément est déjà utilisé.";
          } else {
            updatableRows.name = data.name;
          }
        }
      }
      if (data.icon) {
        updatableRows.icon = data.icon;
      }
      return {
        valid: Object.keys(errors).length === 0,
        errors,
        updatableRows: updatableRows,
      };
    }

    if (!data.name) {
      errors.name = "Le nom de l'élement est requis.";
    } else if (data.name.length < 3 || data.name.length > 16) {
      errors.name =
        "Le nom de l'élément doit contenir entre 3 et 16 caractères.";
    } else {
      const existingElement = await elementRepository.findByName(data.name);
      if (existingElement) {
        errors.name = "Ce nom d'élément est déjà utilisé.";
      }
    }

    if (!data.icon) {
      errors.icon = "L'icône de l'élément est requise.";
    } else if (data.icon.length < 3 || data.icon.length > 50) {
      errors.icon =
        "L'icône de l'élement doit contenir entre 3 et 50 caractères.";
    } else {
      const existingElement = await elementRepository.findByName(data.icon);
      if (existingElement) {
        errors.icon = "Cet icône d'élément est déjà utilisé.";
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
