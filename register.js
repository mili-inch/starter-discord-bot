require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID
const TOKEN = process.env.TOKEN
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID

const { REST, Routes } = require('discord.js');
const { commands } = require('./commands.js');

const rest = new REST({ version: '10' }).setToken(TOKEN);
(async () => {
  const data = await rest.put(
    Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
    { body: commands.map(command => command.data.toJSON()) },
  );
  console.log(data)
})()