import ContactHero from '@/components/contact/ContactHero'
import FaqSection from '@/components/contact/FaqSection'
import ImitationForm from '@/components/contact/ImitationForm'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar/>
      <ContactHero/>
      <ImitationForm/>
      <FaqSection/>
    </div>
  )
}
