// impport dependencies
import { useState } from "react";

function App() {
  // state variables
  // message: to store the message typed by the user
  const [message, setMessage] = useState("");
  // chats: to store the conversation between the user and the bot
  const [chats, setChats] = useState([]);
  // isTyping: to show the typing indicator
  const [isTyping, setIsTyping] = useState(false);

  // function to send the message to the backend
  const chat = async (e, message) => {
    // prevent the default behaviour of the form
    e.preventDefault();

    // if the message is empty, return
    if (!message) return;
    setIsTyping(true);

    let msg = chats;
    // push the message to the chats array
    msg.push({ role: "user", content: message });
    setChats(msg);

    scrollTo(0, 1e10);

    setMessage("");

    // fetch the response from the backend
    fetch("http://localhost:8080/", {
      // set the method to POST
      method: "POST",
      // send the message to the backend
      headers: {
        "Content-Type": "application/json",
      },
      // send the chats array to the backend
      body: JSON.stringify({ chats }),
    })
      .then((response) => response.json()) // convert the response to JSON
      .then((data) => {
        // set the response to the chats array
        msg.push(data.output);
        setChats(msg);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => console.log(error)); // catch any error
  };

  return (
    <main>
      <h1>ChatGPT APP</h1>

      <section>
        {chats && chats.length
          ? chats.map(
              (
                chat,
                index // map through the chats array
              ) => (
                <p
                  key={index}
                  className={chat.role === "user" ? "user_msg" : ""}
                >
                  <span>
                    <b>{chat.role.toUpperCase()}</b>
                  </span>
                  <span>:</span>
                  <span>{chat.content}</span>
                </p>
              )
            )
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
      </form>
    </main>
  );
}

// export the App components
export default App;
