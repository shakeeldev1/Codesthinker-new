import React from 'react'
import Hero from '../components/home/Hero'
import ClientsMarquee from '../components/home/ClientsMarquee'
import AboutUs from '../components/home/AboutUs'
import Services from '../components/home/Services'
import WorkProcess from '../components/home/WorkProcess'
import Team from '../components/home/Team'
import WhyChoose from '../components/home/WhyChoose'

function Home() {
  return (
    <div>
      <Hero/>
      <ClientsMarquee/>
      <AboutUs/>
      <Services/>
      <WhyChoose/>
      <WorkProcess/>
      <Team/>
    </div>
  )
}

export default Home
