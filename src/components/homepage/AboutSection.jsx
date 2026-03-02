import { personalData } from "@/utils/data/personal-data"
import ProfileCard from "@/components/ProfileCard"
import DecryptedText from "../DecryptedText"

function AboutSection() {
  return (
    <div id="about" className="mt-24 lg:mt-32 my-12 lg:my-16 relative overflow-visible">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          <DecryptedText text="ABOUT ME" animateOn="view" revealDirection="center" />
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#00F0FF] text-xl uppercase">
            <DecryptedText text="Who I am?" animateOn="view" revealDirection="start" />
          </p>
          <div className="text-gray-200 text-sm lg:text-lg">
            <DecryptedText text={personalData.description} animateOn="view" revealDirection="start" maxIterations={20} />
          </div>
        </div>
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <ProfileCard
            avatarUrl="/profile.png"
            iconUrl="/assets/demo/iconpattern.png"
            grainUrl="/assets/demo/grain.webp"
            name={personalData.name}
            title={personalData.designation}
            showUserInfo={false}
          />
        </div>
      </div>
    </div>
  )
}

export default AboutSection
