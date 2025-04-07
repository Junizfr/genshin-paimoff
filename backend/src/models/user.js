import userRepository from '../repositories/userRepository.js';

export default class User {
  constructor(data) {
    this.id = data.id || null;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.avatar = data.avatar || 'none.png';
    this.role = data.role || 1;

    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || new Date();
    this.error = null;
  }

  static async validate(data, update = false) {
    const errors = {};
    const updatableRows = {};

    if (update) {
      if (data.email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errors.email = "L'adresse email n'est pas valide.";
        } else {
          const existingUser = await userRepository.findByEmail(data.email);
          if (existingUser) {
            errors.email = 'Cet email est déjà pris.';
          } else {
            updatableRows.email = data.email;
          }
        }
      }
      if (data.username) {
        if (data.username.length < 3 || data.username.length > 16) {
          errors.username =
            "Le nom d'utilisateur doit contenir entre 3 et 16 caractères.";
        } else {
          const existingUser = await userRepository.findByUsername(
            data.username
          );
          if (existingUser) {
            errors.username = "Ce nom d'utilisateur est déjà pris.";
          } else {
            updatableRows.username = data.username;
          }
        }
      }
      if (data.role) {
        if (data.role < 1 || data.role > 2) {
          errors.role = 'Le rôle doit avoir une valeur comprise entre 1 et 2.';
        } else {
          updatableRows.role = data.role;
        }
      }
      return {
        valid: Object.keys(errors).length === 0,
        errors,
        updatableRows: updatableRows,
      };
    }

    if (!data.username) {
      errors.username = "Le nom d'utilisateur est requis.";
    } else if (data.username.length < 3 || data.username.length > 16) {
      errors.username =
        "Le nom d'utilisateur doit contenir entre 3 et 16 caractères.";
    } else {
      const existingUser = await userRepository.findByUsername(data.username);
      if (existingUser) {
        errors.username = "Ce nom d'utilisateur est déjà pris.";
      }
    }

    if (!data.email) {
      errors.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "L'adresse email n'est pas valide.";
    } else {
      const existingEmail = await userRepository.findByEmail(data.email);
      if (existingEmail) {
        errors.email = 'Cet email est déjà utilisé.';
      }
    }

    if (!data.password) {
      errors.password = 'Le mot de passe est requis.';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
