const { Telegraf } = require('telegraf');
const User = require('./models/User');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const userId = String(ctx.from.id);
  const refId = ctx.message.text.split(' ')[1];

  let user = await User.findOne({ telegramId: userId });
  if (!user) {
    user = new User({ telegramId: userId, referredBy: refId || null });
    await user.save();

    // If user was referred and not self-referred
    if (refId && refId !== userId) {
      const refUser = await User.findOne({ telegramId: refId });
      if (refUser) {
        refUser.referrals += 1;
        refUser.points += 10; // Reward points
        await refUser.save();
      }
    }
  }

  ctx.reply(`👋 Welcome to the bot!
Here is your referral link:
https://t.me/${ctx.me}?start=${userId}`);
});

bot.command('points', async (ctx) => {
  const user = await User.findOne({ telegramId: String(ctx.from.id) });
  ctx.reply(`🏆 You have ${user?.points || 0} points.`);
});

bot.command('help', (ctx) => {
  ctx.reply("💡 Invite friends using your referral link and earn 10 points for each successful referral.");
});

module.exports = bot;