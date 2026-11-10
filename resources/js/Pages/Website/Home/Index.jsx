
import WebsiteLayout from '@/Layouts/webiste/WebsiteLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import SEO from './Partials/SEO'
import BrandBenefits from './Partials/BrandBenefits'
import ShopByCategory from './Partials/ShopByCategory'
import ShopByOccasion from './Partials/ShopByOccasion'
import HeroSection from './Partials/HeroSection'
import NewArrivals from '../NewArrivals'

export default function Index() {
    return (
        <>
            <SEO/>
     <HeroSection />

            <section
                id="home-collections"
                className="min-h-screen bg-white py-20"
            >
               <BrandBenefits />
            <ShopByCategory />
            <NewArrivals />
            {/* <ShopByOccasion/> */}
            
            </section>
        </>
    )
}

Index.layout = page => <WebsiteLayout children={page} />
