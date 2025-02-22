const chatContainer = document.querySelector(".chats-container");

const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");

//API setup//

const API_KEY = "AIzaSyDWSX8C-qP_Yj398sUlZvFaKZDG1js2RJA";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

let userMessage = "";
const chatHistory = [];

//templete function for creating new element with ease//

const createMsgElement = (content,...classes) =>{
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

//genrate and fetch data from url//

const genrateResponse = async(botMsgDiv) =>{

    const textElement = botMsgDiv.querySelector(".message-text");

    //add user message chat message
    chatHistory.push({
        role:"user",
        parts:[{ text: userMessage}]
    });
    try{
        const response = await fetch(API_URL,{
           method:"POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ contents: chatHistory })
        });

        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);

        const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g,"$1").trim();
        textElement.textContent = responseText;
    }
    catch(error){
      console.error(error);
    }
}

const handleFormSubmit = (e) =>{
    e.preventDefault();
    userMessage = promptInput.value.trim();
    if(!userMessage) return;

    //Genrate User Message//

    const userMsgHtml = `<p class="message-text"></p>`;
    const userMsgDiv = createMsgElement(userMsgHtml,"user-message");
    userMsgDiv.querySelector(".message-text").textContent = userMessage;
    chatContainer.appendChild(userMsgDiv);

    //bot-message

     setTimeout(() => {
    const botMsgHtml = `<img src="th.jpg" alt="ai" class="avatar"><p class="message-text">Just a sec...</p>`;
    const botMsgDiv = createMsgElement(botMsgHtml,"bot-message","loading");
    chatContainer.appendChild(botMsgDiv);
    genrateResponse(botMsgDiv);






























































































    
}, 600);
}
promptForm.addEventListener("submit",handleFormSubmit)
