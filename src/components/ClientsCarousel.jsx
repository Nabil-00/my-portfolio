import React from 'react';

const clients = [
    { name: 'DefendHub Enterprise', logo: '/logos/defendhub.svg' },
    { name: 'Nexora LLC', logo: '/logos/nexora.png' },
    { name: 'Neolife International', logo: '/logos/neolife.png' },
    { name: 'Hama Academy', logo: '/logos/hama.png' },
    { name: 'Abrob Industry', logo: '/logos/abrob.png' },
    { name: 'Ramu', logo: '/logos/ramu.svg' },
];

const ClientsCarousel = () => {
    const doubled = [...clients, ...clients];

    return (
        <section className="section-bg-2 py-section" aria-label="Companies I've worked with">
            <div className="container">
                <p
                    style={{
                        fontSize: '12px',
                        letterSpacing: '0.12em',
                        color: 'var(--accent)',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        textAlign: 'center',
                        marginBottom: '40px',
                    }}
                >
                    Who I&rsquo;ve Worked With
                </p>
            </div>

            <div className="carousel-wrapper" style={{ overflow: 'hidden', position: 'relative' }}>
                <div
                    className="carousel-track"
                    style={{
                        display: 'flex',
                        gap: '80px',
                        alignItems: 'center',
                        width: 'max-content',
                        paddingLeft: '40px',
                    }}
                >
                    {doubled.map((client, i) => (
                        <div
                            key={`${client.name}-${i}`}
                            className="carousel-item"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={client.logo}
                                alt={`${client.name} logo`}
                                loading="lazy"
                                style={{
                                    height: '48px',
                                    width: 'auto',
                                    maxWidth: '140px',
                                    objectFit: 'contain',
                                }}
                            />
                            <span
                                style={{
                                    fontSize: '12px',
                                    color: 'var(--text-tertiary)',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {client.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsCarousel;
