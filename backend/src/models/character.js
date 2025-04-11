import characterRepository from '../repositories/characterRepository.js';

export default class Character {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name;
    this.vision = data.vision;
    this.gender = data.gender;
    this.rarity = data.rarity;
    this.release = data.release;
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
        if (data.name.length < 3 || data.name.length > 32) {
          errors.name =
            'Le nom du personnage doit contenir entre 3 et 32 caractères.';
        } else {
          const existingCharacter = await characterRepository.findByName(
            data.name
          );
          if (existingCharacter) {
            errors.name = 'Ce personnage existe déjà.';
          } else {
            updatableRows.name = data.name;
          }
        }
      }
      if (data.icon) {
        updatableRows.icon = data.icon;
      }
      if (data.vision) {
        updatableRows.vision = data.vision;
      }
      return {
        valid: Object.keys(errors).length === 0,
        errors,
        updatableRows: updatableRows,
      };
    }

    if (!data.name) {
      errors.name = 'Le nom du personnage est requis.';
    } else if (data.name.length < 3 || data.name.length > 32) {
      errors.name =
        'Le nom du personnage doit contenir entre 3 et 32 caractères.';
    } else {
      const existingCharacter = await characterRepository.findByName(data.name);
      if (existingCharacter) {
        errors.name = 'Ce personnage existe déjà.';
      }
    }

    if (!data.icon) {
      errors.icon = "L'icône du personnage est requise.";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
