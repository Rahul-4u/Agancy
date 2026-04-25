import ServicesSection from '@/components/home/ServicesSection'
import ServiceHero from '@/components/services/ServiceHero'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar/>
      <ServiceHero/>
      <ServicesSection/>
    </div>
  )
}
