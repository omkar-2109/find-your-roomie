import { supabase } from '../lib/supabase';

export const STORAGE_BUCKET = 'roomzy-media';

/**
 * Upload an array of property image files to Supabase Storage.
 * Saves files under: properties/${hostId}/${Date.now()}-${file.name}
 * Returns an array of public URLs.
 */
export async function uploadPropertyImages(files: File[], hostId: string): Promise<string[]> {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map(async (file) => {
    // Sanitize filename
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `properties/${hostId || 'guest'}/${Date.now()}-${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading property image:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  });

  return Promise.all(uploadPromises);
}

/**
 * Upload a user avatar to Supabase Storage.
 * Saves file under: avatars/${userId}/${Date.now()}-${file.name}
 * Returns public URL.
 */
export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `avatars/${userId}/${Date.now()}-${cleanName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('Error uploading avatar:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Upload an identity verification document (Aadhaar / Passport / Utility Bill) to Supabase Storage.
 * Saves file under: verifications/${userId}/${Date.now()}-${file.name}
 * Returns public URL.
 */
export async function uploadVerificationDoc(file: File, userId: string): Promise<string> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `verifications/${userId || 'guest'}/${Date.now()}-${cleanName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('Error uploading verification doc:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
