console.log("Server is running...");
import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";
const GetData = async () => {
  const data = axios.get("http://localhost:3001/blackList");
  return data;
};

const checkUser = (data, id) => {
  for (let i of data) {
    if (i.chat_id === id) {
      return true;
    }
  }
  return false;
};
import TelegramBotApi from "node-telegram-bot-api";
import { Configuration, OpenAIApi } from "openai";
const token = "6221167353:AAF3VZkuHT-IGsKEmVdcV6PK31mRcnaNUkw";
const bot = new TelegramBotApi(token, { polling: true });
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8800, () => {
  console.log("Server is running on port 8800")
});
const configuration = new Configuration({
  organization:"org-zwdgo3SID1KWY3xBQBlv5K3E",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const handleFriendly = async (data) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["/"],
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log("bad request");
  }
};
// handleFriendly("how are you").then(dt=>console.log(dt))
const handleInterview = async (data) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log("bad request at interview");
  }
};
// handleInterview("interview list of c++ interview question").then(dt=>{console.log(dt)})
const handleCodeExplain = async (data) => {
  try {
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: data,
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['"""'],
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log("bad request at explainco ...");
  }
};
//npx json-server --watch db.json --port 3001

const handleCreateimage = async (data) => {
  try {
    const response = await openai.createImage({
      prompt: data,
      n: 1,
      size: "1024x1024",
    });
    return response.data;
  } catch (error) {
    console.log("bad request at creatimage model ...");
  }
};
// handleCreateimage("d").then(dt=>console.log(dt)).catch(er=>console.log("bad request at create image model..."))
// console.log(ans)
const postData = async (data) => {
  try {
    await axios.post("http://localhost:3001/users", data);
  } catch (error) {
    console.log(error.message, "error at posting user info...");
  }
};
const startMessageSender = (username) => {
  let message = `Salam ${username} mən Şıxkərimin elektron versiyasıyam ilk öncə məndən istifadə etdiyiniz üçün təşəkkür edirəm,Söhbətimizin daha yaxşı olmasını istəyirsənsə funksiyalardan necə istifadə etməli olduğunu deyirəm.
  Ümumi qaydalar
    1-Əgər şəkil istəmirsizsə 1 dəqiqə ərzində 5 sual soruşun hər sualdan sonra 12 saniyə gözləyin amma şəkil üçün 
    dəqiqədə bir şəkil istəyin
    2-Qeyri etik sözlərdən istifadə etməyin onsuz cavab vermirəm,sizi bloklayacam
    3-Hər şeyi düzgün qramatik qaydada yazın
  Funksiyonalliqdan istifadə qaydaları
    1-Əgər ümumi məlumat almaq istəyirsənsə mənim bu cavabımdan sonra istədiyin sualı soruşa bilərsən daha düzgün cavablar üçün ingilis dilində və düzgün qramatik qaydada sual ver.
    2-Əgər hər hansı sahə ilə bağlı müsahibə sualları əldə etmək istəyirsənsə hər hansi istədiyin müsahibə sualında yazdığın cümlənin qarşısında mütləq interview sözü olmalıdır. Məs-interview Send me back-end interview question
    3-Əgər botun hər hansı bir şəkil yaratmağını istəyirsənsə o şəkili sözlərlə təsvir etməlisən və təsvir etdiyin cümlənin qarşısında mütləq creatimgs sözü olmalıdır
     Məs-creatimgs A cute dog front of home`;
  if (username.toLowerCase() === "fidan") {
    message += " Bu arada ləqəbin göbələk deyil?";
  }
  return message;
};
const updateNowAtThisTopic = (chat_id, topic) => {
  let message = `${topic} funksiyasında güncəlləmə gedir müvəqqəti narahatçılıqa görə üzr istəyirəm `;
  bot.sendMessage(chat_id, message);
  console.log(`Problem at ${topic} ai model....`);
};
const sendMessageToUserAbouyTopic = (usermessage,type) => {
  if(type === 'text'){
  let topic = usermessage.text.slice(0, 9).toLowerCase();
  let senderinfo = usermessage.text.slice(8, usermessage.text.length);
  let username = usermessage.from.first_name;
  let chat_id = usermessage.chat.id;
  if (new Date().getHours() > 7 && new Date().getHours() < 24) {
    if (topic === "interview") {
      handleInterview(senderinfo)
        .then((dt) => bot.sendMessage(chat_id, dt))
        .catch((err) => updateNowAtThisTopic(chat_id, topic));
    } else if (topic === "explainco") {
      handleCodeExplain(senderinfo)
        .then((dt) => bot.sendMessage(chat_id, dt))
        .catch((err) => updateNowAtThisTopic(chat_id, topic));
    } else if (topic === "creatimgs") {
      handleCreateimage(senderinfo)
        .then((dt) => bot.sendPhoto(chat_id, dt.data[0].url))
        .catch((er) =>
          bot.sendMessage(chat_id, "bunun kim olduqunu tanimiram")
        );
    } else {
      topic = `Bu modeldə problem var siz digərlərindən istifadə edin `;
      handleFriendly(usermessage.text)
        .then((dt) => bot.sendMessage(chat_id, dt))
        .catch((err) => updateNowAtThisTopic(chat_id, topic));
      // bot.sendMessage(chat_id,"bu funksiya islemir muveqqeti zehmet olmasa diger funsiyalari yoxlayin")
    }
  } else {
    bot.sendMessage(
      chat_id,
      ` ay ${username} mən bugün çox yorulmuşam və yatmaqa hazırlaşıram səhər 7-də dururam 12 də yatram gecən xeyrə qalsın  sabah danışariq`
    );
  }
}
};
bot.on("message", (msg,xd) => {
  console.log(msg)
  // console.log(msg);
  // bot.setChatTitle(msg.chat.id,"who am i")
  let sharing_data = {
    name: msg.from.first_name ? msg.from.first_name : "unknown",
    surname: msg.from.last_name ? msg.from.last_name : "unknown",
    text: msg.text ? msg.text : "yoxdur",
    chat_id: msg.chat.id,
  };
  postData(sharing_data);

  if (msg.text === "/start") {
    bot.sendMessage(msg.chat.id, startMessageSender(msg.from.first_name));
  } else {
    // postData(sharing_data

    GetData().then((dt) => {
      if (!checkUser(dt.data, msg.chat.id)) {
        sendMessageToUserAbouyTopic(msg,xd.type);
      } else {
        bot.sendMessage(msg.chat.id, "siz blokdasiz");
      }
    });
  }
});
