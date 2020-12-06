const Discord = require('discord.js');
//CodeArius - AlieN

exports.run = (client, message, args) => { //CodeArius - AlieN
 
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Bu Komut Yetkililere Özeldir Sen Yetkili Olmadığın İçin Kullanamazsın.')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Yetkilerim çok az bu işlemi yapamamaktayım maalesef') 

//CodeArius - AlieN //CodeArius - AlieN  //CodeArius - AlieN //CodeArius - AlieN //CodeArius - AlieN

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); //CodeArius - AlieN

        if(!args[0]) return message.channel.send('Kullanıcı Belirtmeyi Unuttun Sanki?'); //CodeArius - AlieN

        if(!member) return message.channel.send('Banlamak İstediğin Kullanıcıyı Bulamıyorum Doğru Kişiyi Aradığına Eminmisin?');
        if(!member.bannable) return message.channel.send('Bu Kullanıcı Yasaklanamaz. Mod & Yönetici Oldukları İçin Yada En Yüksek Rolleri Benimkinden Daha Yüksek Oldundan Banlayamamaktayım.');

        if(member.id === message.author.id) return message.channel.send('Dostum Kendini Yasaklamayamı Çalıştın Sen?.'); //CodeArius - AlieN

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'belirtilmemiş';

        member.ban({reason:`${reason}`})
        .catch(err => {
            if(err) return message.channel.send('Bazı Şeyler Ters Gitti Sanırsam?')
        })

        const banembed = new Discord.MessageEmbed() //CodeArius - AlieN
        .setTitle('Üye Yasaklandı')
        .setThumbnail(member.user.displayAvatarURL()) //CodeArius - AlieN
        .addField('Kullanıcı Yasaklandı', member) //CodeArius - AlieN
        .addField('Tarafından atıldı', message.author)
        .addField('Sebebi', reason) //CodeArius - AlieN
        .setFooter('Kullanıcı Banlandı', client.user.displayAvatarURL()) //CodeArius - AlieN
           const exampleEmbed = new Discord.MessageEmbed() //CodeArius - AlieN


        message.channel.send(banembed);


    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ban'], //CodeArius - AlieN
    permLevel: 0
};

exports.help = {
    name: 'ban', //CodeArius - AlieN
    description: 'Ban ', //CodeArius - AlieN
    usage: 'ban' //CodeArius - AlieN
};