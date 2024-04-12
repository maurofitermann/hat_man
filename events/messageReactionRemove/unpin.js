module.exports = async (client, reaction, user) =>{
    try {
        if (user.id !== client.user.id && reaction.emoji.name== '📌' ) {
            console.log(`${user.username} voted to unpin message: ${reaction.message.content}`)
            reaction.message.reply(`${user.username} voted to unpin this message`)
            if(reaction.count<2){
                reaction.message.unpin()
            }
        }
    } catch (error) {
        console.log(error)
    }
}