const Discord = require('discord.js');

module.exports = class Tickets {
  constructor(client) {
    this.client = client;
    this.guild = null;
    this.channel = null;
    this.message = null;
    this.button = {
      label: null,
      style: null,
      emoji: null,
    };
    this.staffRole = null
    this.createdTicket = {
      message: null
    }

    return this;
  }

  setGuild(guildId) {
    this.guild = this.client.guilds.cache.get(guildId);

    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setFooter(footer) {
    this.footer = footer;
    return this;
  }

  setChannel(channelId) {
    this.channel = this.guild.channels.cache.get(channelId);
    return this;
  }

  setButtonLabel(label) {
    this.button.label = label;
    return this;
  }

  setButtonStyle(style) {
    this.button.style = style;
    return this
  }

  setButtonEmoji(emoji) {
    this.button.emoji = emoji;
    return this;
  }

  setStaffRole(role) {
    const Role = this.guild.roles.cache.get(role);
    this.staffRole = Role;
    return this;
  }

  setCreatedTicketMessage(message) {
    this.createdTicket.message = message;
    return this;
  }

  async send() {
    if (!this.guild) throw new Error('Guild not set');
    if (!this.channel) throw new Error('Channel not set');
    if (!this.button.label && !this.button.emoji) throw new Error('Button label or emoji not set')
    if (!this.button.style) throw new Error('Button style not set');
    if (!this.createdTicket.message) throw new Error('Created ticket message not set');

    const button = new Discord.ButtonBuilder()
      .setStyle(this.button.style)
      .setLabel(this.button.label)
      .setEmoji(this.button.emoji)
      .setCustomId('ticketOpen');

    const row = new Discord.ActionRowBuilder().setComponents(button);

    const embed = new Discord.EmbedBuilder()
      .setTitle(this.title)
      .setDescription(this.message)
      .setThumbnail(this.thumbnail)
      .setColor(this.color ?? "#ADD8E6")
      .setFooter({ text: this.footer + " ", iconURL: this.client.user.avatarURL() });

    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return;

      if (interaction.guildId !== this.guild.id) throw new Error('This button is not available in this server')

      if (interaction.customId === "ticketClose") {
        interaction.reply(`Ce ticket sera supprimé dans <t:${Math.floor((Date.now() + 5000) / 1000)}:R> secondes`)

        setTimeout(() => {
          interaction.channel.delete()
        }, 5000)
      }

      if (interaction.customId === 'ticketOpen') {
        await interaction.guild.members.fetch()
        const role = await this.guild.roles.fetch(this.staffRole.id);

        if (!role) throw new Error('Role not found');

        interaction.deferReply({ ephemeral: true });

        await interaction.channel.threads.create({
          name: `ticket-${interaction.user.username}`,
          type: Discord.ChannelType.PrivateThread,
          autoArchiveDuration: Discord.ThreadAutoArchiveDuration.OneWeek,
          reason: `User create a ticket`,
        }).then(async e => {


          e.send({
            content: `<@${interaction.user.id}>`,
            embeds: [
              new Discord.EmbedBuilder()
                .setColor(this.color ?? "#ADD8E6")
                .setTitle(this.title)
                .setDescription(this.createdTicket.message.replaceAll('{member}', `<@${interaction.user.id}>`).replaceAll("{member.id}", interaction.user.id).replaceAll("{member.username}", interaction.user.username))
                .setFooter({ text: this.footer + " ", iconURL: this.client.user.avatarURL() })
                .setTimestamp()
            ],
            components: [
              new Discord.ActionRowBuilder()
                .setComponents([
                  new Discord.ButtonBuilder()
                    .setCustomId('ticketClose')
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji('🚮')
                ])
            ]
          })

          const staff = await role.members

          staff.forEach(member => {
            e.members.add(member.id)
          })

          interaction.editReply({ content: `:white_check_mark: <#${e.id}>`, ephemeral: true });
        })
      }
    });

    return this.channel.send({ embeds: [embed], components: [row] });
  }
}
