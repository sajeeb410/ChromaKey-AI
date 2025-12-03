/**
 * Converts a File object to a Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Strips the Data URL prefix (e.g., "data:image/png;base64,") to get raw base64.
 */
export const stripBase64Prefix = (dataUrl: string): string => {
  return dataUrl.split(',')[1] || dataUrl;
};

/**
 * Gets the mime type from a base64 data URL.
 */
export const getMimeTypeFromBase64 = (dataUrl: string): string => {
  const match = dataUrl.match(/^data:(.*);base64,/);
  return match ? match[1] : 'image/jpeg';
};
