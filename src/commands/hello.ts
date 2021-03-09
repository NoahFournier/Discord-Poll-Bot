import { Message } from "discord.js";

const HelloExport = {
  name: "hello",
  description: "Hello!",
  execute(message: Message, _args: string[]) {
    const timeTaken = message.createdTimestamp - Date.now();
    message.reply(`Hello! This bot has a latency of ${timeTaken}ms`);
  },
};

export default HelloExport;
