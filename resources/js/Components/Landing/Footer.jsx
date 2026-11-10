import React, { useState } from 'react';
import Icon from './Icons';

export function Newsletter({ data }) {
    const [email, setEmail] = useState('');
    const [done, setDone] = useState(false);
    return (
        <section className="fl-section">
            <div className="fl-container">
                <div className="fl-news">
                    <div className="fl-news-top">
                        <div>
                            <h2>{data.newsletter.title}</h2>
                            <p>{data.newsletter.text}</p>
                        </div>
                        <form
                            className="fl-news-form"
                            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
                        >
                            <label className="fl-field">
                                <Icon name="mail" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                />
                            </label>
                            <button type="submit" className="fl-btn fl-btn-primary">
                                {done ? 'Subscribed' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                    <div className="fl-quick">
                        {data.quick.map((q) => (
                            <a href="#" className="fl-quick-item" key={q.title}>
                                <span className="ic"><Icon name={q.icon} size={20} /></span>
                                <div>
                                    <strong>{q.title}</strong>
                                    <div>{q.text}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Footer({ data }) {
    return (
        <footer className="fl-footer">
            <div className="fl-container">
                <div className="fl-app-strip">
                    <div>
                        <h3>{data.app.title}</h3>
                        <p>{data.app.text}</p>
                    </div>
                    <div className="fl-store-btns">
                        <a className="fl-store-btn" href={data.app.playStore}>
                            <Icon name="play" size={20} /> Google Play
                        </a>
                        <a className="fl-store-btn" href={data.app.appStore}>
                            <Icon name="apple" size={20} /> App Store
                        </a>
                    </div>
                </div>

                <div className="fl-footer-main">
                    <div>
                        <div className="fl-logo">{data.brand.name}</div>
                        <div className="fl-footer-contact">
                            <a href={`tel:${data.contact.phone}`}><Icon name="phone" size={16} /> {data.contact.phone}</a>
                            <a href={`mailto:${data.contact.email}`}><Icon name="mail" size={16} /> {data.contact.email}</a>
                            <span><Icon name="pin" size={16} /> {data.contact.address}</span>
                        </div>
                    </div>
                    <div className="fl-footer-cols">
                        {Object.entries(data.footerLinks).map(([h, links]) => (
                            <div key={h}>
                                <h4>{h}</h4>
                                {links.map((l) => (
                                    <a key={l} href="#">{l}</a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="fl-copy">
                    © {new Date().getFullYear()} {data.brand.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export function CookieBar({ text }) {
    const [show, setShow] = useState(true);
    if (!show) return null;
    return (
        <div className="fl-cookie" role="dialog" aria-label="Cookies">
            <span>{text}</span>
            <div className="fl-cookie-actions">
                <button type="button" className="fl-btn fl-btn-outline" onClick={() => setShow(false)}>Decline</button>
                <button type="button" className="fl-btn fl-btn-primary" onClick={() => setShow(false)}>Accept</button>
            </div>
        </div>
    );
}
