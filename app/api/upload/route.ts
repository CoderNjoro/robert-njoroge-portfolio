import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to base64 for Cloudinary upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64}`;

        // Upload to Cloudinary
        const cloudinaryUrl = process.env.CLOUDINARY_URL || process.env.NEXT_PUBLIC_CLOUDINARY_URL;

        if (!cloudinaryUrl) {
            // Fallback: return base64 if Cloudinary is not configured
            console.warn('Cloudinary not configured, using base64 storage');
            return NextResponse.json({ url: dataURI });
        }

        // Parse Cloudinary URL
        const matches = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
        if (!matches) {
            console.error('Invalid Cloudinary URL format');
            return NextResponse.json({ url: dataURI });
        }

        const [, apiKey, apiSecret, cloudName] = matches;

        // Upload to Cloudinary
        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file: dataURI,
                    upload_preset: 'portfolio_uploads', // You'll need to create this in Cloudinary
                    api_key: apiKey,
                }),
            }
        );

        if (!uploadResponse.ok) {
            console.error('Cloudinary upload failed:', await uploadResponse.text());
            return NextResponse.json({ url: dataURI });
        }

        const uploadData = await uploadResponse.json();
        return NextResponse.json({ url: uploadData.secure_url });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}
