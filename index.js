const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

client.on("message", (message) => {
    const server = client.guilds.cache.get("824279131617230869");
    
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === "chamada") {
        const canalManha = "824295677835739187";
        const canalTarde = "824299387382923345";
        
        let turno;
        let canal;
        let presentes;

        const agora = new Date;
    
        if (agora.getHours() >= 5 && agora.getHours() < 12) { turno = "manha" }
        else if (agora.getHours() >= 12 && agora.getHours() < 18) { turno = "tarde" }
        
        if (turno === "manha") {
            canal = server.channels.cache.get(canalManha);
        } else if (turno === "tarde") {
            canal = server.channels.cache.get(canalTarde);
        }

        presentes = canal.members;

        for ([memberID, member] of presentes) {
            console.log(member.displayName);
            message.reply(member.displayName)
        }
        
    }
});

client.login(config.BOT_TOKEN);
