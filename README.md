# discord-tickets-pro
> Discord-tickets-pro is a powerful javascript module for create easely tickets from your discord bot.

## Exemple
```
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
```
> This code will create the base of the message, for send it you just have to put `ticket.send()`

### Details
- `new Tickets(Client)` (Required) : Variable `Client` is your bot client
- `.setGuild(...)` (Required) : Set the guild of the ticket panel
- `.setChannel(...)` (Required) : Set the channel of the ticket panel
- `.setButtonLabel(...)` (Optionnal if emoji set) : Set the button's label
- `.setButtonEmoji(...)` (Optionnal if label set) : Set the button's emoji
- `.setMessage(...)` (Required) : The embed's description
- `.setTitle(...)` (Required) : The embed's title
- `.setThumbnail(...)` (Optionnal) : The embed's thumbnail
- `.setFooter(...)` (Optionnal) : The embed's footer
- `.setCreatedTicketMessage(...)` (Required) : The description of the embed when the ticket is created (See text variables)
- `.setStaffRole(...)` (Required) : The members which have this role will be added in the ticket
