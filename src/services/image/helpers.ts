export const calculateDimensions = (
  image: HTMLImageElement,
  ratio: { width: number; height: number }
) => {
  let sHeight = image.height;
  while ((sHeight / ratio.height) * ratio.width > image.width) {
    if (sHeight > 10) sHeight = sHeight - 10;
    else return new Error('File is too small');
  }

  const sWidth = (sHeight / ratio.height) * ratio.width;
  const sy = (image.height - sHeight) / 2;
  const sx = image.width - (sWidth % 2) === 0 ? 0 : (image.width - sWidth) / 2;

  return { sx, sy, sWidth, sHeight };
};

export const convertRatio = (aspectRatio: string) => {
  const ratio = aspectRatio.split(':').map((value) => {
    const intValue = parseInt(value, 10);
    return intValue;
  });

  if (
    ratio.length !== 2 ||
    isNaN(ratio[0]) ||
    ratio[0] < 1 ||
    isNaN(ratio[1]) ||
    ratio[1] < 1
  )
    return new Error('Invalid aspect ratio');

  return { width: ratio[0], height: ratio[1] };
};

export const createCanvas = (
  image: HTMLImageElement,
  height: number,
  ratio: { width: number; height: number },
  dimensions: { sx: number; sy: number; sWidth: number; sHeight: number }
) => {
  const canvas = document.createElement('canvas');
  canvas.width = ratio.width * (height / ratio.height);
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return new Error('Oops, something went wrong. Please try again.');

  ctx.drawImage(
    image,
    dimensions.sx,
    dimensions.sy,
    dimensions.sWidth,
    dimensions.sHeight,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );

  return ctx;
};

export const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr: any = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const isImageFile = (file: File) => {
  return file && file['type'].split('/')[0] === 'image';
};

export const urlToFile = (url: string, filename: string, mimeType: string) => {
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));
};
