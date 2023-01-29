require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID
const TOKEN = process.env.TOKEN
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { commands, state } = require('./commands.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

commands.forEach(command => {
  client.commands.set(command.data.name, command);
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(TOKEN);

setInterval(async () => {
  if (state.enabledAt) {
    let messages = [];
    try {
      messages = await state.channel.messages.fetch({ limit: 50 })
    } catch (error) {
      console.error(error)
    }
    try {
      state.channel.bulkDelete(messages.filter(message => message.createdTimestamp > state.enabledAt && message.createdTimestamp < Date.now() - state.span * 1000))
    } catch (error) {
      console.error(error)
    }
  }
}, 1000)