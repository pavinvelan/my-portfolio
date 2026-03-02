import { educations } from "@/utils/data/educations"
import { BsPersonWorkspace } from "react-icons/bs"
import lottieFile from '@/assets/lottie/study.json'
import AnimationLottie from "../helper/AnimationLottie"
import GlowCard from "../helper/GlowCard"
import DecryptedText from "../DecryptedText"

function Education() {
  return (
    <div id="education" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            <DecryptedText text="Educations" animateOn="view" revealDirection="center" />
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {educations.map(education => (
                <GlowCard key={education.id} identifier={`education-${education.id}`}>
                  <div className="p-3 relative text-white">
                    <img
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <div className="text-xs sm:text-sm text-[#00F0FF]">
                        <DecryptedText text={education.duration} animateOn="view" revealDirection="center" />
                      </div>
                    </div>
                    <div className="flex items-center gap-x-8 px-3 py-5">
                      <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                        <BsPersonWorkspace size={36} />
                      </div>
                      <div>
                        <div className="text-base sm:text-xl mb-2 font-medium uppercase">
                          <DecryptedText text={education.title} animateOn="view" revealDirection="start" />
                        </div>
                        <div className="text-sm sm:text-base">
                          <DecryptedText text={education.institution} animateOn="view" revealDirection="start" />
                        </div>
                      </div>
                    </div>
                    {education.description && (
                      <div className="text-sm text-gray-400 px-3 pb-3 leading-relaxed">
                        <DecryptedText text={education.description} animateOn="view" revealDirection="start" maxIterations={15} />
                      </div>
                    )}
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education
