const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: 'fb',
  alias: ['fbdl', 'facebook'],
  desc: 'Download Facebook videos and reels by providing the video URL.',
  category: 'utility',
  use: '.fbdl <facebook_url>',
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const fbUrl = args.join(" ");
    if (!fbUrl) {
      return reply('**~`🫟SENURA🧲LAKSHAN 🫟`~**');
    }

    // Fetch video download links from the API
    const apiKey = 'e276311658d835109c'; // Replace with your API key if required
    const apiUrl = `https://api.nexoracle.com/downloader/facebook?apikey=${apiKey}&url=${encodeURIComponent(fbUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.result || !response.data.result.sd) {
      return reply('**~`🫟SENURA🧲LAKSHAN 🫟`~**');
    }

    const { thumb, title, desc, sd } = response.data.result;

    // Send the video as an attachment
    await conn.sendMessage(from, {
      video: { url: sd }, // Attach the video
      caption: `*❒ FB VIDEO DL❒*\n\n🔖 *Title*: ${title}\n📑 *Description*: ${desc}\n🖇️ *Url*: ${fbUrl}`,
    });
  } catch (error) {
    console.error('Error downloading Facebook video:', error);
    reply('❌ Unable to download the Facebook video. Please try again later.');
  }
});
