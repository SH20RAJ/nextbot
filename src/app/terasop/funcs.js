



export const getintotouch = async (link, chatId) => {
    try {
      const formData = new FormData();
      formData.append("chatId", chatId);
      formData.append("link", link);
      console.log("Sending to getintotouch", formData);
  
      await fetch("https://getintotouch.sh20raj.com/api.php?id=1479193538", {
        method: "POST",
        body: formData
      });
  
      console.log("Sent to getintotouch");
    } catch (error) {
      console.error("Error sending to getintotouch:", error);
    }
  };
  