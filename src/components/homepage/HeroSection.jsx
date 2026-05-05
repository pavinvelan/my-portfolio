import { personalData } from "@/utils/data/personal-data"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { MdDownload } from "react-icons/md"
import { RiContactsFill } from "react-icons/ri"
import DecryptedText from "../DecryptedText"
import { ShimmerText } from "@/components/ui/ShimmerText"
import { CreepyButton } from "@/components/ui/creepy-button"

function HeroSection() {
  const scrollToContact = (e) => {
    e.preventDefault()
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            <DecryptedText text="Hello," speed={60} animateOn="view" sequential={true} revealDirection="start" className="text-white" />
            <br />
            <DecryptedText text="This is" speed={60} animateOn="view" sequential={true} revealDirection="start" className="text-white" />
          </h1>
          
          <div className="my-3 py-4 w-full flex justify-start">
            <ShimmerText 
              text={personalData.name} 
              shimmerColor="#00F0FF"
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
            />
          </div>

          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            <DecryptedText text={"I'm a Professional "} speed={50} animateOn="view" sequential={true} revealDirection="start" className="text-white" />
            <DecryptedText text={personalData.designation} speed={40} animateOn="view" sequential={true} revealDirection="center" className="text-zinc-300" />
          </h1>

          <div className="my-12 flex items-center gap-5">
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all text-zinc-400 hover:scale-125 duration-300"
            >
              <BsGithub size={30} />
            </a>
            <a
              href={personalData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all text-zinc-400 hover:scale-125 duration-300"
            >
              <BsLinkedin size={30} />
            </a>
            <a
              href={personalData.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all text-zinc-400 hover:scale-125 duration-300"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href={personalData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all text-zinc-400 hover:scale-125 duration-300"
            >
              <FaInstagram size={30} />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              onClick={scrollToContact}
              className="animate-neon-glow rounded-full transition-all duration-300 overflow-hidden"
            >
              <CreepyButton 
                className="bg-black rounded-full"
                coverClassName="px-3 text-xs md:px-8 py-3 md:py-4 bg-black rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-2 lg:pr-10"
              >
                <span className="whitespace-nowrap">Contact me</span>
                <RiContactsFill size={16} />
              </CreepyButton>
            </a>

            {personalData.resume && (
              <a 
                className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-zinc-600 to-zinc-400 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold" 
                target="_blank" 
                rel="noopener noreferrer"
                href={personalData.resume}
              >
                <span>Get Resume</span>
                <MdDownload size={16} />
              </a>
            )}
          </div>

        </div>
        <div className="order-1 lg:order-2 border-zinc-800/50 relative rounded-lg border bg-black/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-400 to-zinc-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-zinc-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[1px] border-zinc-800/50 px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-zinc-400">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-zinc-400">=</span>
                <span className="text-gray-400">{'{'}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">PAVINVELAN S K</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">skills:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">HTML</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">CSS</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">JavaScript</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">React</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">MySQL</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">MongoDB</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Python</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">C</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">C++</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Microsoft Office</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Git</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Figma</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Canva</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Docker</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">hardWorker:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">quickLearner:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">problemSolver:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
                <span className="text-orange-400">function</span>
                <span className="text-gray-400">{'() {'}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                <span className="text-gray-400">{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">hardWorker</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">problemSolver</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
              </div>
              <div><span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span></div>
              <div><span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span></div>
              <div><span className="text-gray-400">{`};`}</span></div>
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
