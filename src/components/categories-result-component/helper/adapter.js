import categories from '../../../enum/CategoriesEnum';

const Adapter = results => {
  const categoriesList = Object.keys(categories);

  const resultCollections = categoriesList.map(x => {
    return {
      category: categories[x].id,
      categoryName: x,
      result: results.filter(f => f.category === categories[x].id),
    };
  });

  return resultCollections;
};
export default Adapter;
