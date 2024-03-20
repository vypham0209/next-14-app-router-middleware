//THIRD PARTY MODULES
import { faker } from '@faker-js/faker';
import { withIIFE } from '_@landing/utils/fakeData';

export const socialWallData = withIIFE(() => {
  faker.seed(999);

  return Array.from({ length: 7 }, () => {
    const isMedia = faker.datatype.boolean();
    const isCaption = faker.datatype.boolean();
    return {
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      title: faker.lorem.words(
        faker.number.int({
          min: 10,
          max: 20,
        }),
      ),
      platformUserId: faker.internet.userName(),
      linkToPost: faker.internet.url(),
      publishedTime: faker.date.past(),
      mediaUrl: isMedia ? faker.image.urlPicsumPhotos() : '',
      caption:
        isCaption || !isMedia
          ? faker.lorem.words(
              faker.number.int({
                min: 40,
                max: 100,
              }),
            )
          : '',
      type: faker.helpers.arrayElement(['IMAGE_POST', 'TEXT_POST', 'VIDEO_POST']),
      slug: faker.lorem.slug(),
      disabled: faker.datatype.boolean(),
      platformUser: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        avatarUrl: faker.image.urlPicsumPhotos(),
        socialLink: faker.internet.url(),
        platform: faker.helpers.arrayElement([
          'INSTAGRAM',
          'FACEBOOK',
          'TWITTER',
          'LINKEDIN',
          'YOUTUBE',
        ]),
      },
    };
  });
});
