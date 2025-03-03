//TYPES MODULES
import type { Dishes } from '_@landing/server/dish/dish.type';

export const dishMockup: Dishes = {
  id: 1,
  name: 'Spaghetti Carbonara',
  origin: 'Italy',
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
  description: 'Classic Italian pasta dish with bacon, eggs, and cheese',
  presentation: 'Served hot in a bowl',
  ingredients: 'Spaghetti, bacon, eggs, Parmesan cheese, black pepper',
  recipe: 'Boil spaghetti, fry bacon, mix eggs and cheese, combine all ingredients',
  pdf: 'https://example.com/spaghetti-carbonara.pdf',
  nutriScore: 'C',
  protein: 20,
  fat: 30,
  carbohydrate: 50,
  hidden: false,
  inStock: true,
  spicyLevel: 'NON',
  images: ['/img/inspiring/healthy.webp'],
  allergens: [
    { id: 1, name: 'Celery' },
    { id: 2, name: 'Crustaceans' },
    { id: 3, name: 'Eggs' },
    { id: 4, name: 'Fish' },
    { id: 5, name: 'Gluten' },
    { id: 6, name: 'Lupin' },
    { id: 7, name: 'Milk' },
    { id: 8, name: 'Mollusks' },
    { id: 9, name: 'Mustard' },
    { id: 1, name: 'Nuts' },
  ],
  sizes: [
    { id: '1', name: 'Small', price: 12.99, calories: 800, dishId: 1, default: true },
    { id: '2', name: 'Large', price: 15.99, calories: 1200, dishId: 1, default: false },
  ],
  category: [
    { id: '1', name: 'Pasta', metaCategory: 'Ordinary' },
    { id: '2', name: 'Italian', metaCategory: 'Ordinary' },
    { id: '3', name: 'Spaghetti', metaCategory: 'Ordinary' },
    { id: '4', name: 'Carbonara', metaCategory: 'Ordinary' },
    { id: '5', name: 'Bacon', metaCategory: 'Ordinary' },
  ],
  intolerances: [
    { id: 1, name: 'Lactose Intolerance' },
    { id: 2, name: 'Gluten Intolerance' },
  ],
  addons: [
    {
      id: 'addon_1',
      name: 'Extra cheese',
      multiple: false,
      required: true,
      dishId: 1,
      options: [
        {
          id: 'option_1',
          name: 'Cheddar',
          price: 1.5,
          calories: 120,
          default: true,
          order: 0,
          addOnId: 'addon_1',
        },
        {
          id: 'option_2',
          name: 'Mozzarella',
          price: null,
          calories: 100,
          default: false,
          order: 1,
          addOnId: 'addon_1',
        },
      ],
    },
    {
      id: 'addon_2',
      name: 'Extra sauce',
      multiple: true,
      required: false,
      dishId: 1,
      options: [
        {
          id: 'option_3',
          name: 'Marinara',
          price: 0.5,
          calories: 80,
          default: true,
          order: 0,
          addOnId: 'addon_2',
        },
        {
          id: 'option_4',
          name: 'Alfredo',
          price: 1.0,
          calories: 150,
          default: false,
          order: 1,
          addOnId: 'addon_2',
        },
      ],
    },
    {
      id: 'addon_3',
      name: 'Toppings',
      multiple: true,
      required: true,
      dishId: 1,
      options: [
        {
          id: 'option_5',
          name: 'Pepperoni',
          price: null,
          calories: 50,
          default: true,
          order: 0,
          addOnId: 'addon_3',
        },
        {
          id: 'option_6',
          name: 'Mushrooms',
          price: null,
          calories: 20,
          default: false,
          order: 1,
          addOnId: 'addon_3',
        },
      ],
    },
  ],
};
