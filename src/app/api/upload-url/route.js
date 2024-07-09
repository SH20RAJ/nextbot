import { NextResponse } from 'next/server';

const apiKey = '4MmhsOuofwcbfzsw36JY4FFRBPoL4loU';

export async function POST(req, res) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ success: false, message: 'No image URL provided' }, { status: 400 });
    }

    // Download the image from the URL
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image from URL');
    }
    const imageBuffer = await imageResponse.arrayBuffer();

    const formData = new FormData();
    formData.append('api_key', apiKey);
    formData.append('file', new Blob([imageBuffer]), 'image.jpg');

    // Upload the image to Imghippo
    const uploadResponse = await fetch('https://www.imghippo.com/v1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await uploadResponse.json();
    return NextResponse.json(data, { status: uploadResponse.status });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error uploading image', error: error.message }, { status: 500 });
  }
}
