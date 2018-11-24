const faker = require('faker');

describe('Subscribe Email', () => {
  let request;

  before(async () => {
    request = require('supertest')(graphqlUrl);
  });

  after(async () => {
    await Subscribe.remove({});
  });

  it('email not valid', (done) => {
    const email = faker.name.findName();

    request.post('/')
      .send({
        query: 'mutation{'
                    + `subscribeEmail(email: "${email}") { email }`
                    + '}',
      })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].name.should.be.eql(tiki.errors.emailNotValid);
        done();
      });
  });

  it('email valid', (done) => {
    const email = faker.internet.email();

    request.post('/')
      .send({
        query: 'mutation{'
                    + `subscribeEmail(email: "${email}") { email }`
                    + '}',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(res.error.text);
        res.body.data.subscribeEmail.should.have.property('email').eql(email);
        done();
      });
  });
});
