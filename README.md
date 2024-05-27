# discord-tickets-pro
> Discord-tickets-pro is a powerful javascript module for create easely tickets from your discord bot.
> You can join [my discord server](https://discord.gg/x5P9WxynNw) for help and support me

## Instalation
Use ```npm i discord-tickets-pro``` to install the module

## Get started

### Send panel

You can create send the panel ticket using the `TicketPanelEmbed`:
```js
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
```

### Tickets manager (Create Ticket)
```js
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
                parentId: "1222274711182901349" // if null, the ticket will be in a thread
            })
```
### Tickets manager (Archive Ticket) 
> ⚠️ This method is reserved for channel not threads ⚠️
This method will close the ticket (no delete it), the manager will :
- Rename the channel (`ticket-` -> `closed-`)
- Deny the member who open the ticket the permission of view the channel
- Move to the given channel parent

```js
new TicketsManager(Client)
            .closeTicket({
                interaction: interaction,
                channel: interaction.channel,
                ticketCreatorId: "memberId", // the Id of the member who opened the ticket
                archiveParent: interaction.channel.parent // the channel parent object, can be null
            })
```

### Tickets manager (Create Transcript)
> This method use an [external module](https://www.npmjs.com/package/discord-html-transcripts)

```js
new TicketsManager(Client)
            .createTranscript({
                channel: interaction.channel, // the channel to "copy" in the transcript
                transcriptChannel: interaction.channel // channel object
            })
```

### Tickets manager (Delete Ticket)
> ⚠️ This method will delete the ticket, you can access the channel after ⚠️

```js
new TicketsManager(Client)
            .deleteTicket({
                channel: interaction.channel,
                interaction: interaction
            })
```



## Images
> The images are corresponding to the [exemple code](https://github.com/lotus64yt/discord-tickets-pro/blob/main/exemple.js)</br>

![alt text](image.png)


![image](https://github.com/lotus64yt/discord-tickets-pro/assets/114228798/b3b6149d-d548-4c2b-b4aa-0fee0f3f64f0)
