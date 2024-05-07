import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase.js';
import sharp from 'sharp';

export async function uploadFile(file) {
    // Process the file using Sharp
    let fileBuffer = await sharp(file.buffer)
        .resize({ width: 200, height: 200, fit: 'cover' })  // Correct typo here
        .toBuffer();

    // Create a reference to the storage location
    const fileRef = ref(storage, `files/${file.originalname}-${Date.now()}`);

    // Metadata for the upload, especially important for Firebase to handle the file correctly
    const fileMetadata = {
        contentType: file.mimetype
    };

    // Upload the file
    await uploadBytes(fileRef, fileBuffer, fileMetadata);

    // Get the download URL
    const fileDownloadURL = await getDownloadURL(fileRef);

    return { ref: fileRef, downloadURL: fileDownloadURL };
}
