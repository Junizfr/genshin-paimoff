import roleRepository from '../repositories/roleRepository.js';

export default class Role {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name;
    this.icon = data.icon || 'none.png';

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
            'Le nom du rôle doit contenir entre 3 et 16 caractères.';
        } else {
          const existingRole = await roleRepository.findByName(data.name);
          if (existingRole) {
            errors.name = 'Ce nom de rôle est déjà utilisé.';
          } else {
            updatableRows.name = data.name;
          }
        }
      }
      if (data.icon) {
        if (data.icon.length < 3 || data.icon.length > 50) {
          errors.icon =
            "L'icône du rôle doit contenir entre 3 et 50 caractères.";
        } else {
          const existingRole = await roleRepository.findByIcon(data.icon);
          if (existingRole) {
            errors.icon = 'Cet icône de rôle est déjà utilisé.';
          } else {
            updatableRows.icon = data.icon;
          }
        }
      }
      return {
        valid: Object.keys(errors).length === 0,
        errors,
        updatableRows: updatableRows,
      };
    }

    if (!data.name) {
      errors.name = 'Le nom du rôle est requis.';
    } else if (data.name.length < 3 || data.name.length > 16) {
      errors.name = 'Le nom du rôle doit contenir entre 3 et 16 caractères.';
    } else {
      const existingRole = await roleRepository.findByName(data.name);
      if (existingRole) {
        errors.name = 'Ce nom de rôle est déjà utilisé.';
      }
    }

    if (!data.icon) {
      errors.icon = "L'icône du rôle est requise.";
    } else if (data.icon.length < 3 || data.icon.length > 50) {
      errors.icon = "L'icône du rôle doit contenir entre 3 et 50 caractères.";
    } else {
      const existingRole = await roleRepository.findByName(data.icon);
      if (existingRole) {
        errors.icon = 'Cet icône de rôle est déjà utilisé.';
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
