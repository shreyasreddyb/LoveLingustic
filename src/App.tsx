import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Ghost, Brain, MessageCircle } from 'lucide-react';
import { analyzeText } from './services/analysis';
import { AnalysisCard } from './components/AnalysisCard';
import type { AnalysisResult, AnalysisError } from './types/analysis';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for API key on mount
  useEffect(() => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setError('Please set your Gemini API key in the .env file as VITE_GEMINI_API_KEY');
    }
  }, []);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeText(text);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 
        (err as AnalysisError)?.message || 'Analysis failed. Please try again.';
      setError(errorMessage);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-purple-800 mb-4 flex items-center justify-center gap-3">
            <Heart className="text-pink-500" />
            Love Linguist
          </h1>
          <p className="text-gray-600 text-xl">Decode your crush's messages with AI</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your conversation here..."
            className="w-full h-48 p-4 mb-6 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              'Analyze'
            )}
          </motion.button>

          {analysis && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnalysisCard
                  icon={<Heart className="text-pink-500" />}
                  title="Interest Level"
                  value={analysis.interestLevel}
                />
                <AnalysisCard
                  icon={<MessageCircle className="text-purple-500" />}
                  title="Flirting Score"
                  value={analysis.flirtingScore}
                />
                <AnalysisCard
                  icon={<AlertTriangle className="text-red-500" />}
                  title="Red Flags"
                  value={analysis.redFlags}
                />
                <AnalysisCard
                  icon={<Brain className="text-blue-500" />}
                  title="Mood"
                  value={analysis.mood}
                />
                <AnalysisCard
                  icon={<Ghost className="text-gray-500" />}
                  title="Ghosting Risk"
                  value={analysis.ghostingRisk}
                />
              </div>

              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">AI Insights</h3>
                <p className="text-gray-700">{analysis.insights}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;