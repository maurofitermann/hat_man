const usernamesLog = require("../../schemas/usernames-log-model")

module.exports = async (client, message) => {

    if(message.author.id!=client.user.id){

        const member = message.guild.members.cache.get(message.author.id);
	    const nickname = member ? member.nickname : null;
		const docu = await usernamesLog.findOne({discordId: message.author.id})

        if(!docu){usernamesLog.create({
            discordId:message.author.id,
            usernames:[message.author.username, nickname]})
        }else{
            if(!docu.usernames.includes(nickname)){
                await usernamesLog.findOneAndUpdate(
                    {discordId: message.author.id},
                    {$push:{usernames: nickname}})
                }
                if(!docu.usernames.includes(message.author.username)){
                    await usernamesLog.findOneAndUpdate(
                        {discordId: message.author.id},
                        {$push:{usernames: message.author.username}})
                    }
        }

    }

}