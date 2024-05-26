# discord-tickets-pro
> Discord-tickets-pro is a powerful javascript module for create easely tickets from your discord bot.

## Exemple
```
const ticket = new Tickets(Client)
        .setGuild("1096520545656393739")
        .setButtonLabel("Open Ticket")
        .setButtonStyle(ButtonStyle.Primary)
        .setButtonEmoji("🎫")
        .setChannel("1096520546306490390")
        .setMessage("Test module")
        .setTitle("Test du module")
        .setThumbnail("https://images-ext-1.discordapp.net/external/kpnOMiwK5EiAAtlvLDEQ7k3YAdIfiytCQA7PlVJkoJI/https/cdn.discordapp.com/avatars/922130278443528232/a_86e367b840be27fafa58564086ac4a9d.gif?width=192&height=192")
        .setFooter("discord-tickets-pro")
        .setCreatedTicketMessage("Ticket created by {member}")
        .setStaffRole("1173039883707764797")
```
> This code will create the base of the message, for send it you just have to put `ticket.send()`

### Details
