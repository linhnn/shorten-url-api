const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const shortid = require('shortid');
const request = require('request');
const cheerio = require('cheerio');
const UrlType = require('../types/UrlType');
const { isValidUrl, isProtocolUrl } = require('../../utils/string');

module.exports = {
  type: UrlType,
  description: 'Rút gọn link',
  args: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'URL',
    },
    baseUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Base URL',
    },
  },
  async resolve(root, { url, baseUrl }) {
    try {
      // check valid url
      if (!isValidUrl(url)) {
        return tiki.error(tiki.errors.urlNotValid);
      }

      // check url has protocol
      let originalUrl = url.replace(/\/$/, '');
      if (!isProtocolUrl(originalUrl)) {
        originalUrl = `http://${originalUrl}`;
      }

      // shortten url
      let entry = await Url.findOne({ originalUrl });
      if (!entry) {
        const urlCode = shortid.generate();
        const shortUrl = `${baseUrl}/${urlCode}`;
        entry = await Url.create({
          originalUrl,
          urlCode,
          shortUrl,
        });
      }

      request(originalUrl, async function (error, response, body) {
         if (!error && response.statusCode == 200) {
           const $ = cheerio.load(body);
           const title = $("title").text();
           await Url.update({_id: entry._id }, {$set: { title }}, {upsert: false, multi: true})
         }
       });

      // send email
      const subscribes = await Subscribe.find();
      subscribes.forEach((s) => {
        tiki.repo.subscribe.sendEmailNewUrl({
          email: s.email,
          originalUrl: entry.originalUrl,
          shortUrl: entry.shortUrl,
        });
      });

      return entry;
    } catch (error) {
      tiki.log.error(error);
      throw error;
    }
  },
};
