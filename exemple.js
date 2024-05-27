const { GatewayIntentBits } = require("discord.js")
const Discord = require("discord.js")
const { TicketPanelEmbed, TicketsManager } = require("./index")

const Client = new Discord.Client({
    intents: GatewayIntentBits.Guilds
        | GatewayIntentBits.GuildMembers
        | GatewayIntentBits.GuildModeration
        | GatewayIntentBits.GuildEmojisAndStickers
        | GatewayIntentBits.GuildIntegrations
        | GatewayIntentBits.GuildInvites
        | GatewayIntentBits.GuildVoiceStates
        | GatewayIntentBits.GuildMessages
        | GatewayIntentBits.GuildMessageReactions
        | GatewayIntentBits.GuildScheduledEvents
        | GatewayIntentBits.GuildWebhooks
        | GatewayIntentBits.DirectMessages
        | GatewayIntentBits.DirectMessageReactions
        | GatewayIntentBits.AutoModerationConfiguration
        | GatewayIntentBits.AutoModerationExecution
        | GatewayIntentBits.MessageContent
});

Client.login("Your token here")

// You can access the TicketsManager in the client if you do this :
// Client.TicketsManager = new TicketsManager(Client)

Client.on("ready", () => console.log("Ready"))

Client.on("interactionCreate", async interaction => {
    if (interaction.customId === "ticketOpen") {
        await interaction.guild.members.fetch() // If you map the members who have a role

        const members = interaction.guild.roles.cache.get("1173039883707764797").members.map(e => e.user)

        new TicketsManager(Client)
            .createTicket({
                guild: "guildId",
                interaction: interaction,
                components: [
                    new Discord.ActionRowBuilder()
                        .setComponents([
                            new Discord.ButtonBuilder()
                                .setEmoji("🚮")
                                .setStyle(Discord.ButtonStyle.Danger)
                                .setCustomId("ticketDelete"),
                            new Discord.ButtonBuilder()
                                .setCustomId("ticketArchive")
                                .setEmoji("⛔")
                                .setStyle(Discord.ButtonStyle.Primary),
                            new Discord.ButtonBuilder()
                                .setCustomId("ticketTranscript")
                                .setEmoji("🪪")
                                .setStyle(Discord.ButtonStyle.Secondary)
                        ])
                ],
                accessMembers: members, //user objects (Array)
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle("Discord-tickets-pro")
                        .setDescription(`<@${interaction.user.id}> have open a ticket.`)
                ],
                //  parentId: "1222274711182901349" // if null, the ticket will be in a thread
            })
    } else if (interaction.customId === "ticketArchive") { // dont work on threads
        new TicketsManager(Client)
            .closeTicket({
                interaction: interaction,
                channel: interaction.channel,
                ticketCreatorId: "755054105713704960",
                archiveParent: interaction.channel.parent // the channel parent object, can be null
            })
    } else if (interaction.customId === "ticketDelete") {
        new TicketsManager(Client)
            .deleteTicket({
                channel: interaction.channel,
                interaction: interaction
            })
    } else if (interaction.customId === "ticketTranscript") {
        new TicketsManager(Client)
            .createTranscript({
                channel: interaction.channel, // the channel to "copy" in the transcript
                transcriptChannel: interaction.channel, // channel object,
                interaction: interaction
            })
    }
})

Client.on("messageCreate", async message => {
    if (message.author.bot) return

    if (message.content.startsWith("!panel_tickets")) {

        const panel = new TicketPanelEmbed(Client)
            .setChannel(message.channel)
            .setComponents([
                new Discord.ActionRowBuilder()
                    .setComponents([
                        new Discord.ButtonBuilder()
                            .setLabel("Open a ticket")
                            .setEmoji("🎫")
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setCustomId("ticketOpen")
                    ])
            ])
            .setEmbeds([
                new Discord.EmbedBuilder()
                    .setTitle("Discord-tickets-pro")
                    .setDescription("Click the button to talk to the staff")
                    .setFooter({
                        text: `1.0.3`,
                        iconURL: Client.user.avatarURL()
                    })
            ])

            await panel.send()

            message.reply(":white_check_mark: Panel sended")
    }
})
