import React from "react";
import { Head } from "@inertiajs/react";
import WebsiteLayout from "@/Layouts/webiste/WebsiteLayout";
import AboutHeroSection from "./Partials/AboutHeroSection";
import OurBrandStory from "./Partials/OurBrandStory";
import MissionVision from "./Partials/MissionVision";
import WhyChooseARP from "./Partials/WhyChooseARP";
import BrandPhilosophy from "./Partials/BrandPhilosophy";
import QualityCraftsmanship from "./Partials/QualityCraftsmanship";
import OurJourney from "./Partials/OurJourney";
import FAQSection from "./Partials/FAQSection";
import DirectorMessage from "./Partials/DirectorMessage";

export default function Index() {
    return (
        <>
            <Head title="About Us | ARP Footwear" />

            <AboutHeroSection />
            <OurBrandStory />
            <MissionVision />
            <WhyChooseARP />
            <BrandPhilosophy />
            <QualityCraftsmanship />
            <DirectorMessage/>
            <OurJourney />
            {/* <FAQSection /> */}
        </>
    );
}

Index.layout = (page) => <WebsiteLayout children={page} />;