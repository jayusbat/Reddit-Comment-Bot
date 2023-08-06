const snoowrap = require('snoowrap');
const config = require('./config');
const r = new snoowrap({
  userAgent: config.userAgent,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  username: config.username,
  password: config.password
});

async function main() {
  const subredditName = 'SUBREDDIT NAME';
  const timeFrame = 'day'; // 'hour', 'day', 'week', 'month', 'year', 'all'
  const comments = await r.getSubreddit(subredditName).getNewComments({ time: timeFrame });
  comments.forEach(async comment => {
    const commentText = comment.body.toLowerCase();
    if (commentText.endsWith('COMMENT YOU WANT ANSWERED') // || commentText.endsWith('COMMENT YOU WANT ANSWERED 2') || commentText.endsWith('COMMENT YOU WANT ANSWERED 3') || commentText.endsWith('COMMENT YOU WANT ANSWERED 4')) {
      try {
        await comment.reply('ANSWER YOU WANT TO GIVE');
        console.log('Answered comment:', commentText);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
}

main();
