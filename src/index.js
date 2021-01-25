"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var config = __importStar(require("../config.json"));
console.log("Running....");
var client = new discord_js_1.Client();
var prefix = "!";
client.on("ready", function () {
    var _a;
    console.log("Logged in as " + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag));
});
var EmojiList = [
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
var forceEndEmoji = "\u2705";
var pollEmbed = new discord_js_1.MessageEmbed().setColor("#0099ff");
client.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var args, command, timeTaken, question, timeout, text, usedEmojis_2, i, emoji, pair, poll, _i, usedEmojis_1, emoji, reactionCollector_1, voterMap_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (message.author.bot || !message.content.startsWith(prefix))
                    return [2 /*return*/];
                args = message.content.slice(prefix.length).trim().split(" ");
                command = args.shift().toLowerCase();
                if (!(command === "hello")) return [3 /*break*/, 1];
                timeTaken = Date.now() - message.createdTimestamp;
                message.reply("Hello! This bot has a latency of " + timeTaken + "ms.");
                return [3 /*break*/, 8];
            case 1:
                if (!(command === "poll")) return [3 /*break*/, 8];
                question = args.shift();
                timeout = 30;
                text = "*To vote, react using the corresponding emoji*\n\n";
                if (!!question) return [3 /*break*/, 2];
                message.reply("Poll question not given!");
                return [3 /*break*/, 8];
            case 2:
                if (!(question !== undefined)) return [3 /*break*/, 8];
                if (args.length < 1) {
                    message.reply("Poll choices not given!");
                    return [2 /*return*/];
                }
                if (args.length < 2) {
                    message.reply("Please provide more than one option!");
                    return [2 /*return*/];
                }
                if (args.length > EmojiList.length) {
                    message.reply("Please provide " + EmojiList.length + " options or less!");
                    return [2 /*return*/];
                }
                usedEmojis_2 = new Array();
                for (i = 0; i < args.length; i++) {
                    emoji = EmojiList[i];
                    usedEmojis_2.push(emoji);
                    pair = {
                        emoji: emoji,
                        option: args[i],
                        votes: 0,
                    };
                    text += emoji + " : `" + args[i] + "`\n\n";
                }
                usedEmojis_2.push(forceEndEmoji);
                return [4 /*yield*/, message.channel.send(pollEmbed.setTitle(question).setDescription(text))];
            case 3:
                poll = _a.sent();
                _i = 0, usedEmojis_1 = usedEmojis_2;
                _a.label = 4;
            case 4:
                if (!(_i < usedEmojis_1.length)) return [3 /*break*/, 7];
                emoji = usedEmojis_1[_i];
                return [4 /*yield*/, poll.react(emoji)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
                reactionCollector_1 = poll.createReactionCollector(function (reaction, user) {
                    return usedEmojis_2.includes(reaction.emoji.name) && !user.bot;
                }, { time: timeout * 1000 });
                voterMap_1 = new Map();
                reactionCollector_1.on('collect', function (reaction, user) {
                    if (usedEmojis_2.includes(reaction.emoji.name)) {
                        if (reaction.emoji.name == forceEndEmoji && message.author.id == user.id) {
                            return reactionCollector_1.stop();
                        }
                        if (!voterMap_1.has(user.id)) {
                            voterMap_1.set(user.id, { emoji: reaction.emoji.name });
                        }
                        var votedEmoji = voterMap_1.get(user.id).emoji;
                        if (votedEmoji !== reaction.emoji.name) {
                        }
                    }
                });
                message.channel.send(pollEmbed);
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
client.login(config.BOT_TOKEN);
