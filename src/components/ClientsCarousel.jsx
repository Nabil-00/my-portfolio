import React from 'react';

const clients = [
    { name: 'DefendHub Enterprise', logo: '/logos/defendhub.png', url: 'https://www.defendhub.ng/' },
    { name: 'Nexora LLC', logo: '/logos/nexora.png', url: 'https://www.nexoraglobalholdings.com/' },
    { name: 'Neolife International', logo: '/logos/neolife.png', url: 'https://neolife.com/' },
    { name: 'Hama Academy', logo: '/logos/hama.png' },
    { name: 'Abrob Industry', logo: '/logos/abrob.png', url: 'https://www.abrobindustry.com/' },
    { name: 'Ramu', logo: '/logos/ramu.svg' },
];

const ClientsCarousel = () => {
    return (
        <section className="clients-section section-bg-2 py-section" aria-labelledby="clients-heading">
            <div className="container clients-heading-wrap">
                <h2 id="clients-heading">Who I&rsquo;ve worked with</h2>
                <p>Teams and organizations I&rsquo;ve helped move from an idea to working software.</p>
            </div>

            <div className="carousel-wrapper">
                <div className="carousel-track">
                    {[0, 1, 2, 3].map((copy) => (
                        <div className="carousel-group" aria-hidden={copy > 0 || undefined} key={`group-${copy}`}>
                            {clients.map((client) => (
                                <div className="carousel-item" key={`${copy}-${client.name}`}>
                                    <div className="client-logo-frame">
                                        {client.url ? (
                                            <a href={client.url} target="_blank" rel="noopener noreferrer" aria-label={`${client.name} website`}>
                                                <img
                                                    className={client.className || undefined}
                                                    src={client.logo}
                                                    alt={copy === 0 ? `${client.name} logo` : ''}
                                                    loading="lazy"
                                                />
                                            </a>
                                        ) : (
                                            <img
                                                className={client.className || undefined}
                                                src={client.logo}
                                                alt={copy === 0 ? `${client.name} logo` : ''}
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                    <span>{client.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsCarousel;
