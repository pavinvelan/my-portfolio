import { personalData } from '@/utils/data/personal-data'
import { BiLogoLinkedin } from "react-icons/bi"
import { CiLocationOn } from "react-icons/ci"
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { IoLogoGithub, IoMdCall } from "react-icons/io"
import { MdAlternateEmail } from "react-icons/md"
import ContactForm from './ContactForm'
import DecryptedText from '../DecryptedText'

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          <DecryptedText text="CONTACT" animateOn="view" revealDirection="center" />
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />
        <div className="lg:w-3/4">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3">
              <a href={`mailto:${personalData.email}`}>
                <MdAlternateEmail
                  className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#00F0FF] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                  size={36}
                />
              </a>
              <a href={`mailto:${personalData.email}`} className="hover:text-[#00F0FF] transition-colors">
                <DecryptedText text={personalData.email} animateOn="view" revealDirection="start" />
              </a>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <IoMdCall
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#00F0FF] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span>
                <DecryptedText text={personalData.phone} animateOn="view" revealDirection="start" />
              </span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <CiLocationOn
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#00F0FF] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span>
                <DecryptedText text={personalData.address} animateOn="view" revealDirection="start" />
              </span>
            </p>
          </div>
          <div className="mt-8 lg:mt-16 flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-5 lg:gap-10">
            <a target="_blank" rel="noopener noreferrer" href={personalData.github}>
              <IoLogoGithub
                className="bg-[#8b98a5] p-2 sm:p-3 rounded-full hover:bg-[#00F0FF] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={40}
              />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={personalData.linkedIn}>
              <BiLogoLinkedin
                className="bg-[#8b98a5] p-2 sm:p-3 rounded-full hover:bg-[#00F0FF] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={40}
              />
            </a>
            {personalData.instagram && (
              <a target="_blank" rel="noopener noreferrer" href={personalData.instagram}>
                <FaInstagram
                  className="bg-[#8b98a5] p-2 sm:p-3 rounded-full hover:bg-[#00F0FF] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                  size={40}
                />
              </a>
            )}
            <a target="_blank" rel="noopener noreferrer" href={personalData.facebook}>
              <FaFacebook
                className="bg-[#8b98a5] p-2 sm:p-3 rounded-full hover:bg-[#00F0FF] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={40}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
