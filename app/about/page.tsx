import AboutFeature from '@/components/about/AboutFeature'
import AboutHero from '@/components/about/AboutHero'
import TeamSection from '@/components/about/TeamSection'
import WhyChooseUs from '@/components/about/WhyChooseUs'
import StatisticsSection from '@/components/home/StatisticsSection'
import WorkingProcess from '@/components/home/WorkingProcess'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar/>
      <AboutHero/>
      <AboutFeature/>
      <WhyChooseUs/>
      <StatisticsSection/>
      <WorkingProcess/>
      <TeamSection/>
    </div>
  )
}
