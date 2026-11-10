import React, { useState } from 'react';
import Icon from './Icons';

export default function Hero({ data }) {
    const { hero, stats } = data;
    const [place, setPlace] = useState('');

    const locate = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((p) =>
            setPlace(`${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`)
        );
    };

    return (
        <section className="fl-hero">
            <div className="fl-container">
                <div
                    className="fl-hero-card"
                    style={hero.image ? { backgroundImage: `url(${hero.image})`, backgroundSize: 'cover' } : undefined}
                >
                    <div className="fl-hero-body">
                        <span className="fl-pill">
                            <Icon name="bolt" size={14} /> {hero.badge}
                        </span>
                        <h1>{hero.title}</h1>
                        <p>{hero.subtitle}</p>
                        <form
                            className="fl-hero-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                window.location.href = `/restaurants?q=${encodeURIComponent(place)}`;
                            }}
                        >
                            <label className="fl-field">
                                <Icon name="pin" size={18} />
                                <input
                                    value={place}
                                    onChange={(e) => setPlace(e.target.value)}
                                    placeholder={hero.locationPlaceholder}
                                />
                                <button type="button" className="fl-icon-btn" onClick={locate} aria-label="Use my location">
                                    <Icon name="gps" size={18} />
                                </button>
                            </label>
                            <button type="submit" className="fl-btn fl-btn-primary">Search</button>
                        </form>
                    </div>
                </div>

                <div className="fl-stats">
                    {stats.map((s) => (
                        <div className="fl-stat" key={s.label}>
                            <div className="fl-stat-icon"><Icon name={s.icon} size={24} /></div>
                            <div>
                                <strong>{s.value}</strong>
                                <div>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
