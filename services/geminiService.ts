import { GoogleGenAI } from "@google/genai";
import { stripBase64Prefix, getMimeTypeFromBase64 } from "../utils/imageHelper";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends an image to Gemini 2.5 Flash Image to change its background.
 * @param imageBase64 Full data URL of the image
 * @param targetColorHex Hex code of the target color or description
 */
export const generateBackgroundChange = async (
  imageBase64: string,
  targetColorHex: string,
  customPrompt?: string
): Promise<string> => {
  
  const rawBase64 = stripBase64Prefix(imageBase64);
  const mimeType = getMimeTypeFromBase64(imageBase64);

  // Construct a precise prompt for the model
  let prompt = `Change the background of this image to a solid, flat color: ${targetColorHex}. 
  Ensure the main subject is perfectly segmented and preserved. 
  The lighting on the subject should remain natural. 
  Output ONLY the modified image.`;

  if (targetColorHex === 'transparent') {
      prompt = `Remove the background of this image completely, leaving it on a transparent background if supported, or a pure white background if transparency is not possible. Focus on high quality edge detection.`;
  }

  if (customPrompt) {
      prompt = `${customPrompt}. The target background color is ${targetColorHex}.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: rawBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Note: responseMimeType is not supported for nano banana (flash image) models
    });

    // Iterate through parts to find the image
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini API");
    }

    const parts = candidates[0].content.parts;
    let resultImageUrl = '';

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        // Construct the data URL for the returned image
        // The API usually returns the same mime type or a standard one like image/jpeg or image/png
        // We guess png if not provided, but usually we can infer or it's standard.
        const returnedMime = part.inlineData.mimeType || 'image/png';
        resultImageUrl = `data:${returnedMime};base64,${part.inlineData.data}`;
        break; // Found the image, exit loop
      }
    }

    if (!resultImageUrl) {
      // Sometimes the model might refuse and return text explaining why
      const textPart = parts.find(p => p.text);
      if (textPart) {
        throw new Error(`Model returned text instead of image: ${textPart.text}`);
      }
      throw new Error("Model did not return a valid image.");
    }

    return resultImageUrl;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to process image with Gemini.");
  }
};
