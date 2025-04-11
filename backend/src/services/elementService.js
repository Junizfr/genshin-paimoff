import Element from '../models/element.js';
import elementRepository from '../repositories/elementRepository.js';

export default {
  getAll: async () => {
    return await elementRepository.all();
  },

  create: async (elementData) => {
    const { valid, errors } = await Element.validate(elementData);
    if (!valid) {
      return { errors: errors };
    }

    const newElement = new Element(elementData);
    return {
      success: 'Element created',
      data: await elementRepository.create(newElement),
    };
  },

  update: async (elementId, elementData) => {
    const element = new Element(await elementRepository.findById(elementId));
    const { valid, errors, updatableRows } = await Element.validate(
      elementData,
      true
    );
    if (!valid) {
      return { errors: errors };
    }

    const updateElement = new Element({
      id: element.id,
      name: updatableRows.name || element.name,
      icon: updatableRows.icon || element.icon,
      updatedAt: new Date(),
    });

    return await elementRepository.update(updateElement);
  },

  delete: async (elementId) => {
    const element = await elementRepository.findById(elementId);
    if (!element) {
      return { error: 'Element not found' };
    }
    const deleteElement = await elementRepository.delete(elementId);
    return deleteElement;
  },

  getById: async (elementId) => {
    const element = await elementRepository.findById(elementId);
    if (!element) {
      return { error: 'Element not found' };
    }
    return element;
  },
};
