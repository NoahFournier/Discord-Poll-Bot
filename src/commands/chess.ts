import { Message } from "discord.js";

const ChessExport = {
  name: "chess",
  description: "Lichess Feature",
  execute(message: Message, args: string[]) {
    console.log("test");
  },
};

export default ChessExport;
