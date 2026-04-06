import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Zap, ShieldCheck } from 'lucide-react';

const Landing = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem', paddingBottom: '4rem' }}>
      <section style={{ textAlign: 'center', marginTop: '4rem', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '4rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
          Elevate Your Resume with <span className="gradient-text">AI Intelligence</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          Get instant, actionable feedback on your resume. Our advanced AI analyzes your 
          skills, structure, and impact to help you land your dream job faster.
        </p>
        <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
          Start Free Analysis
        </Link>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <Zap size={32} color="var(--secondary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Instant Insights</h3>
          <p style={{ color: 'var(--text-muted)' }}>Get an immediate score and detailed breakdown of your resume's strengths and weaknesses within seconds.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <FileText size={32} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Skill Extraction</h3>
          <p style={{ color: 'var(--text-muted)' }}>Our NLP engine detects hard and soft skills, mapping them to industry standards and suggested roles.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <ShieldCheck size={32} color="var(--accent)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Data Privacy</h3>
          <p style={{ color: 'var(--text-muted)' }}>Your data is secure. We use enterprise-grade encryption to ensure your personal information remains private.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
