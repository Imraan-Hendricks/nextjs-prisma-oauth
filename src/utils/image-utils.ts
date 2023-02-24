import {
  calculateDimensions,
  convertRatio,
  createCanvas,
  isImageFile,
  urlToFile,
} from './canvas-utils';

interface ImageOutputData {
  base64: string;
  dimensions: { width: number; height: number };
  file: File;
}

interface ResizeImageResponse {
  original: ImageOutputData;
  result: ImageOutputData;
}

interface ResizeImageOptions {
  aspectRatio: string;
  height: number;
  quality?: number;
}

export function resizeImage(
  originalFile: File,
  { aspectRatio, height, quality = 0.92 }: ResizeImageOptions,
  minHeight = 10
): Promise<ResizeImageResponse> {
  return new Promise((resolve, reject) => {
    if (!isImageFile(originalFile))
      return reject(new Error('File must be an image'));

    const reader = new FileReader();
    reader.readAsDataURL(originalFile);

    reader.onload = (event) => {
      const originalBase64 = event.target?.result as string;

      const imgElement = document.createElement('img');
      imgElement.src = originalBase64;

      imgElement.onload = async (e) => {
        const image = e.target as HTMLImageElement;

        if (image.height <= minHeight)
          return reject(new Error('File is too small'));

        const ratio = convertRatio(aspectRatio);
        if (ratio instanceof Error) return reject(ratio);

        const dimensions = calculateDimensions(image, ratio);
        if (dimensions instanceof Error) return reject(dimensions);

        const ctx = createCanvas(image, height, ratio, dimensions);
        if (ctx instanceof Error) return reject(ctx);

        const newBase64 = ctx.canvas.toDataURL(originalFile.type, quality);
        const newFile = await urlToFile(
          newBase64,
          originalFile.name,
          originalFile.type
        );

        resolve({
          original: {
            base64: originalBase64,
            dimensions: { width: image.width, height: image.height },
            file: originalFile,
          },
          result: {
            base64: newBase64,
            dimensions: { width: ctx.canvas.width, height: ctx.canvas.height },
            file: newFile,
          },
        });
      };
    };
  });
}
