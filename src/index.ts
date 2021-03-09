import { Client, Collection, Message } from "discord.js";
import HelloExport from "./commands/hello";
import PollExport from "./commands/poll";
import * as fs from "fs";
import * as path from "path";
import * as config from "./config.json";

console.log("Running....");

const commandList: CommandExport[] = [HelloExport, PollExport];

interface CommandExport {
  name: string;
  description: string;
  execute: (message: Message, args: string[]) => void;
}

interface DiscordClient extends Client {
  commands?: Collection<string, CommandExport>;
}

const client: DiscordClient = new Client();
client.commands = new Collection();

const eventFiles = fs
  .readdirSync(path.join(__dirname, "events"))
  .filter((file) => file.endsWith(".js"));

for (const _file of eventFiles) {
  const event = require(path.join(__dirname, `events/${_file}`));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

for (const command of commandList) {
  if (command !== undefined) {
    client.commands.set(command.name, command);
  }
}

const prefix = "!";

client.on("message", async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift()!.toLowerCase();

  if (command === "hello") {
    if (client.commands) {
      client.commands.get("hello")?.execute(message, args);
    }
  } else if (command === "poll") {
    if (client.commands) {
      client.commands.get("poll")?.execute(message, args);
    }
  }
});

client.login(config.BOT_TOKEN);
