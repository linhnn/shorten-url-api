const SubscribeRepository = {
  /**
    * Send Email New Url
    * @param email
    * @param originalUrl
    * @param shortUrl
  */
  async sendEmailNewUrl({ email, originalUrl, shortUrl }) {
    try {
      const objEmail = {
        from: process.env.gmail_username,
        to: email,
        subject: 'New URL',
        html: `
        <p>New URL: ${shortUrl} (${originalUrl})</p>
        `,
      };
      tiki.service.email(objEmail);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = SubscribeRepository;
