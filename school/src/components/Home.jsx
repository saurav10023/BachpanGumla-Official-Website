import Advantages from "./Home_components/Advantages"
import BirthdayBar from "./Home_components/BirthdayBar"
import BirthdaysSection from "./Home_components/BirthdaySection"
import Hero from "./Home_components/Hero"
import VisionMission from "./Home_components/Mission_vision"
import VisitGallery from "./Home_components/Visit_gallery"


const Home = () => {
  return (
    <>
      <Hero />
      <VisionMission />
      <Advantages />
      <BirthdaysSection/>
      <VisitGallery />
    </>
  )
}

export default Home
