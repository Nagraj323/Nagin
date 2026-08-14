module.exports = {
	config: {
		name: "pussy",
		aliases: ["18+"],
		version: "1.0",
		author: "Doru fix by kivv",
		countDown: 5,
		role: 2,
		shortDescription: "send you pic of pussy",
		longDescription: "sends u pic of girls pussy",
		category: "18+",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ 
"https://i.imgur.com/IxlH0As.jpeg",
"https://i.ibb.co/9m612JTn/52371.jpg",
"https://i.ibb.co/Dg769n2k/24650695.jpg",
"https://i.ibb.co/VY2Bs0rC/images-4.jpg",
"https://i.ibb.co/Tx8bBw32/2064.jpg",
"https://i.ibb.co/ffc4ZsC/68e98449eb450985331583.jpg",
"",
"",
"",
	]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
	body: '「 Pussy💦🥵 」',attachment: await global.utils.getStreamFromURL(img)
})
}
		 }
