//THIRD PARTY MODULES
import { faker } from '@faker-js/faker';
import { prisma } from '_@rpc/services/db';
import { Dishes, MetaCategory, Prisma } from '@prisma/client';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
//HOOK, SERVER
import { NextResponse } from 'next/server';

const categories = [
  {
    title: 'Ordinary',
    children: [
      'Breakfasts',
      'Typical Breakfasts',
      'Drinks',
      'Appetizers',
      'Snacks',
      'Entrees',
      'Lunchs',
      'Typical Dishes',
      'Desserts',
      'Dinners',
      'Plats Du Jour Simple',
      'Plats Du Jour Premium',
      'Bundles',
      'Party',
    ],
  },
  {
    title: 'Healthy',
    children: [
      'Breakfasts',
      'Drinks',
      'Appetizers',
      'Snacks',
      'Entrees',
      'Lunchs',
      'Typical Dishes',
      'Desserts',
      'Dinners',
      'Plats Du Jour Simple',
      'Plats Du Jour Premium',
      'Bundles',
      'Party',
    ],
  },
  {
    title: 'Vegetarian',
    children: [
      'Breakfasts',
      'Typical Breakfasts',
      'Drinks',
      'Appetizers',
      'Snacks',
      'Entrees',
      'Lunchs',
      'Typical Dishes',
      'Desserts',
      'Dinners',
      'Plats Du Jour Simple',
      'Plats Du Jour Premium',
      'Bundles',
      'Party',
    ],
  },
  {
    title: 'Vegan',
    children: [
      'Breakfasts',
      'Drinks',
      'Appetizers',
      'Snacks',
      'Entrees',
      'Lunchs',
      'Typical Dishes',
      'Desserts',
      'Dinners',
      'Plats Du Jour Simple',
      'Plats Du Jour Premium',
      'Bundles',
      'Party',
    ],
  },
] as const;

const allergensAndIntolerance = [
  'Gluten',
  'Soybean',
  'Sulphur dioxide and sulphites',
  'Lupin',
  'Mustard',
  'Eggs',
  'Mollusks',
  'Celery',
  'Peanut',
  'Crustacean',
  'Milk',
  'Sesame seeds',
  'Nuts',
  'Fish',
];

export const GET = async () => {
  // TODO: create a new category
  // const categoriesReq = [];
  // for (const category of categories) {
  //   const categoryChildren = [];
  //   for (const name of category.children) {
  //     const createdCategory = await apiServer.categories.createCategory.mutate({
  //       metaCategory: category.title,
  //       name,
  //     });
  //     categoryChildren.push(createdCategory);
  //   }
  //   categoriesReq.push(categoryChildren);
  // }
  // console.log(categoriesReq);
  // return NextResponse.json(categoriesReq);
  // *------------------------
  // TODO: create a new allergen
  // const allergensReq = [];
  // for (const name of allergensAndIntolerance) {
  //   const createdAllergen = await apiServer.allergens.createAllergen.mutate({
  //     name,
  //   });
  //   allergensReq.push(createdAllergen);
  // }
  // console.log(allergensReq);
  // return NextResponse.json(allergensReq);
  // *------------------------
  // TODO: create a new intolerance
  // const intolerancesReq = [];
  // for (const name of allergensAndIntolerance) {
  //   const createdIntolerance = await apiServer.intolerance.createIntolerance.mutate({
  //     name,
  //   });
  //   intolerancesReq.push(createdIntolerance);
  // }
  // console.log(intolerancesReq);
  // return NextResponse.json(intolerancesReq);
  // TODO: create a new insights
  // const insightsReq = [];
  // for (let i = 0; i < 20; i++) {
  //   const createdInsight = await apiServer.insightPost.createInsightPost.mutate(
  //     (() => {
  //       return {
  //         title: faker.lorem.words(),
  //         category: faker.helpers.arrayElements(['Ordinary', 'Healthy', 'Vegetarian', 'Vegan']),
  //         content: faker.lorem.sentences(),
  //         photo: faker.image.urlPicsumPhotos(),
  //         synopsis: faker.lorem.sentences(),
  //       };
  //     })(),
  //   );
  //   insightsReq.push(createdInsight);
  // }
  // console.log(insightsReq);
  // return NextResponse.json(insightsReq);
  // TODO: create a new social wall
  const platformUser = await Promise.all(
    Array.from({ length: 10 }).map(async () =>
      prisma.platformUser.create({
        data: {
          name: faker.person.fullName(),
          avatarUrl: faker.image.avatar(),
          platform: faker.helpers.arrayElement(['FACEBOOK', 'INSTAGRAM', 'TWITTER']),
          socialLink: faker.internet.url(),
        },
      }),
    ),
  );

  const platformUserIds = platformUser.map((item) => item.id);

  const socialWallReq = [];
  for (let i = 0; i < 30; i++) {
    const createdSocialWall = await prisma.socialWall.create({
      data: (() => {
        return {
          title: faker.lorem.words(),
          caption: faker.lorem.sentences(),
          linkToPost: faker.image.urlPicsumPhotos(),
          mediaUrl: faker.image.urlPicsumPhotos(),
          publishedTime: faker.date.past(),
          slug: faker.lorem.slug(),
          type: faker.helpers.arrayElement(['IMAGE_POST', 'TEXT_POST', 'VIDEO_POST']),
          platformUserId: faker.helpers.arrayElement(platformUserIds),
        };
      })(),
    });

    console.log(createdSocialWall);
    socialWallReq.push(createdSocialWall);
  }
  console.log(socialWallReq);
  return NextResponse.json(socialWallReq);
  // TODO: create a new dish
  // const categoriesReq = await prisma.category.findMany();
  // const allergensReq = await prisma.allergens.findMany();
  // const intolerancesReq = await prisma.intolerance.findMany();
  // const addonsData = () =>
  //   faker.helpers.arrayElements(
  //     Array.from({ length: 10 }).map(() => {
  //       return {
  //         name: faker.lorem.words(),
  //         multiple: faker.helpers.maybe(faker.datatype.boolean),
  //         required: faker.helpers.maybe(faker.datatype.boolean),
  //       };
  //     }),
  //     { min: 4, max: 10 },
  //   );
  // const sizesData = () => [
  //   {
  //     name: faker.lorem.words(),
  //     price: faker.number.float({
  //       min: 0,
  //       max: 100,
  //     }),
  //     calories: faker.number.int({
  //       min: 0,
  //       max: 100,
  //     }),
  //     default: true,
  //   },
  //   ...faker.helpers.arrayElements(
  //     Array.from({ length: 4 }).map(() => ({
  //       name: faker.lorem.words(),
  //       price: faker.number.float({
  //         min: 0,
  //         max: 100,
  //       }),
  //       calories: faker.number.int({
  //         min: 0,
  //         max: 100,
  //       }),
  //       default: false,
  //     })),
  //     { min: 2, max: 4 },
  //   ),
  // ];
  // const categoriesGroup = categoriesReq.reduce((acc: any, category) => {
  //   if (!acc[category.metaCategory]) {
  //     acc[category.metaCategory] = [];
  //   }
  //   acc[category.metaCategory].push(category.id);
  //   return acc;
  // }, {}) as unknown as Record<MetaCategory, string[]>;
  // const categoriesData = () => {
  //   const categories = faker.helpers.arrayElement(categoriesReq).metaCategory;
  //   return faker.helpers.arrayElements(categoriesGroup[categories], { min: 2, max: 6 });
  // };
  // const dishesData = () => ({
  //   name: faker.lorem.words(),
  //   origin: faker.location.country(),
  //   description: faker.lorem.sentences(),
  //   nutriScore: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']),
  //   fat: faker.number.int({
  //     min: 0,
  //     max: 100,
  //   }),
  //   protein: faker.number.int({
  //     min: 0,
  //     max: 100,
  //   }),
  //   spicyLevel: faker.helpers.arrayElement(['NON', 'LIG', 'MED', 'HOT']),
  //   images: [faker.image.urlPicsumPhotos()],
  //   carbohydrate: faker.number.int({
  //     min: 0,
  //     max: 100,
  //   }),
  //   sizes: {
  //     createMany: {
  //       data: sizesData(),
  //     },
  //   },
  //   addons: {
  //     createMany: {
  //       data: addonsData(),
  //     },
  //   },
  //   ingredients: faker.lorem.words(),
  //   intolerances: {
  //     connect: faker.helpers
  //       .arrayElements(intolerancesReq)
  //       .map((item) => ({ id: item.id }), { min: 3, max: 8 }),
  //   },
  //   allergens: {
  //     connect: faker.helpers
  //       .arrayElements(allergensReq)
  //       .map((item) => ({ id: item.id }), { min: 3, max: 8 }),
  //   },
  //   category: {
  //     connect: categoriesData().map((item) => ({ id: item })),
  //   },
  // });
  // const dishesReq = [];
  // for (let i = 0; i < 20; i++) {
  //   const dish = await Promise.all(
  //     Array.from({ length: 5 }).map(
  //       async () =>
  //         await prisma.dishes.create({
  //           data: dishesData(),
  //         }),
  //     ),
  //   );
  //   dishesReq.push(dish);
  // }
  // console.log(dishesReq);
  // return NextResponse.json({ data: 'test' });
};
