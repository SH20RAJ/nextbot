import { generateDownloadUrl } from "@/app/reelsave/route";

//alternative https://igdown.net/


export const GET = async (req, res, next) => {
  
  console.log(req);
  // const nextUrl = new URL(req.url);
  let url = req.nextUrl.searchParams.get("url");


  // Example usage:
  const instagramUrl = "https://www.instagram.com/reels/C9fQFa9voVP/";
  let downloadUrl = generateDownloadUrl(instagramUrl);

  let data = await fetch(
    downloadUrl,{
      headers: {
        accept: "*",
        "accept-language": "en-US,en;q=0.9,hi;q=0.8",
        "access-control-allow-origin": "*",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://insta.savetube.me/video-download-4k",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify({ url: url || "https://www.instagram.com/reels/C-CDjg1vIHQ/" }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  );

  data = await data.json();


  console.log(downloadUrl);

  // add cors headers



  return Response.json({ data },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        "Content-Type": "application/json",
      },
    }
  );
};