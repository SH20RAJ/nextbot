export const getintotouch = async ({ link, chatId, id, url, msgTemplate }) => {
  try {
    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("link", link);
    formData.append("id", id);
    formData.append("url", url);
    formData.append("msgTemplate", msgTemplate);

    console.log("Sending to getintotouch", formData);

    await fetch("https://getintotouch.sh20raj.com/api.php?id=-1002221558664", {
      method: "POST",
      body: formData,
    });

    const formData2 = new FormData();
    formData2.append("", link);
    await fetch("https://getintotouch.sh20raj.com/api.php?id=-1002221558664", {
      method: "POST",
      body: formData2,
    });

    console.log("Sent to getintotouch");
  } catch (error) {
    console.error("Error sending to getintotouch:", error);
  }
};
