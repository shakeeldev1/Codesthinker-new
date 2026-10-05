import { Helmet } from 'react-helmet-async'
import Hero from '../components/home/Hero'
import BusinessFeatures from '../components/home/BusinessFeatures'
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
      <Helmet>
        <title>Code's Thinker</title>
        <meta name="description" content="Code's Thinker delivers innovative software development and digital business solutions." />
        <link rel="canonical" href="https://codesthinker.com/" />
        <meta property="og:site_name" content="Code's Thinker" />
        <meta property="og:title" content="Code's Thinker" />
        <meta property="og:description" content="Code's Thinker delivers innovative software development and digital business solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codesthinker.com/" />
        <meta property="og:image" content="https://codesthinker.com/logo-blue.webp" />
      </Helmet>
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
