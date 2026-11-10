import { useState } from "react";
import Header from "@/Components/AdministrationPanelLayout/Header";
import Sidebar from "@/Components/AdministrationPanelLayout/Sidebar";
import TestEnvShutter from "@/Components/AdministrationPanelLayout/TestEnvShutter";
import InfoPanel from "@/Components/AdministrationPanelLayout/Info/InfoPanel";
import {
    InfoProvider,
    useInfo,
} from "@/Components/AdministrationPanelLayout/Info/InfoContext";
import SideDrawer, {
    getValidDrawers,
} from "../Drawer/SideDrawer";

function Shell({
    children,
    active,
    onNavigate,
    title,
    mainClassName,
    drawers,
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [drawerKey, setDrawerKey] = useState(null);

    const { open: infoOpen } = useInfo();

    const validDrawers = getValidDrawers(drawers);
    const hasDrawers = validDrawers.length > 0;

    const drawerOpen = validDrawers.some(
        (d) => d.key === drawerKey
    );

    const rightPad =
        drawerOpen || infoOpen
            ? "lg:pr-[420px]"
            : hasDrawers
                ? "lg:pr-16"
                : "";

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-slate-50 text-slate-800">
            {/* <TestEnvShutter /> */}

            <Header
                title={title}
                onMenu={() => setMenuOpen(true)}
            />

            <div className="relative flex min-h-0 flex-1">

                <Sidebar
                    active={active}
                    onNavigate={onNavigate}
                    mobileOpen={menuOpen}
                    onClose={() => setMenuOpen(false)}
                />

                <main
                    className={`
                        min-w-0
                        flex-1
                        overflow-y-auto
                        p-4
                        transition-[padding]
                        duration-300
                        sm:p-8
                        ${rightPad}
                        ${mainClassName}
                    `}
                >
                    {children}
                </main>

                <InfoPanel />

                <SideDrawer
                    items={drawers}
                    activeKey={drawerKey}
                    onChange={setDrawerKey}
                />

            </div>
        </div>
    );
}

export default function DashboardLayout({
    children,
    active = "Overview",
    onNavigate,
    title,
    info = {},
    drawers = [],
    mainClassName = "",
}) {
    return (
        <InfoProvider content={info}>
            <Shell
                active={active}
                onNavigate={onNavigate}
                title={title}
                mainClassName={mainClassName}
                drawers={drawers}
            >
                {children}
            </Shell>
        </InfoProvider>
    );
}