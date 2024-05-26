# discord-tickets-pro
> Discord-tickets-pro is a powerful javascript module for create easely tickets from your discord bot.
> You can join [my discord server](https://discord.gg/x5P9WxynNw) for more imformation

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
- `.setCreatedTicketMessage(...)` (Required) : The description of the embed when the ticket is created (See [Text variables](https://github.com/lotus64yt/discord-tickets-pro/blob/main/README.md#text-variables))
- `.setStaffRole(...)` (Required) : The members which have this role will be added in the ticket

## Text variables
> Only enabled for the `.setCreatedTicketMessage(...)`

- {member} : User mention
- {member.id} : User's id
- {member.username} : User's username

## Images
> With this code </br>
![image](https://github.com/lotus64yt/discord-tickets-pro/assets/114228798/1af9e118-08f2-4496-a121-c5e9e991e44b)

> You will have this result</br>
![image](https://github.com/lotus64yt/discord-tickets-pro/assets/114228798/7a865909-ab37-4c37-9b4f-0d0a4fcce9fa)


> And when a user open a ticket <br/>
![image](https://github.com/lotus64yt/discord-tickets-pro/assets/114228798/b3b6149d-d548-4c2b-b4aa-0fee0f3f64f0)
