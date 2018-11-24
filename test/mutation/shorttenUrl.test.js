const faker = require('faker');

describe('Shortten URL', () => {
  let request, urlCode, baseUrl;

  before(async () => {
    request = require('supertest')(graphqlUrl);
    baseUrl = 'localhost:3000';
  });

  after(async () => {
    await Url.remove({});
  });

  it('url not valid', (done) => {
    const url = 'tiki';

    request.post('/')
      .send({
        query: 'mutation{'
                    + `shortenLink(url: "${url}", baseUrl: "${baseUrl}") { originalUrl urlCode shortUrl }`
                    + '}',
      })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].name.should.be.eql(tiki.errors.urlNotValid);
        done();
      });
  });

  it('random url valid', (done) => {
    const url = faker.internet.url();

    request.post('/')
      .send({
        query: 'mutation{'
                    + `shortenLink(url: "${url}", baseUrl: "${baseUrl}") { originalUrl urlCode shortUrl }`
                    + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.shortenLink.should.have.property('originalUrl').eql(url);
        res.body.data.shortenLink.should.have.property('urlCode').and.be.ok();

        const code = res.body.data.shortenLink.urlCode;
        res.body.data.shortenLink.should.have.property('shortUrl').eql(`${baseUrl}/${code}`);
        done();
      });
  });

  it('url valid', (done) => {
    const url = 'tiki.vn';
    const expectUrl = 'http://tiki.vn';

    request.post('/')
      .send({
        query: 'mutation{'
                    + `shortenLink(url: "${url}", baseUrl: "${baseUrl}") { originalUrl urlCode shortUrl }`
                    + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.shortenLink.should.have.property('originalUrl').eql(expectUrl);
        res.body.data.shortenLink.should.have.property('urlCode').and.be.ok();

        ({ urlCode } = res.body.data.shortenLink);
        res.body.data.shortenLink.should.have.property('shortUrl').eql(`${baseUrl}/${urlCode}`);
        done();
      });
  });

  it('return same url code for same domain', (done) => {
    const url = 'http://tiki.vn/';
    const expectUrl = 'http://tiki.vn';

    request.post('/')
      .send({
        query: 'mutation{'
                    + `shortenLink(url: "${url}", baseUrl: "${baseUrl}") { originalUrl urlCode shortUrl }`
                    + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.shortenLink.should.have.property('originalUrl').eql(expectUrl);
        res.body.data.shortenLink.should.have.property('urlCode').and.be.ok();
        should.equal(res.body.data.shortenLink.urlCode, urlCode);
        res.body.data.shortenLink.should.have.property('shortUrl').eql(`${baseUrl}/${urlCode}`);
        done();
      });
  });

  it('return different url code for different protocol', (done) => {
    const url = 'https://tiki.vn/';
    const expectUrl = 'https://tiki.vn';

    request.post('/')
      .send({
        query: 'mutation{'
                    + `shortenLink(url: "${url}", baseUrl: "${baseUrl}") { originalUrl urlCode shortUrl }`
                    + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.shortenLink.should.have.property('originalUrl').eql(expectUrl);
        res.body.data.shortenLink.should.have.property('urlCode').and.be.ok();
        should.notEqual(res.body.data.shortenLink.urlCode, urlCode);

        const code = res.body.data.shortenLink.urlCode;
        res.body.data.shortenLink.should.have.property('shortUrl').eql(`${baseUrl}/${code}`);
        done();
      });
  });

  it('return different url code for different www', (done) => {
    const url = 'www.tiki.vn';
    const expectUrl = 'http://www.tiki.vn';

    request.post('/')
      .send({
        query: 'mutation{'
                    + `shortenLink(url: "${url}", baseUrl: "${baseUrl}") { originalUrl urlCode shortUrl }`
                    + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.shortenLink.should.have.property('originalUrl').eql(expectUrl);
        res.body.data.shortenLink.should.have.property('urlCode').and.be.ok();
        should.notEqual(res.body.data.shortenLink.urlCode, urlCode);

        const code = res.body.data.shortenLink.urlCode;
        res.body.data.shortenLink.should.have.property('shortUrl').eql(`${baseUrl}/${code}`);
        done();
      });
  });
});
