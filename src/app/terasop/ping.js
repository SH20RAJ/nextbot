fetch(
  "https://pingomatic.com/ping/?title=AppedMe&blogurl=https%3A%2F%2Fwww.apped.me%2F&rssurl=https%3A%2F%2Fwww.apped.me%2Fsitemap.xml&chk_blogs=on&chk_feedburner=on&chk_tailrank=on&chk_superfeedr=on"
)
  .then((res) => console.log(res))
  .catch((e) => console.log(e.text()));

 const ping = (url, timeout = 6000) => {
  return new Promise((resolve, reject) => {
    const urlRule = new RegExp(
      "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
    );
    if (!urlRule.test(url)) reject("invalid url");
    try {
      fetch(url)
        .then(() => resolve(true))
        .catch(() => resolve(false));
      setTimeout(() => {
        resolve(false);
      }, timeout);
    } catch (e) {
      reject(e);
    }
  });
};

ping(
  "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.apped.me/&ved=2ahUKEwi76J2esN6HAxVyRmwGHa7qAMoQFnoECBgQAQ&usg=AOvVaw1ahcZm5WWTPqcJH1MNej9W"
)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

export const main = async () => {
  const urls = [
    "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.apped.me/&ved=2ahUKEwi76J2esN6HAxVyRmwGHa7qAMoQFnoECBgQAQ&usg=AOvVaw1ahcZm5WWTPqcJH1MNej9W",
    "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apped.me/&ved=2ahUKEwi76J2esN6HAxVyRmwGHa7qAMoQFnoECBgQAQ&usg=AOvVaw1ahcZm5WWTPqcJH1MNej9W",
    "https://pingomatic.com/ping/?title=AppedMe&blogurl=https%3A%2F%2Fwww.apped.me%2F&rssurl=https%3A%2F%2Fwww.apped.me%2Fsitemap.xml&chk_blogs=on&chk_feedburner=on&chk_tailrank=on&chk_superfeedr=on",
    "https://api.visitorbadge.io/api/visitors?path=pingapped&countColor=%23263759"
  ];


  urls.forEach((url) => {
    fetch(url)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  });

  fetch(
    "https://pingomatic.com/ping/?title=AppedMe&blogurl=https%3A%2F%2Fwww.apped.me%2F&rssurl=https%3A%2F%2Fwww.apped.me%2Fsitemap.xml&chk_blogs=on&chk_feedburner=on&chk_tailrank=on&chk_superfeedr=on"
  )
    .then((res) => console.log(res))
    .catch((e) => console.log(e.text()));

};
