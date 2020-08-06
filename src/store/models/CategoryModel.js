import { Record } from 'immutable';

class CategoryModel extends Record({
  id: null,
  name: null,
}) {
  static create(category) {
    return new CategoryModel({
      id: `${category.id}`,
      name: category.name,
    });
  }
}

export default CategoryModel;
