import React from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import siteContent from '../data/siteContent';

const Contact = () => {
    const { meta, contact } = siteContent;
    const { labels } = contact;
    const [selectedService, setSelectedService] = React.useState(contact.serviceOptions[0]);

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

                <form className="max-w-[600px] mx-auto mt-[60px] space-y-5">
                    <div>
                        <label htmlFor="contact-name" className="block mb-2" style={{ color: 'var(--text-secondary)' }}>
                            {labels.name}
                        </label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            style={{
                                background: 'var(--bg-2)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '14px 18px',
                                color: 'var(--text-primary)',
                                fontSize: '16px',
                                width: '100%',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.outline = 'none';
                                e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
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
                            style={{
                                background: 'var(--bg-2)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '14px 18px',
                                color: 'var(--text-primary)',
                                fontSize: '16px',
                                width: '100%',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.outline = 'none';
                                e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="contact-message" className="block mb-2" style={{ color: 'var(--text-secondary)' }}>
                            {labels.message}
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            style={{
                                background: 'var(--bg-2)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '14px 18px',
                                color: 'var(--text-primary)',
                                fontSize: '16px',
                                width: '100%',
                                minHeight: '120px',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.outline = 'none';
                                e.currentTarget.style.borderColor = 'var(--accent)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                            }}
                        />
                    </div>

                    <div>
                        <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>{labels.service}</p>
                        <div className="flex flex-wrap gap-2">
                            {contact.serviceOptions.map((option) => {
                                const isSelected = selectedService === option;
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setSelectedService(option)}
                                        style={{
                                            background: isSelected ? 'var(--accent)' : 'var(--bg-3)',
                                            border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                                            color: isSelected ? '#000' : 'var(--text-secondary)',
                                            borderRadius: 'var(--radius-pill)',
                                            padding: '6px 16px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-1.5"
                        style={{
                            width: '100%',
                            background: 'var(--accent)',
                            color: '#000',
                            fontWeight: 700,
                            borderRadius: 'var(--radius-pill)',
                            padding: '16px',
                            fontSize: '16px',
                        }}
                    >
                        {labels.submit}
                        <ArrowRight size={16} />
                    </button>
                </form>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-5" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <a
                        href={`mailto:${meta.email}`}
                        className="inline-flex items-center gap-2"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                    >
                        <Mail size={14} />
                        {meta.email}
                    </a>
                    <a
                        href={meta.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
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
