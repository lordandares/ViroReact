import * as featureCollectionsObjects from './featureCollection';
import categories from './../../../enum/CategoriesEnum';

const Adapter = points => {
  const features = points.map(point => {
    const coordinates = [parseInt(point.venue.lat, 10), parseInt(point.venue.lng, 10)];
    const geometry = new featureCollectionsObjects.Geometry('Point', coordinates);
    const properties = new featureCollectionsObjects.Properties(point.category.id);
    const feature = new featureCollectionsObjects.Feature(
      'Feature',
      point.itemCarrousel,
      properties,
      geometry
    );
    return feature;
  });
  const categoriesList = Object.keys(categories);

  const featureCollections = categoriesList.map(x => {
    return new featureCollectionsObjects.FeatureCollection(
      'FeatureCollection',
      features.filter(f => f.properties.icon === categories[x].id)
    );
  });

  return featureCollections;
};
export default Adapter;
