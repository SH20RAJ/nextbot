// const fetch = require('node-fetch'); // Built-in in modern Node.js

const cheerio = require('cheerio');

// Function to get the title of a website

export async function getWebsiteTitle(url) {
  try {
    const response = await fetch(url); // Fetch the HTML content of the website
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const html = await response.text(); // Read the response as text
    const $ = cheerio.load(html); // Parse the HTML
    let title = $('title').text(); // Extract the title text
    title = title.replace(" - Share Files Online & Send Larges Files with TeraBox", "").trim(); // Remove leading and trailing white spaces

    console.log(`Title of   ${title}`);
    return title;
  } catch (error) {
    console.error('Error fetching the website:', error.message);
    return null;
  }
}
