export interface ProcessedImage {
  id: string;
  originalUrl: string;
  resultUrl: string | null;
  timestamp: number;
  promptUsed: string;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  class: string; // Tailwind bg class for preview
}

export const DEFAULT_COLORS: ColorOption[] = [
  { name: 'White', hex: '#FFFFFF', class: 'bg-white' },
  { name: 'Black', hex: '#000000', class: 'bg-black' },
  { name: 'Transparent', hex: 'transparent', class: "bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')]" },
  { name: 'Red', hex: '#EF4444', class: 'bg-red-500' },
  { name: 'Green', hex: '#22C55E', class: 'bg-green-500' },
  { name: 'Blue', hex: '#3B82F6', class: 'bg-blue-500' },
  { name: 'Yellow', hex: '#EAB308', class: 'bg-yellow-500' },
  { name: 'Purple', hex: '#A855F7', class: 'bg-purple-500' },
  { name: 'Pink', hex: '#EC4899', class: 'bg-pink-500' },
  { name: 'Slate', hex: '#64748B', class: 'bg-slate-500' },
];
