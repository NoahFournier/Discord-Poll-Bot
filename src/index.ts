import { Client, EmojiIdentifierResolvable, MessageEmbed } from "discord.js";
import * as config from "../config.json";

console.log("Running....");

const client = new Client();

const prefix = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

const EmojiList: Array<EmojiIdentifierResolvable> = [
  "\u0031\u20E3",
  "\u0032\u20E3",
  "\u0033\u20E3",
  "\u0034\u20E3",
  "\u0035\u20E3",
  "\u0036\u20E3",
  "\u0037\u20E3",
  "\u0038\u20E3",
  "\u0039\u20E3",
  "\uD83D\uDD1F",
];

const forceEndEmoji: EmojiIdentifierResolvable = "\u2705";

const pollEmbed = new MessageEmbed().setColor("#0099ff");

interface EmojiOptionPair {
  emoji: EmojiIdentifierResolvable;
  option: string;
  votes: number;
}

client.on("message", async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift()!.toLowerCase();

  if (command === "hello") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Hello! This bot has a latency of ${timeTaken}ms.`);
  } else if (command === "poll") {
    const question = args.shift();
    const timeout = 30;

    let text = `*To vote, react using the corresponding emoji*\n\n`;

    if (!question) {
      message.reply("Poll question not given!");
    } else if (question !== undefined) {
      if (args.length < 1) {
        message.reply("Poll choices not given!");
        return;
      }
      if (args.length < 2) {
        message.reply("Please provide more than one option!");
        return;
      }
      if (args.length > EmojiList.length) {
        message.reply(`Please provide ${EmojiList.length} options or less!`);
        return;
      }

      const usedEmojis: Array<EmojiIdentifierResolvable> = new Array();

      for (let i = 0; i < args.length; i++) {
        const emoji = EmojiList[i];
        usedEmojis.push(emoji);
        const pair: EmojiOptionPair = {
          emoji: emoji,
          option: args[i],
          votes: 0,
        };
        text += `${emoji} : \`${args[i]}\`\n\n`;
      }
      usedEmojis.push(forceEndEmoji);

      const poll = await message.channel.send(
        pollEmbed.setTitle(question).setDescription(text)
      );
      for (const emoji of usedEmojis) await poll.react(emoji);

      const reactionCollector = poll.createReactionCollector(
        (reaction, user) =>
          usedEmojis.includes(reaction.emoji.name) && !user.bot,
        { time: timeout * 1000 }
      );
      const voterMap = new Map();
      reactionCollector.on('collect', (reaction, user)=>{
          if (usedEmojis.includes(reaction.emoji.name)) {
              if (reaction.emoji.name == forceEndEmoji && message.author.id == user.id) {
                  return reactionCollector.stop();
              }
              if (!voterMap.has(user.id)) {
                  voterMap.set(user.id, {emoji: reaction.emoji.name});
              }
              const votedEmoji = voterMap.get(user.id).emoji;
              if (votedEmoji !== reaction.emoji.name) {

              }
          }
      })
      message.channel.send(pollEmbed);
    }
  }
});

client.login(config.BOT_TOKEN);
