const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const UrlType = require('./../types/UrlType');

module.exports = {
  urls: {
    type: new GraphQLList(UrlType),
    description: 'Trả về các url được tạo ra bỏi người dùng',
    args: {
      urlCodes: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'URL',
      },
    },
    async resolve(root, { urlCodes }) {
      try {
        const urlArr = urlCodes.split(',');
        const query = { urlCode: { $in: urlArr } };
        return Url.find(query).sort({ createdAt: -1 }).limit(10);
      } catch (error) {
        tiki.log.error(error);
        throw error;
      }
    },
  },

  urlsTop: {
    type: new GraphQLList(UrlType),
    description: 'Top urls được truy cập nhiều nhất',
    args: {
      number: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'Số URL muốn lấy',
      },
    },
    async resolve(root, { number }) {
      try {
        return Url.find().sort({ count: -1 }).limit(number);
      } catch (error) {
        tiki.log.error(error);
        throw error;
      }
    },
  },

  url: {
    type: UrlType,
    description: 'Trả về thông tin của URL',
    args: {
      urlCode: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'URL',
      },
    },
    async resolve(root, { urlCode }) {
      try {
        // check url
        const url = await Url.findOne({ urlCode });
        if (!url) {
          return tiki.error(tiki.errors.urlCodeNotExist);
        }

        // update url visit
        url.count += 1;
        await url.save();

        return url;
      } catch (error) {
        tiki.log.error(error);
        throw error;
      }
    },
  },
};
