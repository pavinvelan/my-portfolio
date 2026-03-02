import React from 'react'
import DecryptedText from '../DecryptedText'

function ProjectCard({ project }) {
  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#A855F7] to-[#00F0FF]"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-[#00F0FF] to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5">
        <div className="flex flex-row items-center">
          <div className="flex flex-row space-x-1 lg:space-x-2 shrink-0 mr-3">
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
          </div>
          <div className="text-center flex-1 text-[#00F0FF] text-sm md:text-base lg:text-xl">
            <DecryptedText text={project.name} animateOn="view" revealDirection="center" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-[#A855F7]">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-[#A855F7]">=</span>
            <span className="text-gray-400">{'{'}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">
              <DecryptedText text={project.name} animateOn="view" revealDirection="start" />
            </span>
            <span className="text-gray-400">{`',`}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-white">tools:</span>
            <span className="text-gray-400">{` ['`}</span>
            {project.tools.map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300">{tag}</span>
                {project.tools?.length - 1 !== i && (
                  <span className="text-gray-400">{`', '`}</span>
                )}
              </React.Fragment>
            ))}
            <span className="text-gray-400">{"],"}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2 flex">
            <span className="text-white shrink-0">Description:</span>
            <span className="text-cyan-400 ml-2">
              <DecryptedText text={project.description} animateOn="view" revealDirection="start" maxIterations={15} />
            </span>
            <span className="text-gray-400">,</span>
          </div>
          <div><span className="text-gray-400">{`};`}</span></div>
        </code>
      </div>
    </div>
  )
}

export default ProjectCard
