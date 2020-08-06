import { Geometry, Properties, Feature, FeatureCollection } from './featureCollection';
import categories, { nameById } from './../../../enum/CategoriesEnum';

const getFilterCategory = categoryFilter => {
  if (categoryFilter !== '0') {
    const key = nameById[categoryFilter].name;
    const categoryObj = {
      [key]: { id: categoryFilter },
    };
    return categoryObj;
  }
  return categories;
};

const Adapter = (pointsAtrray, venues, categoryFilter) => {
  const categoriesFiltered = getFilterCategory(categoryFilter);

  const features = pointsAtrray.map(pointmap => {
    pointmap.toJS();

    const tf = pointmap.map(pointi => {
      const point = pointi.toJS();
      const venue = venues.get(point.venue).toJS();
      const coordinates = [parseInt(venue.lng, 10), parseInt(venue.lat, 10)];
      const geometry = new Geometry('Point', coordinates);
      const properties = new Properties(point.category);
      const feature = new Feature('Feature', point.id, properties, geometry);

      return feature;
    });
    return tf.toJS();
  });

  const categoriesList = Object.keys(categoriesFiltered);
  const jsonArray = [];
  features.map(x => {
    return Object.keys(x).forEach(key => {
      jsonArray.push(x[key]);
      return x[key];
    });
  });

  return categoriesList.map(x => {
    return new FeatureCollection(
      'FeatureCollection',
      jsonArray.filter(f => f.properties.icon === categories[x].id)
    );
  });
};

export const PointAdapter = (point, venues) => {
  const venue = venues.get(point.venue);
  const coordinates = [parseInt(venue.lng, 10), parseInt(venue.lat, 10)];
  const geometry = new Geometry('Point', coordinates);
  const properties = new Properties(point.category);

  const feature = new Feature('Feature', 1, properties, geometry);
  const features = [feature];

  const categoriesList = Object.keys(categories);

  return categoriesList.map(
    category =>
      new FeatureCollection(
        'FeatureCollection',
        features.filter(_feature => _feature.properties.icon === categories[category].id)
      )
  );
};
export default Adapter;

export const carrouselAdapter = data => {
  const jsonArray = [];
  data.map(x => {
    return Object.keys(x.toJS()).forEach(key => {
      jsonArray.push(x.toJS()[key]);
      return x[key];
    });
  });
  jsonArray.forEach((item, i) => {
    item.itemCarrousel = i + 1;
  });

  return jsonArray;
};
