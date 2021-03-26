const Discord = require("discord.js");
const config = require("./config.json");
const fs = require('fs');

const client = new Discord.Client();

const prefix = "!";

client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    
    const server = client.guilds.cache.get(message.guild.id);

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === "chamada") {
        const argCanal = args[0];

        let canal;
        let membros;
        let presentes = [];

        if (argCanal) {
            canal = server.channels.cache.get(argCanal);
        }

        membros = canal.members;
        console.log(membros.length);

        fs.open('chamada.txt', 'w', (err) => {
            if (err) throw err;
            console.log("File Created!!!");
        })

        for ([memberID, member] of membros) {
            console.log(member.displayName);
            message.reply(member.displayName);

            presentes.push(member.displayName);
        }

        presentes.sort();

        for (presente of presentes) {
            fs.appendFile('chamada.txt', presente + "\n", (err) => {
                if (err) throw err;
                console.log("File Updated!!");
            })
        }       
        
        message.channel.send("Olha o arquivo aí", { files: ["./chamada.txt"] });
    }
});

client.login(config.BOT_TOKEN);
