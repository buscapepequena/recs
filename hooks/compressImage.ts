const MAX_SIDE = 1280;
const MIN_SIDE = 480;
const START_QUALITY = 0.82;
const MIN_QUALITY = 0.5;

export const MAX_PHOTO_BYTES = 1000000;

export const dataUrlSize = (dataUrl: string) => {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Math.floor((base64.length * 3) / 4);
};

export async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas");
  let side = Math.min(MAX_SIDE, Math.max(bitmap.width, bitmap.height));
  let result = "";
  while (side >= MIN_SIDE) {
    const scale = side / Math.max(bitmap.width, bitmap.height);
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    for (let quality = START_QUALITY; quality >= MIN_QUALITY; quality -= 0.08) {
      result = canvas.toDataURL("image/jpeg", quality);
      if (dataUrlSize(result) <= MAX_PHOTO_BYTES) {
        bitmap.close();
        return result;
      }
    }
    side = Math.round(side * 0.75);
  }
  bitmap.close();
  throw new Error("photo too large");
}
