if (msg.text.slice(0, 9).toLowerCase() === "interview") {
    handleInterview(msg.text.slice(8, msg.text.length))
      .then((dt) => bot.sendMessage(msg.chat.id, dt))
      .catch((err) => console.log("Problems at interwiev model...."));

    // bot.sendMessage(msg.chat.id,`${msg.from.first_name} yatmaq vaxtim gelib saba danisariq cox yorulmusam sende yat bu vaxti neynirsen burda`)

    // bot.sendMessage(msg.chat.id,`${msg.from.first_name} Şıxkərim mənim funksiyalarmı böyüdür birazdan cavab verəcəm hərşeyə indilik üzürlü sayın`)
  } 
  
  else if (msg.text.slice(0, 9).toLowerCase() === "explainco") {
    handleCodeExplain(msg.text.slice(8, msg.text.length))
      .then((dt) => bot.sendMessage(msg.chat.id, dt))
      .catch((err) => console.log("Problems at explainco model...."));

      // bot.sendMessage(msg.chat.id,`${msg.from.first_name} Şıxkərim mənim funksiyalarmı böyüdür birazdan cavab verəcəm hərşeyə indilik üzürlü sayın`)
  } 
  
  else if (msg.text.slice(0, 9).toLowerCase() === "creatimgs") {
    // console.log("its working")
  
    // if (msg.from.first_name === "Nuclear") {
    //   bot.sendMessage(
    //     msg.chat.id,
    //     "sen terbiyesiz danisdiqna gore bloklandin"
    //   );
      
    // } 
    
    // else if (msg.from.first_name === "Nizmai") {
    //   bot.sendMessage(
    //     msg.chat.id,
    //     "sen terbiyesiz danisdiqna gore bloklandin putin eseblesecek"
    //   );
    // } 
    
   
      handleCreateimage(msg.text.slice(8, msg.text.length))
        .then((dt) => bot.sendPhoto(msg.chat.id, dt.data[0].url))
        .catch((er) =>
          bot.sendMessage(msg.chat.id, "bunun kim olduqunu tanimiram")
        );
      // bot.sendMessage(msg.chat.id,`${msg.from.first_name} Şıxkərim mənim funksiyalarmı böyüdür birazdan cavab verəcəm hərşeyə indilik üzürlü sayın`)
    

  } 
  
  else {
    
   
      handleFriendly(msg.text)
        .then((dt) => bot.sendMessage(msg.chat.id, dt))
        .catch((err) => console.log("Problems at friendly chat...."));
      // bot.sendMessage(msg.chat.id,`${msg.from.first_name} yatmaq vaxtim gelib saba danisariq cox yorulmusam sende yat bu vaxti neynirsen burda`)

      // bot.sendMessage(msg.chat.id,`${msg.from.first_name} Şıxkərim mənim funksiyalarmı böyüdür birazdan cavab verəcəm hərşeyə indilik üzürlü sayın`)
    

  }