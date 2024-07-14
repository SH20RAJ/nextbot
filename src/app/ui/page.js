// app/send-messages/page.js

"use client";

import { useState } from "react";

export default function SendMessagesPage() {
  const [loading, setLoading] = useState(false);

  const sendMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: document.querySelector("textarea").value,
        }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Error sending messages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col  h-screen justify-center  items-center">
      <h1 className=" text-4xl">Send Telegram Messages</h1>
      <p>Click the button below to send messages to all users.</p>
      <p>Messages will be sent to all users who have enabled notifications.</p>
      <br />
      <p>Message :</p>

      <textarea className={"  mx-10 w-1/2 bg-transparent h-40 outline-2 text-purple-500 border-2 border-purple-500 rounded-md p-2"}></textarea>
      <button onClick={sendMessages} disabled={loading} className="
       bg-purple-500 text-white px-4 py-2 rounded-md mt-4
      ">
        {loading ? "Sending..." : "Send Messages"}
      </button>
    </div>
  );
}
