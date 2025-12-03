import React from 'react';
import { Download, AlertCircle } from 'lucide-react';

interface ResultViewProps {
  originalUrl: string;
  resultUrl: string | null;
  isLoading: boolean;
  error?: string;
}

const ResultView: React.FC<ResultViewProps> = ({ originalUrl, resultUrl, isLoading, error }) => {
  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    link.download = `chromakey-edited-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Original */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-400">Original</h3>
        <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-sm">
          <img 
            src={originalUrl} 
            alt="Original" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Result */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
             <h3 className="text-sm font-semibold text-blue-400">Result</h3>
             {resultUrl && !isLoading && (
                 <button 
                    onClick={handleDownload}
                    className="text-xs flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                 >
                     <Download className="w-3 h-3" /> Save
                 </button>
             )}
        </div>
       
        <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg group">
          
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
              <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-blue-200 font-medium animate-pulse">Generative AI Processing...</p>
              <p className="text-xs text-slate-500 mt-2">This may take a few seconds</p>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-center p-6">
                <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
                <p className="text-red-400 font-medium mb-1">Processing Failed</p>
                <p className="text-xs text-slate-400">{error}</p>
            </div>
          ) : resultUrl ? (
            <img 
              src={resultUrl} 
              alt="Processed" 
              className="w-full h-full object-contain bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                <p className="text-sm">Waiting for generation...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultView;
