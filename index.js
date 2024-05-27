const Discord = require('discord.js');
const discordTranscript = require("discord-html-transcripts")

class TicketPanelEmbed {
  constructor(client) {
    this.client = client;
    this.channel = null;
    this.actionRows = []
    this.embeds = []

    return this;
  }

  setEmbeds(embed) {
    this.embeds = embed
    return this;
  }

  setChannel(channel) {
    this.channel = channel
    return this;
  }

  setComponents(actionRow) {
    this.actionRows = actionRow

    return this
  }

  async send() {
    if (!this.channel) throw new Error('Channel not set');
    if (!this.embeds) throw new Error("Embed not set");
    if (!this.actionRows) throw new Error("Components not set");

    if (!Array.isArray(this.embeds)) throw new Error("The embed(s) must be in a Array")
    if (!Array.isArray(this.actionRows)) throw new Error("The component(s) must be in an Array")

    return this.channel.send({ embeds: this.embeds, components: this.actionRows });
  }
}

class TicketsManager {
  constructor(client) {
    if (!client) throw new Error("Client not set.")

    this.client = client
  }

  async createTicket({
    guild,
    interaction,
    embeds,
    components,
    accessMembers,
    parentId = null
  }) {
    if (!guild) throw new Error("Guild not set")
    if (!interaction) throw new Error("Interaction not set")
    if (!embeds) throw new Error("Embeds not set")
    if (!components) throw new Error("Components not set")
    if (!accessMembers) throw new Error("Members who have access to ticket not set")

    if (!Array.isArray(embeds)) throw new Error("Embed(s) must be in an Array")
    if (!Array.isArray(components)) throw new Error("Component(s) must be in an Array")
    if (!Array.isArray(accessMembers)) throw new Error("Member(s)'s ids who have access to the ticket must be in an Array")

    if (parentId) {
      await interaction.deferReply({ ephemeral: true })

      let permissions = []

      accessMembers.forEach(e => permissions.push({
        id: e,
        allow: [
          Discord.PermissionFlagsBits.ViewChannel,
          Discord.PermissionFlagsBits.SendMessages
        ]
      }))

      permissions.push({
        id: interaction.guild.id,
        deny: [
          Discord.PermissionFlagsBits.ViewChannel,
          Discord.PermissionFlagsBits.SendMessages
        ]
      })

      await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: Discord.ChannelType.GuildText,
        parent: parentId,
        permissionOverwrites: permissions

      }).then(async e => {
        await e.send({
          content: `<@${interaction.user.id}>`,
          embeds: embeds,
          components: components
        })

        interaction.editReply(`:white_check_mark: <#${e.id}>`)
      })


    } else {
      await interaction.deferReply({ ephemeral: true })

      await interaction.channel.threads.create({
        name: `ticket-${interaction.user.username}`,
        type: Discord.ChannelType.PrivateThread,
        autoArchiveDuration: Discord.ThreadAutoArchiveDuration.OneWeek,
        reason: `User create a ticket`,
      }).then(async e => {
        await e.send({
          content: `<@${interaction.user.id}>`,
          embeds: embeds,
          components: components
        })

        interaction.editReply(`:white_check_mark: <#${e.id}>`)

        accessMembers.forEach(m => {
          e.members.add(m.id)
        })
      })
    }
  }

  async createTranscript({
    channel,
    transcriptChannel,
    interaction
  }) {
    if (!channel) throw new Error("Channel to transcript not set")
    if (!transcriptChannel) throw new Error("Channel to send transcript not set")
    if (!interaction) throw new Error("Interaction not set")

    interaction.reply({content: ":white_check_mark:", ephemeral: true})

    const attachment = await discordTranscript.createTranscript(channel)
    transcriptChannel.send({
      files: [attachment]
    })
  }

  async closeTicket({
    channel,
    interaction,
    ticketCreatorId,
    archiveParent = null,
  }) {
    if (!channel) throw new Error("Channel not set")
    if (!ticketCreatorId) throw new Error("Ticket Creator not set")
    if (channel.type === Discord.ChannelType.PrivateThread) throw new Error("Cannot close a thread ticket, try deleteTicket() method.")

    if (archiveParent) {
      await interaction.reply({ content: ":white_check_mark:", ephemeral: true })

      await channel.setParent(archiveParent)

      await channel.permissionOverwrites.edit(ticketCreatorId, {
        ViewChannel: false
      })

      await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        ViewChannel: false
      })
    } else {
      await interaction.reply({ content: ":white_check_mark:", ephemeral: true })

      await channel.permissionOverwrites.edit(ticketCreatorId, {
        ViewChannel: false
      })

      await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        ViewChannel: false
      })


    }
    await channel.edit({
      name: channel.name.replace("ticket-", "closed-")
    })
  }

  async deleteTicket({
    channel,
    interaction
  }) {
    if (!channel) throw new Error("Channel not set.")
    if (!interaction) throw new Error("Interaction not set")

    await interaction.deferReply({ ephemeral: true })

    await channel.delete()
  }
}

module.exports = {
  TicketPanelEmbed,
  TicketsManager
}
