import React from 'react'
import Hero from '../components/home/Hero'
import ClientsMarquee from '../components/home/ClientsMarquee'
import AboutUs from '../components/home/AboutUs'
import Services from '../components/home/Services'
import WorkProcess from '../components/home/WorkProcess'
import TeamSection from '../components/home/Team'

function Home() {
  return (
    <div>
      <Hero/>
      <ClientsMarquee/>
      <AboutUs/>
      <Services/>
      <WorkProcess/>
      <TeamSection/>
    </div>
  )
}

export default Home
