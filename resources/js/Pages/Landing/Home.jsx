import React from 'react'
import { ChevronRight, Star } from "lucide-react";
function Home() {
  return (
          <div className="relative h-[90vh] bg-gradient-to-r from-gray-900 to-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80')"
          }}
        />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                Elevate Your Stride
              </h1>
              <p className="text-2xl text-white/80 mb-10 max-w-xl">
                Innovative design meets unparalleled comfort. Experience footwear that transforms every step.
              </p>
              <div className="flex items-center space-x-6">
                <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-3 shadow-lg">
                  Explore Collection <ChevronRight size={24} strokeWidth={2.5} />
                </button>
                <div className="flex items-center text-white space-x-2">
                  <Star fill="gold" color="gold" size={24} />
                  <span className="text-lg font-medium">4.9 (3.2K Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Home
