export const generateImagePaths = (baseDir, count, prefix = 'img') => {
  return Array.from({ length: count }, (_, i) => 
    `/images/${baseDir}/${prefix}_${i + 1}.png`
  );
};

export const createProduct = (id, name, baseDir, price, description, specifications = null) => ({
  id,
  name,
  img: `/images/${baseDir}/${baseDir}-1.png`,
  images: generateImagePaths(baseDir, 8, baseDir),
  price,
  description,
  ...(specifications && { specifications })
});

export const validateProduct = (product) => {
  const required = ['id', 'name', 'img', 'price', 'description'];
  return required.every(field => product[field] !== undefined);
};