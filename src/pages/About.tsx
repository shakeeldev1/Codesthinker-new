import AboutHead from '../components/about/AboutHead'
import AboutImpact from '../components/about/AboutImpact'
import OurStory from '../components/about/OurStory'
import WhyChooseUs from '../components/about/WhyChooseUs'
import OurMissions from '../components/about/OurMissions'
import Testimonial from '../components/about/Testemonial'

function About() {
  return (
    <div className='overflow-x-hidden'>
      <AboutHead />
      <AboutImpact />
      <OurStory />
      <WhyChooseUs />
      <OurMissions />
      <Testimonial />
   
    </div>
  )
}

export default About
