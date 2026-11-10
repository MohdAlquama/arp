import React from 'react';
import {
    ShoppingCart,
    User,
    Users,
    Store,
    Bike,
    MapPin,
    LocateFixed,
    Search,
    ChevronDown,
    ArrowRight,
    ArrowLeft,
    Send,
    CircleHelp,
    Phone,
    Mail,
    Zap,
    Menu,
    Play,
    Apple,
} from 'lucide-react';

const map = {
    cart: ShoppingCart,
    user: User,
    users: Users,
    store: Store,
    bike: Bike,
    pin: MapPin,
    gps: LocateFixed,
    search: Search,
    chevron: ChevronDown,
    arrowR: ArrowRight,
    arrowL: ArrowLeft,
    send: Send,
    help: CircleHelp,
    phone: Phone,
    mail: Mail,
    bolt: Zap,
    menu: Menu,
    play: Play,
    apple: Apple,
};

export default function Icon({ name, size = 20, ...rest }) {
    const Cmp = map[name] || CircleHelp;
    return <Cmp size={size} aria-hidden="true" {...rest} />;
}
