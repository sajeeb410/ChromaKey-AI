import React, { useState } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ColorSelector from './components/ColorSelector';
import ResultView from './components/ResultView';
import { generateBackgroundChange } from './services/geminiService';
import { Wand2, RefreshCw, X } from 'lucide-react';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#3B82F6'); // Default Blue
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [customInstruction, setCustomInstruction] = useState<string>("");

  const handleImageSelect = (base64: string) => {
    setOriginalImage(base64);
    setResultImage(null);
    setError(undefined);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setResultImage(null);
    setError(undefined);
    setCustomInstruction("");
  };

  const handleProcess = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(undefined);

    try {
      const result = await generateBackgroundChange(originalImage, selectedColor, customInstruction);
      setResultImage(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Configuration
              </h2>
              
              {!originalImage ? (
                 <div className="py-8">
                     <p className="text-slate-400 text-sm mb-4">Start by uploading an image you want to transform.</p>
                 </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ColorSelector 
                        selectedColor={selectedColor} 
                        onColorSelect={setSelectedColor} 
                    />

                    <div className="pt-4 border-t border-slate-800">
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Additional Instructions (Optional)
                        </label>
                        <textarea
                            value={customInstruction}
                            onChange={(e) => setCustomInstruction(e.target.value)}
                            placeholder="E.g., Make the lighting warmer, add a shadow..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                         <button
                            onClick={handleProcess}
                            disabled={isLoading}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold shadow-lg transition-all
                                ${isLoading 
                                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/25 active:scale-[0.98]'
                                }
                            `}
                        >
                            {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                            {isLoading ? 'Processing...' : 'Generate Background'}
                        </button>
                        
                        <button
                            onClick={handleReset}
                            disabled={isLoading}
                            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                            title="Reset Image"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
              )}
            </div>

            {/* Tips / Info */}
            <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
               <h3 className="text-sm font-semibold text-slate-300 mb-2">Pro Tips</h3>
               <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
                   <li>Select a color that contrasts with the subject for best results.</li>
                   <li>Use 'Transparent' to create PNG cutouts.</li>
                   <li>The AI preserves shadows for a realistic look.</li>
               </ul>
            </div>
          </div>

          {/* Right Panel: Workspace */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {!originalImage ? (
                <div className="h-full flex flex-col justify-center animate-in fade-in duration-500">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl text-center">
                         <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Upload a Photo to Begin</h2>
                         <p className="text-slate-400 max-w-md mx-auto mb-8">
                             Drag and drop your image here to instantly remove or replace the background using Google's Gemini AI.
                         </p>
                         <div className="max-w-xl mx-auto">
                            <UploadZone onImageSelected={handleImageSelect} />
                         </div>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex flex-col animate-in zoom-in-95 duration-300">
                     <ResultView 
                        originalUrl={originalImage} 
                        resultUrl={resultImage} 
                        isLoading={isLoading} 
                        error={error}
                     />
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
