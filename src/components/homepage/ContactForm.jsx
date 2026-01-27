import { useState } from "react"
import { TbMailForward } from "react-icons/tb"
import { toast } from "react-toastify"
import { personalData } from "@/utils/data/personal-data"
import { isValidEmail } from "@/utils/check-email"

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false })
  const [isLoading, setIsLoading] = useState(false)
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  })

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false })
    }
  }

  const handleSendMail = async (e) => {
    e.preventDefault()

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true })
      return
    } else if (error.email) {
      return
    } else {
      setError({ ...error, required: false })
    }

    setIsLoading(true);

    try {
      // Use Web3Forms API directly
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "ba89d281-292d-41c8-a9f3-a6a2818801fa",
          name: userInput.name,
          email: userInput.email,
          message: userInput.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Message sent successfully via Web3Forms!");
        setUserInput({ name: "", email: "", message: "" });
      } else {
        // Fallback to local API if Web3Forms fails or if they prefer it
        const localResponse = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        });
        const localData = await localResponse.json();
        
        if (localResponse.ok && localData.success) {
          toast.success("Message sent successfully!");
          setUserInput({ name: "", email: "", message: "" });
        } else {
          toast.error(data?.message || "Failed to send message.");
        }
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">Contact with me</p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired()
                setError({ ...error, email: !isValidEmail(userInput.email) })
              }}
            />
            {error.email && (
              <p className="text-sm text-red-400">Please provide a valid email!</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message: </label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            {error.required && (
              <p className="text-sm text-red-400">
                All fields are required!
              </p>
            )}
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
