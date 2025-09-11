const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
    config: {
        name: "admin",
        aliases: ["ad"],
        version: "1.0",
        author: "♡︎ 𝐻𝐴𝑆𝐴𝑁 ♡︎",
        countDown: 5,
        role: 0,
        shortDescription: {
			en: "Add, remove or see the admin list for this bot"
		},
        longDescription: {
			en: "Add, remove or see the admin list for this bot"
		},
        category: "admin",
        guide: {
            en: "   {pn} [list | -l]: Show admin list (everyone can use)\n" +
                "   {pn} [add | -a] <uid | @tag>: Add admin role for a user (admins only)\n" +
                "   {pn} [remove | -r] <uid | @tag>: Remove admin role from a user (admins only)\n" +
                "   {pn} [add | -a, remove | -r] (reply): Add/remove admin role for the user you replied to (admins only)"
        }
    },

    langs: {
        en: {
            listAdmin: "🎭 𝗢𝗪𝗡𝗘𝗥 𝑎𝑛𝑑 𝗔𝗗𝗠𝗜𝗡 🎭"
                + "\n ♦___________________♦"
                + "\n ♕︎ 𝑶𝑾𝑵𝑬𝑹 ♕︎: ✨ 🅰🆉🅰🅳 ✨"
                + "\n _____________________________"
                + "\n _____♔︎ 𝑨𝑫𝑴𝑰𝑵'𝑺 ♔︎_____"
                + "\n %1"
                + "\n _____________________________"
                + "\n ♔︎ 𝑂𝑊𝑁𝐸𝑅 ♔︎:https://www.facebook.com/profile.php?id=61578365162382"
                + "\n |︵✰[_🪽°𝙉𝙚𝙯𝙪𝙠𝙤 𝘾𝙝𝙖𝙣°🐰_]࿐|",
            noAdmin: "⚠️ | No admins found!",
            added: "✅ | 𝐀𝐝𝐝𝐞𝐝 𝐚𝐝𝐦𝐢𝐧 𝐫𝐨𝐥𝐞 𝐟𝐨𝐫 %𝟏 𝐮𝐬𝐞𝐫𝐬:\𝐧%𝟐",
            alreadyAdmin: "\n⚠️ | %1 users already have admin role:\n%2",
            missingIdAdd: "⚠️ | 𝙋𝙡𝙚𝙖𝙨𝙚 𝙥𝙧𝙤𝙫𝙞𝙙𝙚 𝙖𝙣 𝙄𝘿, 𝙩𝙖𝙜 𝙖 𝙪𝙨𝙚𝙧, 𝙤𝙧 𝙧𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙤 𝙖𝙙𝙙 𝙖𝙙𝙢𝙞𝙣 𝙧𝙤𝙡𝙚",
            removed: "✅ | 𝙍𝙚𝙢𝙤𝙫𝙚𝙙 𝙖𝙙𝙢𝙞𝙣 𝙧𝙤𝙡𝙚 𝙛𝙧𝙤𝙢 %1 𝙪𝙨𝙚𝙧𝙨:\𝙣%2",
            notAdmin: "⚠️ | %1 users do not have admin role:\n%2",
            missingIdRemove: "⚠️ | 𝙋𝙡𝙚𝙖𝙨𝙚 𝙥𝙧𝙤𝙫𝙞𝙙𝙚 𝙖𝙣 𝙄𝘿, 𝙩𝙖𝙜 𝙖 𝙪𝙨𝙚𝙧, 𝙤𝙧 𝙧𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙩𝙤 𝙧𝙚𝙢𝙤𝙫𝙚 𝙖𝙙𝙢𝙞𝙣 𝙧𝙤𝙡𝙚",
            notAllowed: "⛔ | 𝙔𝙤𝙪 𝙙𝙤𝙣'𝙩 𝙝𝙖𝙫𝙚 𝙥𝙚𝙧𝙢𝙞𝙨𝙨𝙞𝙤𝙣 𝙩𝙤 𝙪𝙨𝙚 𝙩𝙝𝙞𝙨 𝙘𝙤𝙢𝙢𝙖𝙣𝙙!"
        }
    },

    onStart: async function ({ message, args, usersData, event, getLang }) {
        const senderID = event.senderID;

        switch (args[0]) {
            case "list":
            case "-l": {
                
                if (config.adminBot.length === 0) {
                    return message.reply(getLang("noAdmin"));
                }
                const getNames = await Promise.all(config.adminBot.map(uid => usersData.getName(uid).then(name => `♡︎ ${name} ♡︎\n   ׂ╰┈➤(${uid})`)));
                return message.reply(getLang("listAdmin", getNames.join("\n")));
            }

            case "add":
            case "-a":
            case "remove":
            case "-r": {
                
                if (!config.adminBot.includes(senderID)) {
                    return message.reply(getLang("notAllowed"));
                }
            }

            if (args[0] === "add" || args[0] === "-a") {
                let uids = [];

               
                if (Object.keys(event.mentions).length > 0) {
                    uids = Object.keys(event.mentions);
                } else if (event.type === "message_reply") {
                    uids.push(event.messageReply.senderID);
                } else {
                    uids = args.filter(arg => !isNaN(arg));
                }

                if (uids.length === 0) {
                    return message.reply(getLang("missingIdAdd"));
                }

                const newAdmins = [];
                const alreadyAdmins = [];

                for (const uid of uids) {
                    if (config.adminBot.includes(uid)) {
                        alreadyAdmins.push(uid);
                    } else {
                        newAdmins.push(uid);
                    }
                }

                config.adminBot.push(...newAdmins);
                writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

                const newAdminNames = await Promise.all(newAdmins.map(uid => usersData.getName(uid)));
                const alreadyAdminNames = await Promise.all(alreadyAdmins.map(uid => usersData.getName(uid)));

                return message.reply(
                    (newAdmins.length > 0 ? 
                        getLang("added", newAdmins.length, newAdminNames.map(name => `• ${name}`).join("\n")) : "") +
                    (alreadyAdmins.length > 0 ? 
                        getLang("alreadyAdmin", alreadyAdmins.length, alreadyAdminNames.map(name => `• ${name}`).join("\n")) : "")
                );
            }

            if (args[0] === "remove" || args[0] === "-r") {
                let uids = [];

               
                if (Object.keys(event.mentions).length > 0) {
                    uids = Object.keys(event.mentions);
                } else if (event.type === "message_reply") {
                    uids.push(event.messageReply.senderID);
                } else {
                    uids = args.filter(arg => !isNaN(arg));
                }

                if (uids.length === 0) {
                    return message.reply(getLang("missingIdRemove"));
                }

                const removedAdmins = [];
                const notAdmins = [];

                for (const uid of uids) {
                    if (config.adminBot.includes(uid)) {
                        removedAdmins.push(uid);
                        config.adminBot.splice(config.adminBot.indexOf(uid), 1);
                    } else {
                        notAdmins.push(uid);
                    }
                }

                writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

                const removedAdminNames = await Promise.all(removedAdmins.map(uid => usersData.getName(uid)));
                const notAdminNames = await Promise.all(notAdmins.map(uid => usersData.getName(uid)));

                return message.reply(
                    (removedAdmins.length > 0 ? 
                        getLang("removed", removedAdmins.length, removedAdminNames.map(name => `• ${name}`).join("\n")) : "") +
                    (notAdmins.length > 0 ? 
                        getLang("notAdmin", notAdmins.length, notAdminNames.map(name => `• ${name}`).join("\n")) : "")
                );
            }

            default: {
                return message.reply("⚠️ | Invalid command! Use 'list', 'add' or 'remove'.");
            }
        }
    }
};
