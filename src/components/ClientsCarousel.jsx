import React from 'react';

const clients = [
    { name: 'DefendHub Enterprise', logo: '/logos/defendhub.svg', className: 'client-logo--defendhub' },
    { name: 'Nexora LLC', logo: '/logos/nexora.png' },
    { name: 'Neolife International', logo: '/logos/neolife.png' },
    { name: 'Hama Academy', logo: '/logos/hama.png' },
    { name: 'Abrob Industry', logo: '/logos/abrob.png' },
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
                    {[false, true].map((duplicate) => (
                        <div className="carousel-group" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'original'}>
                            {clients.map((client) => (
                                <div className="carousel-item" key={`${duplicate ? 'copy-' : ''}${client.name}`}>
                                    <div className="client-logo-frame">
                                        <img
                                            className={client.className || undefined}
                                            src={client.logo}
                                            alt={duplicate ? '' : `${client.name} logo`}
                                            loading="lazy"
                                        />
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
