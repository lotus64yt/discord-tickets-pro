# discord-tickets-pro
> Discord-tickets-pro is a powerful javascript module for create easely tickets from your discord bot.
> You can join [my discord server](https://discord.gg/x5P9WxynNw) for help and support me

## Instalation
Use ```npm i discord-tickets-pro``` to install the module

## Get started

### Send panel

You can create send the panel ticket using the `TicketPanelEmbed`:
```js
        new TicketPanelEmbed(Client)
            .setChannel("channelId")
            .setGuild("guildId")
            .setComponents([   //Send up to 5 custom ActionRow in your message who can contain buttons and menu
                new Discord.ActionRowBuilder()
                    .setComponents([
                        new Discord.ButtonBuilder()
                            .setLabel("Open a ticket")
                            .setEmoji("🎫")
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setCustomId("ticketOpen")
                    ])
            ])
            .setEmbeds([       //Send up to 5 custom embeds in your message
                new Discord.EmbedBuilder()
                    .setTitle("Discord-tickets-pro")
                    .setDescription("Click the button to talk to the staff")
                    .setFooter({
                        text: `1.0.3`,
                        iconURL: Client.user.avatarURL()
                    })
            ])
            .send()
```

### Tickets manager (Create Ticket)
```js
new TicketsManager(Client)
            .createTicket({
                guild: "guildId",
                interaction: interaction,
                components: [ // Send up to 5 ActionRow for custom Actions
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
                accessMembers: [
                    "memberId1",
                    "memberId2",...
                ],
                embeds: [ // Send up to 5 embeds
                    new Discord.EmbedBuilder()
                        .setTitle("Discord-tickets-pro")
                        .setDescription(`<@${interaction.user.id}> have open a tickets.`)
                ],
                parentId: "parentId" // if null, the ticket will be in a thread
            })
```
### Tickets manager (Archive Ticket) 
> ⚠️ This method is reserved for threads ⚠️
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

### Ticket in Channel
![image](https://github.com/lotus64yt/discord-tickets-pro/assets/114228798/8d51e3ce-b131-412f-8a04-563b5e43f23e)

![image](https://github.com/lotus64yt/discord-tickets-pro/assets/114228798/91d4edcf-bcd2-4aa2-9c2b-6fc5fa7b71a3)

### Ticket in Thread        
![image](https://github.com/lotus64yt/discord-tickets-pro/assets/114228798/9ba025e5-e2ed-4814-b1dc-b5fa4bd32288)

### Transcript
![image](https://github.com/lotus64yt/discord-tickets-pro/assets/114228798/66ccb78f-7c64-4c08-98fb-d9cb0f4955ac)
