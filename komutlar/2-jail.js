const Discord = require("discord.js");
const db = require('quick.db')
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;




// - - - Jail Süre Argümanları - - - \\                 //CodeArius - AlieN
//                                    \\                 //CodeArius - AlieN
//                                    \\                 //CodeArius - AlieN
// - "S"=Saniye - "M"=Dakika - "H"=Saat "D"=Gün -  \\                 //CodeArius - AlieN
//  CodeArius'tan ` AlieN#1234 Yaptı Çalma Yanarsın. \\                 //CodeArius - AlieN
//                                      \\                 //CodeArius - AlieN
//                                     \\                 //CodeArius - AlieN
// - - - Jail Süre Argümanları - - - \\                 //CodeArius - AlieN


module.exports.run = async (client, message, args) => {
  

if(!message.member.roles.cache.has('779331417398050857') && !message.member.hasPermission("ADMINISTRATOR")) { //jail yetkilisinin rol id
const embed = new Discord.MessageEmbed()
.setColor('RED')
.setDescription('Bu Komutu Kullanmak İçin Gerekli Yetkiye Sahip Değilsin!')
return message.channel.send(embed)
}                 //CodeArius - AlieN
let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!kişi) {
const embed = new Discord.MessageEmbed()
.setColor('RED')                 //CodeArius - AlieN
.setDescription('Jail atacağın kullanıcıyı etiketle yada id sini belirt!')
return message.channel.send(embed)
}                 //CodeArius - AlieN
if(kişi.roles.cache.has('779331417398050857') && !message.member.hasPermission("ADMINISTRATOR")) { //jail yetkilisinin rol id
const embed = new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`Meslektaşını niye hapis'e atmaya çalışıyorsun?`)
return message.channel.send(embed)                 //CodeArius - AlieN
}  
let zaman = args[1]                 //CodeArius - AlieN
if(!args[1]) {
const embed = new Discord.MessageEmbed()
.setColor('RED')                 //CodeArius - AlieN
.setDescription(`<@${kişi.id}> adlı kullanıcı ne kadar süre hapiste olucak?`)
return message.channel.send(embed)
}
let sebep = args.join(' ').slice(args[1].length+args[0].length + 1)
if(!sebep) sebep = 'Sebep belirtilmemiş.'
                   //CodeArius - AlieN
const hapis = new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`Bir Kullanıcı Cezalıya Atıldı!`)
.setThumbnail(kişi.user.avatarURL())                 //CodeArius - AlieN
.addField(`Kullanıcı`, kişi,)
.addField(`Yetkili`, `<@${message.author.id}>`,)
.addField(`Sebebi`, sebep,)                 //CodeArius - AlieN
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)
.setTimestamp()
                 //CodeArius - AlieN
const dm = new Discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`**${message.guild.name}** Adlı Sunucuda Cezalıya Atıldın!`)                 //CodeArius - AlieN
.addField(`Cezalıya Atan Yetkili`,`<@${message.author.id}>`)
.addField(`Sebebi`, sebep,)
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)                 //CodeArius - AlieN

const tahliye = new Discord.MessageEmbed()
.setColor('GREEN')                 //CodeArius - AlieN
.setDescription(`Bir Kullanıcı Tahliye Oldu!`)
.setThumbnail(kişi.user.avatarURL())                     //CodeArius - AlieN
.addField(`**Kullanıcı:**`, kişi,)
.addField(`Yetkili`, `<@${message.author.id}>`,)                         //CodeArius - AlieN
.addField(`Sebebi`, sebep,)
.addField(`Süresi`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün'),)
.setTimestamp()

const embed2 = new Discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`${kişi} adlı kullanıcı \`${zaman}\`lığına hapise yollandı!`)
  
kişi.roles.add('779331417452183603'); //JAİL ROLÜ İD
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id)
db.set(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )
})  
client.channels.cache.get('779462826397925395').send(hapis) //Jaile Girince Log Mesajı Hangi Kanala Gidicekse O Kanalın İDSİ.
kişi.send(dm) 
message.channel.send(embed2)
setTimeout(async () =>{
kişi.roles.remove('779331417452183603') //Alınacak ROL İD
client.channels.cache.get('779462826397925395 ').send(tahliye) //Jailden Çıkınca Log Mesajı Hangi Kanala Gidicekse O Kanalın İDSİ.
}, ms(zaman));
setTimeout(async () =>{
message.guild.roles.cache.forEach(async r => {
const i = await db.fetch(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}` )
if(i != r.id)  return ;
if(i){kişi.roles.add(i)}
})
}, ms(zaman));
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['jail'],
permLevel: 0
};  
exports.help = {
name: 'jail',
description: 'Bir kullanıcıyı hapise atmaya yarar.',
usage: 'jail'
};


// - - - Jail Süre Argümanları - - - \\
//                                    \\
//                                    \\
// - "S"=Saniye - "M"=Dakika - "H"=Saat "D"=Gün -  \\
//  CodeArius'tan ` AlieN#1234 Yaptı Çalma Yanarsın. \\
//                                      \\
//                                     \\
// - - - Jail Süre Argümanları - - - \\