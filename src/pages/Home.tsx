import Hero from '../components/home/Hero'
import ClientsMarquee from '../components/home/ClientsMarquee'
import AboutUs from '../components/home/AboutUs'
import Services from '../components/home/Services'
// import WorkProcess from '../components/home/WorkProcess'
import WhyChoose from '../components/home/WhyChoose'
import FAQ from '../components/home/FAQ'
import ProcessSection from '../components/home/ProcessSection'

function Home() {
  return (
    <div>
      <Hero/>
      <AboutUs/>
      <Services/>
      <WhyChoose/>
      {/* <WorkProcess/> */}
      <ProcessSection/>
      <ClientsMarquee/>
      <FAQ/>
    </div>
  )
}

export default Home
