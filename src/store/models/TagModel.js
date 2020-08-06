import { Record } from 'immutable';

class TagModel extends Record({
  id: null,
  name: null,
  formattedTag: null,
}) {
  static create(tag) {
    return new TagModel({
      id: `${tag.id}`,
      name: tag.name,
      formattedTag: tag.formatedTag || tag.formattedTag,
    });
  }
}

export default TagModel;
