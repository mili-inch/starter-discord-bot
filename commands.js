const { SlashCommandBuilder } = require('discord.js');

const state = {
  span: 600,
  enabledAt: null,
  channel: null,
}

const commands = [
  {
    data: new SlashCommandBuilder()
      .setName('span')
      .setDescription('コメントが削除されるまでの時間(秒)を設定します。')
      .addIntegerOption(option => option.setName('seconds').setDescription('削除までの時間(秒)').setRequired(true).setMinValue(10)),
    execute: async (interaction) => {
      state.span = interaction.options.getInteger('seconds');
      await interaction.reply('コメントが削除されるまでの時間を' + state.span + '秒に設定しました。');
    }
  },
  {
    data: new SlashCommandBuilder().setName('enable').setDescription('コメントの自動削除を有効にします。'),
    execute: async (interaction) => {
      state.enabledAt = Date.now()
      state.channel = interaction.channel;
      await interaction.reply('自動削除が有効化されました。発言されてから' + state.span + '秒後にコメントが削除されます。');
    }
  },
  {
    data: new SlashCommandBuilder().setName('disable').setDescription('コメントの自動削除を無効にします。'),
    execute: async (interaction) => {
      state.enabledAt = null;
      state.channel = null;
      await interaction.reply('自動削除が無効化されました。');
    }
  }
]

module.exports.commands = commands;
module.exports.state = state;