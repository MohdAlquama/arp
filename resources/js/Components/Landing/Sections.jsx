import React, { useState } from 'react';
import Icon from './Icons';

export function SectionHead({ title, sub }) {
    return (
        <div className="fl-section-head">
            <h2>{title}</h2>
            {sub && <p>{sub}</p>}
        </div>
    );
}

export function Services({ data }) {
    return (
        <section className="fl-section">
            <div className="fl-container fl-scroller">
                {data.services.map((s) => (
                    <article className="fl-service" key={s.title}>
                        <div className="fl-service-thumb">
                            {s.image ? <img src={s.image} alt="" /> : <Icon name="bolt" size={26} />}
                        </div>
                        <div>
                            <h3>{s.title}</h3>
                            <p>{s.text}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export function Banners({ data }) {
    return (
        <section className="fl-section">
            <div className="fl-container fl-scroller">
                {data.banners.map((b) => (
                    <a href="#" className="fl-banner" key={b.title}>
                        {b.image && <img src={b.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        <div className="fl-banner-text">
                            <strong>{b.title}</strong>
                            <span>{b.sub}</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

export function Steps({ data }) {
    return (
        <section className="fl-section">
            <div className="fl-container fl-steps">
                <div>
                    <h2 className="fl-steps-title">{data.stepsTitle}</h2>
                    <ol className="fl-timeline">
                        {data.steps.map((s, i) => (
                            <li key={s}>
                                <span className="fl-dot">{i + 1}</span>
                                <span>{s}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="fl-step-art">
                    {data.steps.map((s, i) => (
                        <div key={s}>
                            {data.stepImages[i] ? (
                                <img src={data.stepImages[i]} alt={s} />
                            ) : (
                                <Icon name={['search', 'cart', 'send', 'bolt'][i] || 'bolt'} size={36} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Categories({ data }) {
    return (
        <section className="fl-section">
            <div className="fl-container">
                <SectionHead title={data.categoriesTitle} sub={data.categoriesSub} />
                <div className="fl-cats">
                    {data.categories.map((c) => (
                        <a href="#" className="fl-cat" key={c.name}
                           style={c.image ? { backgroundImage: `url(${c.image})`, backgroundSize: 'cover' } : undefined}>
                            <div className="fl-cat-text">
                                <h4>{c.name}</h4>
                                <span>{c.items} items</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Gallery({ data }) {
    return (
        <section className="fl-section">
            <div className="fl-container">
                <SectionHead title={data.galleryTitle} sub={data.gallerySub} />
                <div className="fl-gallery">
                    {data.gallery.map((g, i) =>
                        g ? <img key={i} src={g} alt="" /> : <div key={i} aria-hidden="true" />
                    )}
                </div>
            </div>
        </section>
    );
}

export function Zone({ data }) {
    const z = data.zone;
    const [place, setPlace] = useState('');
    return (
        <section className="fl-section">
            <div className="fl-container fl-zone">
                <div className="fl-zone-map">
                    {z.zones.map((n) => (
                        <span className="fl-zone-chip" key={n}>
                            <Icon name="pin" size={14} /> {n}
                        </span>
                    ))}
                </div>
                <div className="fl-zone-picker">
                    <h3>{z.pickerTitle}</h3>
                    <p>{z.pickerText}</p>
                    <div className="fl-row">
                        <label className="fl-field">
                            <Icon name="pin" size={18} />
                            <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Enter your area" />
                        </label>
                        <button type="button" className="fl-btn fl-btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Join({ data }) {
    const j = data.join;
    const cards = [
        { ...j.restaurant, icon: 'store' },
        { ...j.delivery, icon: 'bike' },
    ];
    const apps = [j.restaurantApp, j.deliveryApp];
    return (
        <section className="fl-section">
            <div className="fl-container">
                <SectionHead title={j.title} sub={j.text} />
                <div className="fl-join-grid">
                    {cards.map((c) => (
                        <div className="fl-join-card" key={c.title}>
                            <div>
                                <h3>{c.title}</h3>
                                <p>{c.text}</p>
                                <a className="fl-btn fl-btn-primary" href={c.href}>{c.button}</a>
                            </div>
                            <div className="fl-join-art"><Icon name={c.icon} size={36} /></div>
                        </div>
                    ))}
                    {apps.map((a) => (
                        <div className="fl-join-card" key={a.title}>
                            <div>
                                <h3>{a.title}</h3>
                                <p>{a.text}</p>
                                <a className="fl-btn fl-btn-outline" href={a.href}>Download</a>
                            </div>
                            <div className="fl-qr">QR</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
