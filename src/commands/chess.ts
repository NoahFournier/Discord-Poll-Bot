import { Message, MessageEmbed } from "discord.js";
import * as axios from "axios";
import * as config from "../config.json";

const urlPrefix = "https://lichess.org";

const authToken = config.LICHESS_TOKEN;

interface UserSchema {
  data: {
    id: string;
    username: string;
    online: boolean;
    profile?: {
      country: string;
      location: string;
    };
  };
}

interface ChallengeSchema {
  data: {
    challenge: {
      url: string;
      timeControl: {
        increment: number;
        limit: number;
        show: number;
      };
      speed: string;
      status: string;
    };
  };
}

const ChessExport = {
  name: "chess",
  description: "Lichess Feature",
  execute(message: Message, args: string[]) {
    // for now, just display user public data
    const get = async function (message: Message, args: string[]) {
      const resp: UserSchema = await axios.default.get(
        `${urlPrefix}/api/user/${args[0]}`
      );

      message.channel.send(
        new MessageEmbed()
          .setColor("#0099ff")
          .setTitle(`${resp.data.username}`)
          .setDescription(`Online: ${resp.data.online}\n`)
      );
    };

    const challenge = async function (message: Message, _args: string[]) {
      // args 0 is clock limit
      // args 1 is clock increment
      //

      const resp: ChallengeSchema = await axios.default.post(
        `${urlPrefix}/api/challenge/open`,
        JSON.stringify({
          "clock.limit": parseInt(args[0]),
          "clock.increment": parseInt(args[1]),
        }),
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(resp.data);
      message.channel.send(
        new MessageEmbed()
          .setTitle("Challenge sent")
          .setDescription(
            `Follow the link to start the challenge\nClock: ${resp.data.challenge.timeControl.show}\n${resp.data.challenge.url}`
          )
      );
    };

    const selection = args.shift()!.toLowerCase();

    if (selection === "get") {
      get(message, args);
    } else if (selection === "challenge") {
      challenge(message, args);
    }
  },
};

export default ChessExport;
