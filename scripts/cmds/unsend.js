module.exports = {
  config: {
    name: "unsend",
    aliases: ["un", "u", "uns", "unsent"],
    version: "1.9",
    author: "NTKhang | Amit Max ⚡| Azad 💥",
    countDown: 5,
    role: 0,
    description: {
      en: "Unsend কর attitude স্টাইলে 😈"
    },
    category: "box chat",
    guide: {
      en: "রিপ্লাই দে মেসেজে আর লিখ {pn} … নাহলে মুখ বন্ধ রাখ 😏"
    }
  },

  langs: {
    en: {
      syntaxError: 
`চুপ কর, না হলে বট তোর মাথা ফাটাবে 🔥
________________________
রিপ্লাই দে আগে, নাহলে মুখ কালো হবে 😈
________________________
তুই কি বোকার মত বসিস? আগে রিপ্লাই কর 🖕
________________________
বেশি চালাকি দেখাস না, অন্যরা দেখছে 😏
________________________
মেসেজে চোখ রাখিস না? তাহলে গালি খাস 🤬
________________________
চুপ করে বস, বট attack করবে 👹
________________________
রিপ্লাই না দিলে, মনে কর তুই হেরে গেছো 🤡
________________________
তুই বোকার মতো বসিস? আগে attitude দেখ 😤
________________________
চালাকি দেখিস না, আগে কাজ কর 😎
________________________
মুখ বন্ধ কর, না হলে কান ধরে মারি 👊
________________________
চুপ কর, বেশি বকবক করলে আগুন লাগবে 🔥
________________________
তুই কি হিরো? আগে রিপ্লাই, পরে গালি 😏
________________________
রিপ্লাই না দিলে, বট গালি দিব 🤬
________________________
বোকার মতো বসিস না, আগে attitude দেখ 😈
________________________
চুপ করে বস, বোকার মত হাসিস না 😹`
    }
  },

  onStart: async function ({ message, event, api, getLang }) {
    if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID()) {
        // Get string and split by separator
        const lines = getLang("syntaxError").split("\n________________________");
        const randomLine = lines[Math.floor(Math.random() * lines.length)].trim();
        return message.reply(randomLine);
    }
    message.unsend(event.messageReply.messageID);
  }
};
