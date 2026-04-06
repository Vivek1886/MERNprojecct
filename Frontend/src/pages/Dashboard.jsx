import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, File, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/analysis/');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const handleDeleteAnalysis = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/analysis/${id}`);
      setHistory(prev => prev.filter(item => item._id !== id));
      if (result && (result._id === id || result.analysisId === id)) setResult(null);
    } catch (err) {
      console.error('Failed to delete analysis', err);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf') {
      return setError('Please upload a PDF file.');
    }
    
    if (selected.size > 2 * 1024 * 1024) {
      return setError('File size must be strictly less than 2MB.');
    }

    setError('');
    setFile(selected);
    setResult(null);
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) return setError('Please select a file first.');
    
    setError('');
    setUploading(true);
    let resumeId = null;

    try {
      // 1. Upload
      const formData = new FormData();
      formData.append('resume', file);
      const uploadRes = await axios.post('/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      resumeId = uploadRes.data.resumeId;
    } catch (err) {
      setUploading(false);
      return setError('Failed to upload resume. ' + (err.response?.data?.error || ''));
    }

    setUploading(false);
    setAnalyzing(true);

    try {
      // 2. Analyze
      const analyzeRes = await axios.post('/api/analysis/analyze', { resumeId });
      setResult(analyzeRes.data);
      fetchHistory(); // refresh history
    } catch (err) {
      setError('Analysis failed. ' + (err.response?.data?.error || ''));
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)', gap: '2rem' }}>
        {/* Upload Column */}
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UploadCloud size={24} color="var(--primary)" />
            Analyze New Resume
          </h3>

          <div 
            style={{
              border: '2px dashed var(--border-color)',
              borderRadius: '12px',
              padding: '2.5rem 1rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: 'rgba(0,0,0,0.2)',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease',
            }}
            onClick={() => document.getElementById('resume-upload').click()}
            className="upload-zone"
          >
            {file ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <File size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                <p style={{ fontWeight: 500 }}>{file.name}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <UploadCloud size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Click to upload PDF</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Max file size: 2MB</p>
              </div>
            )}
            <input 
              id="resume-upload" 
              type="file" 
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {error && (
            <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={handleUploadAndAnalyze}
            disabled={!file || uploading || analyzing}
          >
            {uploading ? 'Uploading...' : analyzing ? 'AI Analyzing...' : 'Start Analysis'}
          </button>
        </div>

        {/* Results Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {result && (
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem', border: '1px solid var(--success)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 color="var(--success)" /> Analysis Complete
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>Best Role: <strong className="gradient-text">{result.bestRole || 'Not Identified'}</strong></p>
                </div>
                <div style={{ 
                  background: 'linear-gradient(135deg, var(--bg-dark), rgba(16, 185, 129, 0.2))',
                  border: '2px solid var(--success)',
                  borderRadius: '50%', 
                  width: '80px', 
                  height: '80px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: 'var(--success)',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
                }}>
                  {result.score}%
                </div>
              </div>

              {result.skillsFound && result.skillsFound.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Detected Skills:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {result.skillsFound.map(skill => (
                      <span key={skill} style={{ 
                        padding: '0.25rem 0.75rem', 
                        background: 'rgba(59, 130, 246, 0.2)', 
                        border: '1px solid var(--secondary)',
                        borderRadius: '9999px',
                        fontSize: '0.875rem'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.suggestions && (
                <div>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>AI Suggestions:</h4>
                  <div style={{ 
                    background: 'linear-gradient(145deg, rgba(14, 165, 233, 0.05) 0%, rgba(0,0,0,0.2) 100%)', 
                    padding: '1.5rem', 
                    borderRadius: '12px', 
                    lineHeight: '1.6',
                    borderLeft: '4px solid var(--accent)',
                    boxShadow: 'inset 0 0 20px rgba(14, 165, 233, 0.05)'
                  }}>
                    {(Array.isArray(result.suggestions) ? result.suggestions : String(result.suggestions).split('\n')).filter(line => line && line.trim() !== '').map((line, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                        <div style={{ 
                          color: 'var(--bg-dark)', 
                          backgroundColor: 'var(--accent)', 
                          borderRadius: '50%', 
                          width: '18px', 
                          height: '18px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginTop: '4px',
                          flexShrink: 0
                        }}>✓</div>
                        <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                          {line.replace(/^[-*•]\s*/, '')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* History */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Past Analyses</h3>
            {history.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No analyses yet. Upload a resume to get started.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {history.map(item => (
                  <div key={item._id} 
                    onClick={() => setResult(item)}
                    style={{ 
                      padding: '1rem', 
                      background: 'rgba(0,0,0,0.2)', 
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderLeft: '4px solid var(--primary)',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
                  >
                    <div>
                      <p style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{item.bestRole || 'Resume Analysis'}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {item.score}%
                      </div>
                      <button 
                        onClick={(e) => handleDeleteAnalysis(e, item._id)}
                        style={{ 
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--error)',
                          cursor: 'pointer',
                          display: 'flex',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
