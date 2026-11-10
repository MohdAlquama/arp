import React, { useState } from 'react';
import Icon from './Icons';
import { SectionHead } from './Sections';

export default function Faq({ data }) {
    const tabs = Object.keys(data.faq);
    const [tab, setTab] = useState(tabs[0]);
    const [open, setOpen] = useState(0);

    return (
        <section className="fl-section">
            <div className="fl-container">
                <SectionHead title={data.faqTitle} sub={data.faqSub} />
                <div className="fl-tabs" role="tablist">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            type="button"
                            role="tab"
                            className="fl-tab"
                            aria-selected={tab === t}
                            onClick={() => { setTab(t); setOpen(0); }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <div className="fl-acc">
                    {data.faq[tab].map((f, i) => (
                        <div className="fl-acc-item" key={f.q} data-open={open === i}>
                            <button
                                type="button"
                                className="fl-acc-q"
                                aria-expanded={open === i}
                                onClick={() => setOpen(open === i ? -1 : i)}
                            >
                                {f.q}
                                <Icon name="chevron" size={18} />
                            </button>
                            {open === i && <div className="fl-acc-a">{f.a}</div>}
                        </div>
                    ))}
                </div>
                <div className="fl-still">
                    <div>
                        <strong>Still have questions?</strong>
                        <span>Our support team is happy to help.</span>
                    </div>
                    <a href="#" className="fl-btn fl-btn-primary">Contact us</a>
                </div>
            </div>
        </section>
    );
}
