import { faker } from '@faker-js/faker';
import { Product } from './product.model';

export const generateOneProduct = (): Product => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: {
      id: faker.number.int(),
      name: faker.commerce.department(),
    },
    images: [faker.image.url(), faker.image.url()],
  };
};

export const generateManyProducts = (size: number = 10): Product[] => {
  return new Array(size).fill(null).map(() => ({ ...generateOneProduct() }));
};
