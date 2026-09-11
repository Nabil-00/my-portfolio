import React, { useState } from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import siteContent from '../data/siteContent';

/* 
CSS Classes for index.css:

.contact-input {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 14px 18px;
    color: var(--text-primary);
    font-size: 16px;
    width: 100%;
    transition: border-color 0.2s ease;
}
.contact-input:focus-visible {
    outline: none;
    border-color: var(--accent);
}

.inquiry-chip {
    background: var(--bg-3);
    border: 1px solid var(--border);
    color: var(--text-secondary);
    border-radius: var(--radius-pill);
    padding: 6px 16px;
    cursor: pointer;
    display: inline-block;
    transition: all 0.2s ease;
}
@media (hover: hover) and (pointer: fine) {
    .inquiry-chip:hover {
        border-color: var(--accent);
        color: var(--text-primary);
    }
}
.inquiry-chip:focus-within {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}
.inquiry-chip--selected {
    background: var(--accent);
    border: 1px solid var(--accent);
    color: #000;
}

.contact-link {
    color: var(--text-secondary);
    transition: color 0.2s ease;
}
@media (hover: hover) and (pointer: fine) {
    .contact-link:hover {
        color: var(--text-primary);
    }
}
.contact-link:focus-visible {
    color: var(--text-primary);
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
}
*/

const options = ['Software Engineering', 'AI / Automation', 'Technical Education', 'Collaboration', 'Other'];

const Contact = () => {
    const { meta, contact } = siteContent;
    const { labels } = contact;
    const [status, setStatus] = useState('idle'); // idle, submitting, accepted, failed
    const [selectedInquiry, setSelectedInquiry] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setStatus('accepted');
                form.reset();
                setSelectedInquiry('');
            } else {
                setStatus('failed');
            }
        } catch {
            setStatus('failed');
        }
    };

    return (
        <section id="contact" style={{ background: 'var(--bg)', padding: '120px 0' }}>
            <div className="container">
                <div className="text-center max-w-4xl mx-auto">
                    <h2
                        style={{
                            fontSize: 'clamp(36px, 6vw, 64px)',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {contact.heading[0]}<span style={{ color: 'var(--accent)' }}>{contact.heading[1]}</span>{contact.heading[2]}
                    </h2>
                    <p className="mt-3" style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
                        {contact.subtext}
                    </p>
                </div>

                <div aria-live="polite" className="sr-only">
                    {status === 'submitting' && 'Submitting your message...'}
                    {status === 'accepted' && 'Message sent successfully!'}
                    {status === 'failed' && 'Failed to send message. Please try again.'}
                </div>

                <form 
                    className="max-w-[600px] mx-auto mt-[60px] space-y-5"
                    onSubmit={handleSubmit}
                >
                    {status === 'accepted' ? (
                        <div style={{ background: 'var(--bg-2)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border)' }}>
                            <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', marginBottom: '8px' }}>Thank you!</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Your message has been sent successfully. I'll get back to you soon.</p>
                            <button 
                                type="button" 
                                onClick={() => setStatus('idle')}
                                style={{ marginTop: '16px', color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer' }}
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <>
                            {status === 'failed' && (
                                <div style={{ background: '#3b0000', padding: '12px', borderRadius: 'var(--radius-md)', color: '#ffb3b3', border: '1px solid #ff4d4d', marginBottom: '16px' }}>
                                    There was a problem sending your message. Please try again.
                                </div>
                            )}
                            
                            <div>
                                <label htmlFor="contact-name" className="block mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    {labels.name}
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    className="contact-input"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="block mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    {labels.email}
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    className="contact-input"
                                    required
                                />
                            </div>

                            <fieldset>
                                <legend className="block mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    What would you like to discuss?
                                </legend>
                                <div className="flex flex-wrap gap-2">
                                    {options.map((option) => (
                                        <label 
                                            key={option} 
                                            className={selectedInquiry === option ? 'inquiry-chip inquiry-chip--selected' : 'inquiry-chip'}
                                        >
                                            <input 
                                                type="radio" 
                                                name="inquiryType" 
                                                value={option} 
                                                className="sr-only"
                                                checked={selectedInquiry === option}
                                                onChange={(e) => setSelectedInquiry(e.target.value)}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <div>
                                <label htmlFor="contact-message" className="block mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    {labels.message}
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    className="contact-input"
                                    style={{ minHeight: '120px' }}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="btn-primary"
                                style={{ width: '100%', padding: '16px', fontSize: '16px' }}
                            >
                                {status === 'submitting' ? 'Sending...' : labels.submit}
                                {status !== 'submitting' && <ArrowRight size={16} />}
                            </button>
                        </>
                    )}
                </form>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-5" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <a
                        href={`mailto:${meta.email}`}
                        className="contact-link inline-flex items-center gap-2"
                    >
                        <Mail size={14} />
                        {meta.email}
                    </a>
                    <a
                        href={meta.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link inline-flex items-center gap-2"
                    >
                        <MessageCircle size={14} />
                        {labels.whatsappCta}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
