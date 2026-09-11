import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import siteContent from '../data/siteContent';

const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                borderBottom: '1px solid var(--border)',
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {question}
                </span>
                <ChevronDown
                    size={18}
                    style={{
                        color: 'var(--text-secondary)',
                        transform: open ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                        marginLeft: '12px',
                    }}
                />
            </button>
            <div
                style={{
                    maxHeight: open ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                }}
            >
                <p
                    style={{
                        fontSize: '15px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        paddingBottom: '16px',
                    }}
                >
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const { sections } = siteContent;
    const { faq } = sections;

    return (
        <section id="faq" className="section-bg py-section">
            <div className="container" style={{ maxWidth: '720px' }}>
                <p
                    style={{
                        fontSize: '12px',
                        letterSpacing: '0.12em',
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                    }}
                >
                    {faq.eyebrow}
                </p>
                <h2
                    className="mt-3"
                    style={{
                        fontSize: 'clamp(28px, 4vw, 40px)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                    }}
                >
                    {faq.heading}
                </h2>

                <div className="mt-8">
                    {faq.items.map((item, i) => (
                        <FAQItem key={i} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
