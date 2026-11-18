/**
 * Client-Side Luxury Image Compressor
 * Automatically resizes & compresses high-resolution camera / smartphone photos
 * before network upload to prevent HTTP 413 (Payload Too Large) and Vercel 4.5MB limits.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  targetMaxSizeBytes?: number;
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const {
    maxWidth = 2048,
    maxHeight = 2560,
    quality = 0.85,
    targetMaxSizeBytes = 2.5 * 1024 * 1024, // 2.5 MB ceiling (comfortably below 4.5MB Vercel limit)
  } = options;

  // 1. Skip non-image or vector/animated files
  if (
    !file.type.startsWith('image/') ||
    file.type === 'image/svg+xml' ||
    file.type === 'image/gif'
  ) {
    return file;
  }

  // 2. If already small in file size (under 1.2MB), check if compression is needed
  // If it's already under 1.2MB, we can skip compression unless it's an unusually massive dimension
  if (file.size <= 1.2 * 1024 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    // Fail-safe timeout: if canvas/image takes > 10s, return original file
    const timeoutId = setTimeout(() => {
      console.warn('Image compression timed out, proceeding with original file');
      resolve(file);
    }, 10000);

    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        clearTimeout(timeoutId);

        try {
          let { width, height } = img;

          // Calculate downscaled dimensions preserving aspect ratio
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }

          // Use high quality image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to JPEG blob
          const exportMime = file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              // Build compressed File object
              const originalExt = file.name.split('.').pop() || 'jpg';
              const newExt = exportMime === 'image/webp' ? 'webp' : 'jpg';
              const newFileName = file.name.replace(
                new RegExp(`\\.${originalExt}$`, 'i'),
                `.${newExt}`
              );

              const compressedFile = new File([blob], newFileName, {
                type: exportMime,
                lastModified: Date.now(),
              });

              console.log(
                `📸 Compressed ${file.name}: ${(file.size / (1024 * 1024)).toFixed(2)} MB -> ${(compressedFile.size / (1024 * 1024)).toFixed(2)} MB (${width}x${height})`
              );

              resolve(compressedFile);
            },
            exportMime,
            quality
          );
        } catch (canvasErr) {
          console.warn('Canvas compression error, using original file:', canvasErr);
          resolve(file);
        }
      };

      img.onerror = (err) => {
        clearTimeout(timeoutId);
        URL.revokeObjectURL(objectUrl);
        console.warn('Failed to load image for compression:', err);
        resolve(file);
      };

      img.src = objectUrl;
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn('Image compression initialization error:', err);
      resolve(file);
    }
  });
}
