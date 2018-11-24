const Cronjob = require('cron').CronJob;

const checkUrlInWeek = new Cronjob({
  cronTime: '0 0 * * *', // run at mid night
  onTick: async () => {
    try {
      const today = new Date();
      const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
      const start = new Date(lastWeekStart.setHours(0, 0, 0, 0));

      const urls = await Url.find({
        updatedAt: { $lte: start },
      });
      const ids = urls.map(url => url._id);
      await Url.remove({ _id: { $in: ids } });
    } catch (e) {
      throw new Error('Check url in week fail');
    }
  },
});

/* eslint-disable */
console.log('check cronjob status', checkUrlInWeek.running);
checkUrlInWeek.start();
console.log('check cronjob status', checkUrlInWeek.running);

module.exports = {
  cronJob: checkUrlInWeek,
};
