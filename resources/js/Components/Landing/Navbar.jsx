import React, { useState } from 'react';
import Icon from './Icons';

function Dropdown({ label, items }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="fl-dropdown"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                {label} <Icon name="chevron" size={16} />
            </button>
            {open && (
                <div className="fl-dropdown-menu">
                    {items.map((it) => (
                        <a key={it} href="#">{it}</a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Navbar({ data }) {
    const [lang, setLang] = useState(data.languages?.[0] ?? 'en');
    const [menu, setMenu] = useState(false);

    return (
        <header className="fl-nav">
            <div className="fl-container fl-nav-inner">
                <a href="/" className="fl-logo">
                    {data.brand.logo ? <img src={data.brand.logo} alt={data.brand.name} /> : data.brand.name}
                </a>

                <nav className="fl-nav-links" style={menu ? { display: 'flex' } : undefined}>
                    <a className="fl-login" href="/">Home</a>
                    <Dropdown label="Cuisines" items={data.cuisinesMenu} />
                    <Dropdown label="Restaurants" items={data.restaurantsMenu} />
                </nav>

                <label className="fl-field fl-nav-search">
                    <Icon name="search" size={18} />
                    <input type="search" placeholder="Search for food or restaurant" />
                </label>

                <div className="fl-nav-right">
                    <select
                        className="fl-lang"
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        aria-label="Language"
                    >
                        {data.languages.map((l) => (
                            <option key={l} value={l}>{l.toUpperCase()}</option>
                        ))}
                    </select>
                    <button type="button" className="fl-icon-btn" aria-label="Cart">
                        <Icon name="cart" />
                        <span className="fl-badge">0</span>
                    </button>
                    <a href="/login" className="fl-login">
                        <Icon name="user" size={18} /> Login
                    </a>
                    <button
                        type="button"
                        className="fl-icon-btn fl-burger"
                        aria-label="Menu"
                        onClick={() => setMenu((m) => !m)}
                    >
                        <Icon name="menu" />
                    </button>
                </div>
            </div>
        </header>
    );
}
