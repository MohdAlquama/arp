import React, { useState } from 'react';
import Icon from './Icons';
import { SectionHead } from './Sections';

// size/position per distance from the active card
const LOOK = {
    0: { w: 200, h: 220, x: 0, o: 1, z: 5 },
    1: { w: 150, h: 170, x: 190, o: 0.9, z: 4 },
    2: { w: 110, h: 130, x: 320, o: 0.7, z: 3 },
};

export default function Testimonials({ data }) {
    const list = data.testimonials;
    const n = list.length;
    const [active, setActive] = useState(Math.floor(n / 2));

    const go = (d) => setActive((a) => (a + d + n) % n);

    return (
        <section className="fl-section">
            <div className="fl-container">
                <SectionHead title={data.testimonialsTitle} />
                <div className="fl-testi">
                    <div className="fl-testi-stage">
                        {list.map((t, i) => {
                            let off = i - active;
                            if (off > n / 2) off -= n;
                            if (off < -n / 2) off += n;
                            const abs = Math.abs(off);
                            if (abs > 2) return null;
                            const l = LOOK[abs];
                            return (
                                <div
                                    key={t.name}
                                    className="fl-testi-card"
                                    data-offset={off}
                                    onClick={() => setActive(i)}
                                    style={{
                                        width: l.w,
                                        height: l.h,
                                        opacity: l.o,
                                        zIndex: l.z,
                                        transform: `translateX(${Math.sign(off) * l.x}px)`,
                                    }}
                                >
                                    {t.image ? <img src={t.image} alt={t.name} /> : t.name[0]}
                                </div>
                            );
                        })}
                    </div>
                    <div className="fl-testi-quote">
                        <h4>{list[active].name}</h4>
                        <p>{list[active].review}</p>
                    </div>
                    <div className="fl-testi-nav">
                        <button type="button" className="fl-circle-btn" onClick={() => go(-1)} aria-label="Previous">
                            <Icon name="arrowL" size={18} />
                        </button>
                        <button type="button" className="fl-circle-btn" onClick={() => go(1)} aria-label="Next">
                            <Icon name="arrowR" size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
