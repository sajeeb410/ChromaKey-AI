import React from 'react';
import { Check } from 'lucide-react';
import { ColorOption, DEFAULT_COLORS } from '../types';

interface ColorSelectorProps {
  selectedColor: string;
  onColorSelect: (hex: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Background Color</h3>
        <span className="text-xs font-mono text-slate-500">{selectedColor}</span>
      </div>
      
      <div className="grid grid-cols-5 gap-3">
        {DEFAULT_COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorSelect(color.hex)}
            className={`
              relative w-full aspect-square rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${selectedColor === color.hex 
                ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                : 'border-transparent hover:scale-105 hover:border-slate-500'}
              ${color.class}
              ${color.name === 'White' && selectedColor !== color.hex ? 'border-slate-300' : ''}
            `}
            title={color.name}
            aria-label={`Select ${color.name}`}
          >
            {selectedColor === color.hex && (
              <Check className={`w-4 h-4 ${['#FFFFFF', 'transparent', '#EAB308'].includes(color.hex) ? 'text-black' : 'text-white'}`} />
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
         <label className="flex flex-col gap-2">
           <span className="text-xs text-slate-400">Custom Hex Code</span>
           <div className="flex items-center gap-2">
             <div 
                className="w-8 h-8 rounded-full border border-slate-600 shadow-inner"
                style={{ backgroundColor: selectedColor }}
             />
             <input 
               type="text" 
               value={selectedColor}
               onChange={(e) => onColorSelect(e.target.value)}
               className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono uppercase"
               placeholder="#000000"
             />
             <input 
                type="color"
                value={selectedColor.startsWith('#') ? selectedColor : '#000000'}
                onChange={(e) => onColorSelect(e.target.value)}
                className="w-8 h-8 p-0 border-0 rounded overflow-hidden cursor-pointer"
             />
           </div>
         </label>
      </div>
    </div>
  );
};

export default ColorSelector;
