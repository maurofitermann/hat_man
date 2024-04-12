const { ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    deleted: true,
    name:'buscaparadas',
    description: 'searches for bus stops in a radius r of point p',
    options:[
        {
        name:"max-distance",
        description:"how long will you walk to or from a bus stop? In km please",
        type: ApplicationCommandOptionType.Number
        },
        {
            name:"latitude",
            required: true,
            type: ApplicationCommandOptionType.Number
            },
        {
            name:"longitude",
            required: true,
            type: ApplicationCommandOptionType.Number
            }
    ],

    callback:(client, interaction) => {
        const haversineDistance = require("../../utils/haversineDistance")
        const stops = require("../../transportedata/paradas.json")
        let paradasCercanas = []
        
        const maxDistance = interaction.options.get('max-distance') ? interaction.options.get('max-distance') : 1;
        
        for ( const stop of stops ) {
            const distance = haversineDistance(casas.Mauro[0], casas.Mauro[1], parada.location.coordinates[1], parada.location.coordinates[0])
            if (distancia < maxDistance){
                stop.distance = distance
                paradasCercanas.push(stop)
        }
        paradasCercanas = paradasCercanas.sort( (a, b) => a.distancia - b.distancia )
    }
        console.log(`encontramos ${paradasCercanas.length} paradas cercanas en un radio de ${maxDistance}km.`)
        console.log("Las paradas cercanas son:")
        console.log(paradasCercanas)
        interaction.reply(`check your console ig`)
    }
}