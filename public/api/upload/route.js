import { NextResponse } from 'next/server';

const apiKey = '4MmhsOuofwcbfzsw36JY4FFRBPoL4loU';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
  }

  const apiFormData = new FormData();
  apiFormData.append('api_key', apiKey);
  apiFormData.append('file', file);
  apiFormData.append('name', file.name);

  try {
    const response = await fetch('https://www.imghippo.com/v1/upload', {
      method: 'POST',
      body: apiFormData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error uploading image', error: error.message }, { status: 500 });
  }
}
