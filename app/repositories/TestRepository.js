const faker = require('faker');

const TestRepository = {
  async createUrl({ count }) {
    const originalUrl = faker.internet.url();
    const urlCode = faker.lorem.word();
    const url = await Url.create({
      originalUrl,
      urlCode,
      shortUrl: `${originalUrl}/${urlCode}`,
      count,
    });

    return url;
  },
};

module.exports = TestRepository;
