const fs = require('fs')
const { exec } = require('child_process')

module.exports = {
name: ["rgb"],
type: ["audio"],
useLimit: true,
description: "convert audio normal to rgb",
utilisation: userbot.prefix + "rgb reply",

async execute(m) {
let { conn, args } = data
try {
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
        if (/audio/.test(mime)) {
            let media = await conn.downloadAndSaveMediaMessage(q)
            let ran = getRandom('.mp3')
            exec(`ffmpeg -i ${media} -vf extractplanes=r -c:v libx264rgb -pix_fmt rgb24 ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) m.reply(`_*Error!*_`)
                let buff = fs.readFileSync(ran)
                conn.sendFile(m.chat, buff, ran, null, m, true, { quoted: m, mimetype: 'audio/mp4' })
                fs.unlinkSync(ran)
            })
        } else m.reply(`Balas vn/audio yang ingin diubah dengan caption *${userbot.prefix}bass*`)
    } catch (e) {
        throw e
    }
}
}
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
