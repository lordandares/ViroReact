export class FeatureCollection {
  constructor(type, features) {
    this.type = type;
    this.features = features;
  }
}
export class Feature {
  constructor(type, id, properties, geometry) {
    this.type = type;
    this.id = id;
    this.properties = properties;
    this.geometry = geometry;
  }
}
export class Properties {
  constructor(icon) {
    this.icon = icon;
  }
}
export class Geometry {
  constructor(type, coordinates) {
    this.type = type;
    this.coordinates = coordinates;
  }
}
