const { count } = require("console");
const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require('fs');

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "!new-role") {
    msg.channel.send(`What name and color should the role be? Example : RoleName #1ag412`);
    const filter = m => m.author.id === msg.author.id;
    const collector = msg.channel.createMessageCollector(filter, { max: 1, time: 30000 });

    collector.on('collect', m => {
      let args = m.content.split(" #");
      if (args.length !== 2) {
        msg.channel.send(`Incorrect command format. Example : [name] [color]`);
        return;
      }
      let roleName = args[0];
      let roleColor = "#" + args[1];
      let rolemap = msg.guild.roles.cache;
      counter = 0;
      rolemap.forEach(element => {
        counter++;
      })
      counter -= 6;
      msg.guild.roles.create({
        data: {
          name: roleName,
          permissions: [],
          color: roleColor,
          position: counter
        },
        reason: "Created a new role"
      })
        .then(role => {
          role.setHoist(true);
          msg.member.roles.add(role.id);
        })
        .catch(console.log);
    })

    collector.on('end', collected => {
      if (collected.size == 0) {
        msg.channel.send(`Command timed out, please try again`);
      }
    });
  }
  else if (msg.content === "!change-color") {
    msg.channel.send(`Which role and what color? : RoleName #1ag412`);
    const filter = m => m.author.id === msg.author.id;
    const collector = msg.channel.createMessageCollector(filter, { max: 1, time: 30000 });

    collector.on('collect', m => {
      let args = m.content.split(" #");
      if (args.length !== 2) {
        msg.channel.send(`Incorrect command format. Example : [name] [color]`);
        return;
      }
      let roleName = args[0];
      let roleColor = "#" + args[1];
      let rolemap = msg.guild.roles.cache;
      rolemap.forEach(element => {
        if(element.name === roleName) {
          role = msg.guild.roles.cache.get(element.id);
          role.edit({color: roleColor });
        }
      })
    })

    collector.on('end', collected => {
      if (collected.size == 0) {
        msg.channel.send(`Command timed out, please try again`);
      }
    });
  }
  else if (msg.content === "!delete-role") {
    msg.channel.send(`Which role? : Role123`);
    const filter = m => m.author.id === msg.author.id;
    const collector = msg.channel.createMessageCollector(filter, { max: 1, time: 30000 });

    collector.on('collect', m => {
      let args = m.content.split(" ");
      if (args.length !== 1) {
        msg.channel.send(`Incorrect command format. Example : [name]`);
        return;
      }
      let roleName = m.content;
      let rolemap = msg.guild.roles.cache;
      rolemap.forEach(element => {
        if(element.name === roleName) {
          role = msg.guild.roles.cache.get(element.id);
          role.delete();
        }
      })
    })

    collector.on('end', collected => {
      if (collected.size == 0) {
        msg.channel.send(`Command timed out, please try again`);
      }
    });
  }
});
client.login(process.env.bot_secret);