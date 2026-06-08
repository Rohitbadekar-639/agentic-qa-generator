'use client';

import { useState } from 'react';
import { Loader2, Copy, Download } from 'lucide-react';
import CodeDisplay from './CodeDisplay';
import axios from 'axios';

interface GenerateTestResponse {
  code: string;
  framework: string;
  analysis?: {
    functional_requirements: string[];
    edge_cases: string[];
    business_logic: string[];
  };
}

export default function Dashboard() {
  const [story, setStory] = useState('');
  const [framework, setFramework] = useState('playwright');
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const handleGenerateTests = async () => {
    if (!story.trim()) {
      setError('Please enter a user story');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedCode('');
    setAnalysis(null);

    try {
      const apiUrl = 'https://agentic-qa-backend-skj9.onrender.com';
      const response = await axios.post<GenerateTestResponse>(
        `${apiUrl}/api/generate-tests`,
        {
          story: story.trim(),
          framework: framework,
        }
      );

      setGeneratedCode(response.data.code);
      setAnalysis(response.data.analysis);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          'Failed to generate tests. Check that the backend is running and accessible.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copied to clipboard!');
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const fileExtension =
      framework === 'playwright'
        ? 'spec.ts'
        : framework === 'jest'
          ? 'test.ts'
          : 'md';
    const fileName = `test-suite.${fileExtension}`;

    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(generatedCode)
    );
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Agentic QA Test Generator
          </h1>
          <p className="text-xl text-slate-300">
            Transform your Jira stories into comprehensive test suites powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <label className="block text-sm font-semibold text-white mb-3">
                Jira User Story / Feature Requirement
              </label>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Paste your Jira story here. Example: As a user, I want to login with email and password so that I can access my account..."
                className="w-full h-64 bg-slate-700 text-white rounded-lg p-4 border border-slate-600 focus:border-blue-500 focus:outline-none resize-none placeholder-slate-400"
              />
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <label className="block text-sm font-semibold text-white mb-3">
                Testing Framework
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="playwright">Playwright (TypeScript)</option>
                <option value="jest">Jest (TypeScript)</option>
                <option value="manual">Manual Test Scenarios (Markdown)</option>
              </select>
            </div>

            <button
              onClick={handleGenerateTests}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Test Suite'
              )}
            </button>

            {error && (
              <div className="bg-red-900/20 border border-red-700 text-red-200 p-4 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {generatedCode && (
              <>
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">
                      Generated {framework.charAt(0).toUpperCase() + framework.slice(1)} Tests
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyCode}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                        title="Copy code"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleDownloadCode}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                        title="Download file"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <CodeDisplay code={generatedCode} language={framework} />
                </div>

                {analysis && (
                  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Analysis Summary
                    </h3>
                    <div className="space-y-4">
                      {analysis.functional_requirements && (
                        <div>
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">
                            Functional Requirements
                          </h4>
                          <ul className="text-sm text-slate-300 space-y-1">
                            {analysis.functional_requirements.map(
                              (req: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  <span>{req}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {analysis.edge_cases && (
                        <div>
                          <h4 className="text-sm font-semibold text-orange-400 mb-2">
                            Edge Cases
                          </h4>
                          <ul className="text-sm text-slate-300 space-y-1">
                            {analysis.edge_cases.map((edge: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-orange-400 mt-1">•</span>
                                <span>{edge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {!generatedCode && !loading && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 border-dashed flex items-center justify-center min-h-96">
                <div className="text-center">
                  <p className="text-slate-400 text-lg">
                    Enter a user story and click "Generate Test Suite" to see results here
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 flex items-center justify-center min-h-96">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                  <p className="text-slate-300">Analyzing story and generating tests...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
