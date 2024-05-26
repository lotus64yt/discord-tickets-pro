const { GatewayIntentBits } = require("discord.js")
const Discord = require("discord.js")

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

Client.login("your-token-here")

const Tickets = require("./index")
const { ButtonStyle } = require("discord.js"); // Add this line

Client.on("ready", client => {
    const ticket = new Tickets(Client)
        .setGuild("1096520545656393739")
        .setChannel("1096520546306490390")
        .setButtonLabel("Open Ticket")
        .setButtonStyle(ButtonStyle.Primary)
        .setButtonEmoji("🎫")
        .setMessage("This is the message")
        .setTitle("This is a title")
        .setThumbnail("https://images-ext-1.discordapp.net/external/kpnOMiwK5EiAAtlvLDEQ7k3YAdIfiytCQA7PlVJkoJI/https/cdn.discordapp.com/avatars/922130278443528232/a_86e367b840be27fafa58564086ac4a9d.gif?width=192&height=192")
        .setFooter("discord-tickets-pro")
        .setCreatedTicketMessage("Ticket created by {member}")
        .setStaffRole("1173039883707764797")

    ticket.send()
        .then(() => console.log("Ticket sent"))
        .catch(console.error)
})
