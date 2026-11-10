import WebsiteFooter from "@/Pages/Website/Footer/WebsiteFooter";
import ResponsiveHeader from "@/Pages/Website/Header/ResponsiveHeader";

export default function WebsiteLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">

            <div className="sticky top-0 z-[100] w-full">
                <ResponsiveHeader />
            </div>

            {children}
            <WebsiteFooter/>
        </div>
    );
}