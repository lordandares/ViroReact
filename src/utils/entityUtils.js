import { Map } from 'immutable';
import { isArray } from 'lodash';

export const createEntityMap = (entities, modelClass = null) => {
  const entityMap = {};
  if (isArray(entities)) {
    entities.forEach(entity => {
      entityMap[entity.id || entity.eventId] = modelClass ? modelClass.create(entity) : entity;
    });
  }
  return Map(entityMap);
};
