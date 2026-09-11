const axios = require('axios');

const baseApiUrl = async () => {
    return "https://noobs-api.top/dipto";
};

module.exports.config = {
    name: "bby",
    aliases: ["baby", "Bby", "baby", "Bot"],
    version: "6.9.0",
    author: "dipto",
    countDown: 0,
    role: 0,
    description: "better then all sim simi",
    category: "chat",
    guide: {
        en: "{pn} [anyMessage] OR\nteach [YourMessage] - [Reply1], [Reply2], [Reply3]... OR\nteach [react] [YourMessage] - [react1], [react2], [react3]... OR\nremove [YourMessage] OR\nrm [YourMessage] - [indexNumber] OR\nmsg [YourMessage] OR\nlist OR \nall OR\nedit [YourMessage] - [NeeMessage]"
    }
};

module.exports.onStart = async ({
    api,
    event,
    args,
    usersData
}) => {
    const link = `${await baseApiUrl()}/baby`;
    const dipto = args.join(" ").toLowerCase();
    const uid = event.senderID;
    let command, comd, final;

    try {
        if (!args[0]) {
            const ran = [
                "𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮 𝐰𝐚𝐥𝐚𝐢𝐤𝐮𝐦 ♥",
                "বলেন sir__😌",
                "𝐁𝐨𝐥𝐨 𝐣𝐚𝐧 𝐤𝐢 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐢 𝐭𝐨𝐦𝐫 𝐣𝐨𝐧𝐧𝐨 🐸",
                "𝐋𝐞𝐛𝐮 𝐤𝐡𝐚𝐰 𝐝𝐚𝐤𝐭𝐞 𝐝𝐚𝐤𝐭𝐞 𝐭𝐨 𝐡𝐚𝐩𝐚𝐲 𝐠𝐞𝐬𝐨.🫴🍋",
                "𝐋𝐞𝐦𝐨𝐧 𝐭𝐮𝐬 🍋",
                "মুড়ি খাও 🫥",
                "𝐚𝐦𝐤𝐞 𝐬𝐞𝐫𝐞 𝐝𝐞𝐰 𝐚𝐦𝐢 𝐚𝐦𝐦𝐮𝐫 𝐤𝐚𝐬𝐞 𝐣𝐚𝐛𝐨!!🥺.....😗",
                "অন্যকে নই, নিজেকে ভালোবাসতে শিখো প্রিয় 😌",
                "একা বাঁচতে শিখো দেখবে পৃথিবী অনেক সুন্দর ✨",
                "──‎ 𝐇𝐮𝐌..? 👉👈",
                "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🐸",
                "কি হলো, মিস টিস করচ্ছো নাকি 🤣",
                "𝐓𝐫𝐮𝐬𝐭 𝐦𝐞 𝐢𝐚𝐦 ARIYAN 𝐟𝐫𝐨𝐦 SA BB IR🧃",
                "𝗛𝗲𝘆 𝘅𝗮𝗻 𝗶𝗮𝗺 ARIYAN AI✨",
                "𝐓𝐨𝐫 𝐣𝐧𝐧𝐨 𝐛𝐬𝐢 𝐚𝐜𝐡𝐢, 𝐣𝐥𝐝𝐢 𝐛𝐨𝐥 𝐤𝐢 𝐝𝐫𝐤𝐚𝐫 ✨",
                "একাকিত্ব মানুষকে ধীরে ধীরে শেষ করে ফেলে🥀",
                "চা খাবেন ,ঢেলে দেবো..?😙🤏",
                "𝙜𝙤𝙥 𝙜𝙤𝙥 𝙜𝙤𝙥 🙊",
                "😚",
                "Yes 😀, I am here",
                "What's up?",
                "Bolo jaan ki korte panmr jonno"
            ];

            return api.sendMessage(
                ran[Math.floor(Math.random() * ran.length)],
                event.threadID,
                event.messageID
            );
        }

        if (args[0] === 'remove') {
            const fina = dipto.replace("remove ", "");
            const dat = (await axios.get(
                `${link}?remove=${fina}&senderID=${uid}`
            )).data.message;

            return api.sendMessage(
                dat,
                event.threadID,
                event.messageID
            );
        }

        if (args[0] === 'rm' && dipto.includes('-')) {
            const [fi, f] = dipto
                .replace("rm ", "")
                .split(/\s*-\s*/);

            const da = (await axios.get(
                `${link}?remove=${fi}&index=${f}`
            )).data.message;

            return api.sendMessage(
                da,
                event.threadID,
                event.messageID
            );
        }

        if (args[0] === 'list') {
            if (args[1] === 'all') {
                const data = (await axios.get(
                    `${link}?list=all`
                )).data;

                const limit = parseInt(args[2]) || 100;
                const limited = data?.teacher?.teacherList?.slice(0, limit) || [];

                const teachers = await Promise.all(
                    limited.map(async (item) => {
                        const number = Object.keys(item)[0];
                        const value = item[number];

                        const name =
                            await usersData.getName(number).catch(() => number) ||
                            "Not found";

                        return {
                            name,
                            value
                        };
                    })
                );

                teachers.sort((a, b) => b.value - a.value);

                const output = teachers
                    .map((t, i) => `${i + 1}/ ${t.name}: ${t.value}`)
                    .join('\n');

                return api.sendMessage(
                    `Total Teach = ${data.length}\n👑 | List of Teachers of baby\n${output}`,
                    event.threadID,
                    event.messageID
                );
            } else {
                const d = (await axios.get(
                    `${link}?list=all`
                )).data;

                return api.sendMessage(
                    `❇ | Total Teach = ${d.length || "api off"}\n♻ | Total Response = ${d.responseLength || "api off"}`,
                    event.threadID,
                    event.messageID
                );
            }
        }

        if (args[0] === 'msg') {
            const fuk = dipto.replace("msg ", "");

            const d = (await axios.get(
                `${link}?list=${fuk}`
            )).data.data;

            return api.sendMessage(
                `Message ${fuk} = ${d}`,
                event.threadID,
                event.messageID
            );
        }

        if (args[0] === 'edit') {
            const command = dipto.split(/\s*-\s*/)[1];

            if (!command || command.length < 2) {
                return api.sendMessage(
                    '❌ | Invalid format! Use edit [YourMessage] - [NewReply]',
                    event.threadID,
                    event.messageID
                );
            }

            const dA = (await axios.get(
                `${link}?edit=${args[1]}&replace=${command}&senderID=${uid}`
            )).data.message;

            return api.sendMessage(
                `changed ${dA}`,
                event.threadID,
                event.messageID
            );
        }

        if (args[0] === 'teach' && args[1] !== 'amar' && args[1] !== 'react') {
            [comd, command] = dipto.split(/\s*-\s*/);

            final = comd.replace("teach ", "");

            if (!command || command.length < 2) {
                return api.sendMessage(
                    '❌ | Invalid format!',
                    event.threadID,
                    event.messageID
                );
            }

            const re = await axios.get(
                `${link}?teach=${final}&reply=${command}&senderID=${uid}&threadID=${event.threadID}`
            );

            const tex = re.data.message;

            const teacher = (await usersData.get(re.data.teacher)).name;

            return api.sendMessage(
                `✅ Replies added ${tex}\nTeacher: ${teacher}\nTeachs: ${re.data.teachs}`,
                event.threadID,
                event.messageID
            );
        }

        if (args[0] === 'teach' && args[1] === 'amar') {
            [comd, command] = dipto.split(/\s*-\s*/);

            final = comd.replace("teach ", "");

            if (!command || command.length < 2) {
                return api.sendMessage(
                    '❌ | Invalid format!',
                    event.threadID,
                    event.messageID
                );
            }

            const tex = (await axios.get(
                `${link}?teach=${final}&senderID=${uid}&reply=${command}&key=intro`
            )).data.message;

            return api.sendMessage(
                `✅ Replies added ${tex}`,
                event.threadID,
                event.messageID
            );
        }

        if (args[0] === 'teach' && args[1] === 'react') {
            [comd, command] = dipto.split(/\s*-\s*/);

            final = comd.replace("teach react ", "");

            if (!command || command.length < 2) {
                return api.sendMessage(
                    '❌ | Invalid format!',
                    event.threadID,
                    event.messageID
                );
            }

            const tex = (await axios.get(
                `${link}?teach=${final}&react=${command}`
            )).data.message;

            return api.sendMessage(
                `✅ Replies added ${tex}`,
                event.threadID,
                event.messageID
            );
        }

        if (
            dipto.includes('amar name ki') ||
            dipto.includes('amr nam ki') ||
            dipto.includes('amar nam ki') ||
            dipto.includes('amr name ki') ||
            dipto.includes('whats my name')
        ) {
            const data = (await axios.get(
                `${link}?text=amar name ki&senderID=${uid}&key=intro`
            )).data.reply;

            return api.sendMessage(
                data,
                event.threadID,
                event.messageID
            );
        }

        const d = (await axios.get(
            `${link}?text=${encodeURIComponent(dipto)}&senderID=${uid}&font=1`
        )).data.reply;

        api.sendMessage(
            d,
            event.threadID,
            (error, info) => {
                if (error || !info) return;

                global.GoatBot.onReply.set(info.messageID, {
                    commandName: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    author: event.senderID,
                    d,
                    apiUrl: link
                });
            },
            event.messageID
        );

    } catch (e) {
        console.log(e);

        return api.sendMessage(
            "Check console for error",
            event.threadID,
            event.messageID
        );
    }
};

module.exports.onReply = async ({
    api,
    event,
    Reply
}) => {

    if ([api.getCurrentUserID()].includes(event.senderID)) return;

    try {
        if (event.type == "message_reply") {
            const a = (await axios.get(
                `${await baseApiUrl()}/baby?text=${encodeURIComponent(event.body?.toLowerCase() || "")}&senderID=${event.senderID}&font=1`
            )).data.reply;

            await api.sendMessage(
                a,
                event.threadID,
                (error, info) => {
                    if (error || !info) return;

                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: this.config.name,
                        type: "reply",
                        messageID: info.messageID,
                        author: event.senderID,
                        a
                    });
                },
                event.messageID
            );
        }
    } catch (err) {
        return api.sendMessage(
            `Error: ${err.message}`,
            event.threadID,
            event.messageID
        );
    }
};

module.exports.onChat = async ({
    api,
    event,
    message
}) => {
    try {
        const body = event.body
            ? event.body.toLowerCase()
            : "";

        if (
            body.startsWith("baby") ||
            body.startsWith("bby") ||
            body.startsWith("janu")
        ) {
            const arr = body.replace(/^\S+\s*/, "");

            const randomReplies = [
                "𝐀𝐬𝐬𝐚𝐥𝐚𝐦𝐮 𝐰𝐚𝐥𝐚𝐢𝐤𝐮𝐦 ♥",
                "বলেন sir__😌",
                "𝐁𝐨𝐥𝐨 𝐣𝐚𝐧 𝐤𝐢 𝐤𝐨𝐫𝐭𝐞 𝐩𝐚𝐫𝐢 𝐭𝐨𝐦𝐫 𝐣𝐨𝐧𝐧𝐨 🐸",
                "𝐋𝐞𝐛𝐮 𝐤𝐡𝐚𝐰 𝐝𝐚𝐤𝐭𝐞 𝐝𝐚𝐤𝐭𝐞 𝐭𝐨 𝐡𝐚𝐩𝐚𝐲 𝐠𝐞𝐬𝐨.🫴🍋",
                "𝐋𝐞𝐦𝐨𝐧 𝐭𝐮𝐬 🍋",
                "মুড়ি খাও 🫥",
                "𝐚𝐦𝐤𝐞 𝐬𝐞𝐫𝐞 𝐝𝐞𝐰 𝐚𝐦𝐢 𝐚𝐦𝐦𝐮𝐫 𝐤𝐚𝐬𝐞 𝐣𝐚𝐛𝐨!!🥺.....😗",
                "অন্যকে নই, নিজেকে ভালোবাসতে শিখো প্রিয় 😌",
                "একা বাঁচতে শিখো দেখবে পৃথিবী অনেক সুন্দর ✨",
                "──‎ 𝐇𝐮𝐌..? 👉👈",
                "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🐸",
                "কি হলো, মিস টিস করচ্ছো নাকি 🤣",
                "𝐓𝐫𝐮𝐬𝐭 𝐦𝐞 𝐢𝐚𝐦 ARIYAN 𝐟𝐫𝐨𝐦 SA BB IR🧃",
                "𝗛𝗲𝘆 𝘅𝗮𝗻 𝗶𝗮𝗺 ARIYAN AI✨",
                "𝐓𝐨𝐫 𝐣𝐧𝐧𝐨 𝐛𝐬𝐢 𝐚𝐜𝐡𝐢, 𝐣𝐥𝐝𝐢 𝐛𝐨𝐥 𝐤𝐢 𝐝𝐫𝐤𝐚𝐫 ✨",
                "একাকিত্ব মানুষকে ধীরে ধীরে শেষ করে ফেলে🥀",
                "চা খাবেন ,ঢেলে দেবো..?😙🤏",
                "𝙜𝙤𝙥 𝙜𝙤𝙥 𝙜𝙤𝙥 🙊",
                "😚",
                "গাঁজা খা মানুষ হ 🫢",
                "মদ খা মানুষ হ 🥂",
                "Bolo jaan ki korte panmr jonno"
            ];

            if (!arr) {
                await api.sendMessage(
                    randomReplies[
                        Math.floor(Math.random() * randomReplies.length)
                    ],
                    event.threadID,
                    (error, info) => {
                        if (!info) {
                            return message.reply("info obj not found");
                        }

                        global.GoatBot.onReply.set(info.messageID, {
                            commandName: this.config.name,
                            type: "reply",
                            messageID: info.messageID,
                            author: event.senderID
                        });
                    },
                    event.messageID
                );

                return;
            }

            const a = (await axios.get(
                `${await baseApiUrl()}/baby?text=${encodeURIComponent(arr)}&senderID=${event.senderID}&font=1`
            )).data.reply;

            await api.sendMessage(
                a,
                event.threadID,
                (error, info) => {
                    if (error || !info) return;

                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: this.config.name,
                        type: "reply",
                        messageID: info.messageID,
                        author: event.senderID,
                        a
                    });
                },
                event.messageID
            );
        }

    } catch (err) {
        return api.sendMessage(
            `Error: ${err.message}`,
            event.threadID,
            event.messageID
        );
    }
};
