import ContactHero from '@/components/contact/ContactHero'
import ImitationForm from '@/components/contact/ImitationForm'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar/>
      <ContactHero/>
      <ImitationForm/>
    </div>
  )
}
