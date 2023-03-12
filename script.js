const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client1 = new Client({
  authStrategy: new LocalAuth({ clientId: "Matheus" }),
});

client1.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client1.on("ready", () => {
  console.log("Client is ready!");
});

// client1.on("message", (message) => {
//   console.log(message);
// });

const games = [
  { key: 1, name: "Fortnite" },
  { key: 2, name: "Counter Strike" },
  { key: 3, name: "League Of Legends" },
  { key: 4, name: "Valorant" },
  { key: 5, name: "Outros..." },
];

let messagesArray = [];
let mensagem = "";

function botWhats() {
  client1.on("message", (message) => {
    const messageContent = message.body;
    console.log("Aqui", messagesArray[0] === undefined);

    if (messageContent === "." && messagesArray[0] === undefined) {
      // messagesArray = [];
      client1.sendMessage(
        message.from,
        `Bem Vindo ${message._data.notifyName}
    Oque Deseja?
    1- Falar com Matheus
    2- Fazer um pedido
    3- Jogar Algo
    4- Ligar Discord`
      );
    }

    console.log("first", messagesArray);
    if (messageContent === "1" && messagesArray[2] === undefined) {
      client1.sendMessage(message.from, "Digite sua Mensagem");
      // messagesArray.push(messageContent);
    } else if (messageContent === "2" && messagesArray[2] === undefined) {
      client1.sendMessage(message.from, "Oque deseja Pedir?");
      // messagesArray.push(messageContent);
    } else if (messageContent === "3" && messagesArray[2] === undefined) {
      client1.sendMessage(message.from, `Oque deseja Jogar?`);
      messagesArray.push(messageContent);
    } else if (messageContent === "4" && messagesArray[2] == undefined) {
      client1.sendMessage(message.from, "Ligue para Rei do Balacobaco#7960");
      messagesArray.push(messageContent);
    }

    console.log("second", messagesArray);
    messagesArray.push(messageContent);

    // if (messageContent=== "1" && messagesArray[0]) {
    //   messagesArray.push(messageContent);
    // }
    console.log("third", messagesArray);
    if (messagesArray[1] === "1" && messagesArray[2] !== undefined) {
      // console.log("mensagem", mensagem);
      messagesArray.push(messageContent);
      client1.sendMessage(
        message.from,
        "Sua mensagem foi recebida e enviada para *Matheus*"
      );
    } else if (messagesArray[1] === "2" && messagesArray[2] !== undefined) {
      messagesArray.push(messageContent);
      client1.sendMessage(message.from, "Seu pedido foi recebido e anotado!");
    } else if (
      messagesArray[1] === "3" &&
      messagesArray[2] !== undefined &&
      messagesArray[4] === undefined
    ) {
      client1.sendMessage(
        message.from,
        `${games.map((jogo) => `${jogo.key}- ${jogo.name} \n`)}`
      );
      messagesArray.push(messageContent);
    } else if (messageContent === "4" && messagesArray[0] == "4") {
      client1.sendMessage(message.from, "Atendimento encerrado!");
    }
    console.log("fourth", messagesArray);
    if (messagesArray[4] !== undefined) {
      // let game = games.filter((jogo) => jogo.name == messagesArray[1]);
      messagesArray[4] = messagesArray[4] - 1;
      console.log(`Result ${messagesArray[4]}`);
      client1.sendMessage(
        message.from,
        `Você será convidado para jogar ${
          games[messagesArray[4]].name
        } com o Matheus`
      );
    }
  });

  client1.initialize();
}

botWhats();
