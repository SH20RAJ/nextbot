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
    "https://api.visitorbadge.io/api/visitors?path=pingapped&countColor=%23263759",
    "https://cat.sg1.as.criteo.com/delivery/ck.php?cppv=3&cpp=SgSx-aKXDEA1ovkTLt67HmYJaG_diofIQfIlzhwuiFVKwlIqJvuDZOrH9Yfv2y9-9a7DLX8CXjOm4kvvt2DZOrEufS-sEAVoSzx53kBuwbhPPSVx3gyRy8fM2qurCDukyhvUakteLlend9kXZgq5KHC6hyKqWarsNjY7BmrdGWpskIxcbDpPHPy6GLMutbL-iAVHPopIrjc0bypkhMHonkyrqnflmPzlp_6zE99RFMqPBaIM83cKVJiUKjfpMwtfsh51elCzCVoFDbHIJzVn7jqExgYtpUSAc-5yN4IvRilzfZ6WAOBQfcs_3_1Oh90qH9d456XCawPOX5ykfHDZ5wOh3qyYb32W8jcm0jLXj_hQWeLpWEu7bbG5SNutfBeZ63eAhSEqS9fOFnqIOMXpZyZElrB9G5yyfah6n2olZaohWgqkUa4YhCBUBvkmte76-3fi3r9L2vFMAGxAD5b9grL8yVhxwq_zsQf0SmfIFxg1_oLhiXv2bpp7O-VdfJUKkWxAMI4Gd0vhlHsEIHe9UonuvNKc5_xFaPHRf-KYwrwpiXlyoH4Y4cf-bbIRN1ck77Ayuw&maxdest=https%3A%2F%2Fwww.vantagemarkets.com%2Fen%2Flp%2Findices-trading%2F%3Fcxd%3D44876_000516%26utm_source%3Dtmbtpg01%26utm_medium%3Dcpc%26utm_campaign%3Dindices24%26utm_content%3Dh5%26ls%3Dapac_in_en_tmbtpg01_cpc_indices24_h5_b2hl1c4_lb1_retail%26retailleadsource%3Dna_na_tmbtpg01%26cto_pld%3DLEzP0mR8AQBT7EX8xJ74OQ",
    "https://cat.sg1.as.criteo.com/delivery/ck.php?cppv=3&cpp=w9VhFAsPnR1Oj3qTGqHodi1L1bdSXujQDOFhkJ29E2WRctQVlhaP5PSkVQwCoeNaRGY_9zRH1ior3Si6JVWYm1nLpwQ-ahn458AqDVQ5RKk47YI4NLizjHhCYy-Ixrwe1vUj9yhMz83C2aSLX7r3VfL00K-av28UMRES6tB9sENI2Qm48MdRZhs_934joyYk6Y7nHEoStkZgVyq-luXe5ZWv2sk-rBtdHEAcyey0eVZsBgXA6t9rFGst7DWCh236PlnlR7DRX1FhnXFt7pfnx9Go2jjUxD3CMBMxAbJ2BanVJMqwIhmmAYj7a5-o1VXbZxnsb5XIy_Qx5obDFc0RSM9VnPVotFhFVnzc81v7_0UjX80bnxqVD4I6NvX8EMaHJM4d_jt9LoG7JXuSrVZLyTvT6TVgUHMHsSzJOFQ-zEFqbFwfrWw2DUTa8sst2QnOfWXZSPcaIxgzfcwhi2D6azFRqyckbnlemV-2nnlqZa-iKAwgG2OVwgZ2Bnsz4KbTv3ua58BD_9WLzUxWehapVSkStwTVxYZp6sj_gy_Uv67LhC3sgkb7auNTxQfrjtdHYOsVBw&maxdest=https%3A%2F%2Fwww.vantagemarkets.com%2Fen%2Flp%2Findices-trading%2F%3Fcxd%3D44876_000516%26utm_source%3Dtmbtpg01%26utm_medium%3Dcpc%26utm_campaign%3Dindices24%26utm_content%3Dh5%26ls%3Dapac_in_en_tmbtpg01_cpc_indices24_h5_b2hl1c4_lb1_retail%26retailleadsource%3Dna_na_tmbtpg01%26cto_pld%3D38yEbGR8AQA1l2dcxM_-7A"
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
