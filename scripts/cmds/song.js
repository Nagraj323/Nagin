const ytSearch = require("yt-search");

module.exports = {
  config: {
    name: "song",
    aliases: ["music", "yt"],
    version: "1.0.0",
    author: "Ariyan",
    countDown: 5,
    role: 0,
    shortDescription: "Search songs on YouTube",
    longDescription: "Search YouTube and send song information to the group",
    category: "MEDIA",
    guide: "{p}{n} <song name>"
  },

  onStart: async function ({ api, event, args }) {
    if (!args.length) {
      return api.sendMessage(
        "🎵 গানের নাম লিখো!\n\nউদাহরণ:\n/song Tum Hi Ho",
        event.threadID,
        event.messageID
      );
    }

    const songName = args.join(" ");

    try {
      const searching = await api.sendMessage(
        `🔍 "${songName}" খোঁজা হচ্ছে...`,
        event.threadID
      );

      const result = await ytSearch(songName);

      if (!result.videos || result.videos.length === 0) {
        return api.sendMessage(
          "❌ কোনো গান পাওয়া যায়নি।",
          event.threadID,
          event.messageID
        );
      }

      const video = result.videos[0];

      const message =
        `╭──────────────╮\n` +
        `       🎵 SONG FOUND\n` +
        `╰──────────────╯\n\n` +
        `🎶 Title: ${video.title}\n` +
        `👤 Channel: ${video.author.name}\n` +
        `⏱️ Duration: ${video.timestamp}\n` +
        `👁️ Views: ${video.views.toLocaleString()}\n\n` +
        `🔗 YouTube Link:\n${video.url}\n\n` +
        `━━━━━━━━━━━━━━\n` +
        `✅ Search complete`;

      if (searching?.messageID) {
        await api.editMessage(
          message,
          searching.messageID
        );
      } else {
        await api.sendMessage(
          message,
          event.threadID,
          event.messageID
        );
      }

    } catch (error) {
      console.error("SONG ERROR:", error);

      return api.sendMessage(
        "❌ গান খুঁজতে সমস্যা হয়েছে।\nকিছুক্ষণ পর আবার চেষ্টা করো।",
        event.threadID,
        event.messageID
      );
    }
  }
};
