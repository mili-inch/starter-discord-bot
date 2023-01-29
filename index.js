
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID
const TOKEN = process.env.TOKEN
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID

const { Client, ClientApplication } = require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {import("discord.js").ApplicationCommandData[]} commands 
 * @param {import("discord.js").Snowflake} guildID 
 * @returns {Promise<import("@discordjs/collection").Collection<string,import("discord.js").ApplicationCommand>>}
 */
async function register(client, commands, guildID) {
  if (guildID == null) {
    return client.application.commands.set(commands);
  }
  return client.application.commands.set(commands, guildID);
}
const ping = {
  name: "ping",
  description: "pong!",
};
const hello = {
  name: "hello",
  description: "botがあなたに挨拶します。",
  options: [
    {
      type: "STRING",
      name: "language",
      description: "どの言語で挨拶するか指定します。",
      required: true,
      choices: [
        {
          name: "English",
          value: "en"
        },
        {
          name: "Japanese",
          value: "ja"
        }
      ],
    }
  ]
};
const commands = [ping, hello];
const client = new Client({
  intents: 0,
});
client.token = APPLICATION_ID;
async function main() {
  client.application = new ClientApplication(client, {});
  await client.application.fetch();
  await register(client, commands, GUILD_ID);
  console.log("registration succeed!");
}
main().catch(err => console.error(err));