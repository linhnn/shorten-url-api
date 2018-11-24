describe('URL Query', () => {
  let request, url1, url2, url3, urlCode;

  before(async () => {
    request = require('supertest')(graphqlUrl);

    url1 = await tiki.repo.test.createUrl({ count: 0 });
    url2 = await tiki.repo.test.createUrl({ count: 0 });
    url3 = await tiki.repo.test.createUrl({ count: 100 });
    urlCode = `${url1.urlCode},${url2.urlCode}`;
  });

  after(async () => {
    await Url.remove({});
  });

  it('urls by code', (done) => {
    request.post('/')
      .send({
        query: '{'
                + `urls(urlCodes: "${urlCode}") {  originalUrl urlCode shortUrl count }`
                + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.urls.should.be.an.Array;
        res.body.data.urls.should.have.length(2);

        res.body.data.urls[0].should.have.property('originalUrl').eql(url2.originalUrl);
        res.body.data.urls[0].should.have.property('urlCode').eql(url2.urlCode);
        res.body.data.urls[0].should.have.property('shortUrl').eql(url2.shortUrl);
        res.body.data.urls[0].should.have.property('count').eql(0);

        res.body.data.urls[1].should.have.property('originalUrl').eql(url1.originalUrl);
        res.body.data.urls[1].should.have.property('urlCode').eql(url1.urlCode);
        res.body.data.urls[1].should.have.property('shortUrl').eql(url1.shortUrl);
        res.body.data.urls[1].should.have.property('count').eql(0);
        done();
      });
  });

  it('top urls', (done) => {
    request.post('/')
      .send({
        query: '{'
                + 'urlsTop(number: 10) {  originalUrl urlCode shortUrl count }'
                + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.urlsTop.should.be.an.Array;
        res.body.data.urlsTop.should.have.length(3);

        res.body.data.urlsTop[0].should.have.property('originalUrl').eql(url3.originalUrl);
        res.body.data.urlsTop[0].should.have.property('urlCode').eql(url3.urlCode);
        res.body.data.urlsTop[0].should.have.property('shortUrl').eql(url3.shortUrl);
        res.body.data.urlsTop[0].should.have.property('count').eql(100);

        res.body.data.urlsTop[1].should.have.property('originalUrl').eql(url1.originalUrl);
        res.body.data.urlsTop[1].should.have.property('urlCode').eql(url1.urlCode);
        res.body.data.urlsTop[1].should.have.property('shortUrl').eql(url1.shortUrl);
        res.body.data.urlsTop[1].should.have.property('count').eql(0);

        res.body.data.urlsTop[2].should.have.property('originalUrl').eql(url2.originalUrl);
        res.body.data.urlsTop[2].should.have.property('urlCode').eql(url2.urlCode);
        res.body.data.urlsTop[2].should.have.property('shortUrl').eql(url2.shortUrl);
        res.body.data.urlsTop[2].should.have.property('count').eql(0);
        done();
      });
  });

  it('url by code', (done) => {
    request.post('/')
      .send({
        query: '{'
                + `url(urlCode: "${url1.urlCode}") {  originalUrl urlCode shortUrl count }`
                + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.url.should.have.property('originalUrl').eql(url1.originalUrl);
        res.body.data.url.should.have.property('urlCode').eql(url1.urlCode);
        res.body.data.url.should.have.property('shortUrl').eql(url1.shortUrl);
        res.body.data.url.should.have.property('count').eql(1);
        done();
      });
  });
});
