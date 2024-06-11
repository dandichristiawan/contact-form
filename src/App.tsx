import { z } from "zod";
import { ChangeEvent, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



function App() {
  const notify = () => toast(`Thanks for completing the form. We'll be in touch soon!`
    , {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    })

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [queryType, setQueryType] = useState<string | null>(null);
  const [message, setMessage] = useState("")
  const [consent, setConsent] = useState(false)

  const [isValid, setIsValid] = useState({
    firstName: true,
    lastName: true,
    email: true,
    queryType: true,
    message: true,
    consent: true,
  })

  const handleCheckboxChange = (value: string) => {
    if (queryType === value) {
      setQueryType(null);
    } else {
      setQueryType(value);
    }
  }

  const schema = z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    email: z.string().email(),
    queryType: z.string().min(2).max(20),
    message: z.string().min(2).max(20),
    consent: z.literal<boolean>(true)
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    try {
      const formData = {
        firstName,
        lastName,
        email,
        queryType,
        message,
        consent
      }
      schema.parse(formData);
      setIsValid({
        firstName: true,
        lastName: true,
        email: true,
        queryType: true,
        message: true,
        consent: true,
      })
      setEmail("")
      setFirstName("")
      setLastName("")
      setQueryType(null)
      setMessage("")
      setConsent(false)
      notify()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce(
          (acc: any, curr: any) => ({
            ...acc,
            [curr.path[0]]: false,
          }),
          {}
        );
        setIsValid({
          ...isValid,
          ...fieldErrors,
        });
        console.error("Validation failed: ", error.errors)
      }
    }
  }

  return (
    <>
      <div className="bg-[#e0f1e7] min-h-dvh items-center flex justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md md:w-1/2 m-14">
          <h1 className="text-2xl font-bold p-2">Contact Us</h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row w-full">
              <div className="p-2 gap-2 md: w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">First Name <span className="text-[#76a498]">*</span></label>
                <input value={firstName} onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} type="text" className={`bg-white border border-[#979E9E] text-gray-900 text-sm rounded-lg block w-full md:w-full p-2.5 focus:outline-[#76a498] ${!isValid.firstName && "border-red-600"}`} />
                {!isValid.firstName && (
                  <span className="text-xs text-red-600">This field is required</span>
                )}
              </div>
              <div className="p-2 gap-2 md: w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">Last Name <span className="text-[#76a498]">*</span></label>
                <input value={lastName} onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} type="text" className={`bg-white border border-[#979E9E] text-gray-900 text-sm rounded-lg block w-full md:w-full p-2.5 focus:outline-[#76a498] ${!isValid.lastName && "border-red-600"}`} />
                {!isValid.lastName && (
                  <span className="text-xs text-red-600">This field is required</span>
                )}
              </div>

            </div>

            <div className="p-2 gap-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Email Address <span className="text-[#76a498]">*</span></label>
              <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="text" className={`bg-white border border-[#979E9E] text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-[#76a498] ${!isValid.email && "border-red-600"}`} />
              {!isValid.email && (
                <span className="text-xs text-red-600">Please enter a valid email address</span>
              )}
            </div>

            <div className="flex flex-col p-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Query Type <span className="text-[#76a498]">*</span></label>
              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className={`flex flex-row items-center gap-2 border border-[#979E9E] p-2 my-2 rounded-md ${queryType === 'General Enquiry' && "bg-[#e0f1e7] border-2 border-[#76a498]"} md:w-1/2`}>
                  <input checked={queryType === 'General Enquiry'} onChange={() => handleCheckboxChange("General Enquiry")} type="checkbox" className="" />
                  <label htmlFor="" className="mx-2">General Enquiry</label>
                </div>
                <div className={`flex flex-row gap-2 border border-[#979E9E] p-2 my-2 rounded-md ${queryType === 'Support Request' && "bg-[#e0f1e7] border-2 border-[#76a498]"} md:w-1/2`}>
                  <input checked={queryType === "Support Request"} onChange={() => handleCheckboxChange("Support Request")} type="checkbox" />
                  <label htmlFor="" className="mx-2">Support Request</label>
                </div>
              </div>
              {!isValid.queryType && (
                <span className="text-xs text-red-600">Please select a query type</span>
              )}
            </div>

            <div className="flex flex-col p-2 gap-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Message <span className="text-[#76a498]">*</span></label>
              <textarea value={message} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} rows={10} className={`border border-[#979E9E] rounded-md focus:outline-[#76a498] p-2 ${!isValid.message && "border-red-600"}`} />
              {!isValid.message && (
                <span className="text-xs text-red-600">This field is required</span>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <div className="flex flex-row p-2">
                <input checked={consent} onChange={(e: ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked)} type="checkbox" name="" id="" />
                <label className="mx-4 text-sm">I consent to being contacted by the team <span className="text-[#76a498]">*</span></label>
              </div>
              {!consent && (
                <span className="text-[10px] text-red-600 px-2">To submit this form, please consent to being contacted</span>
              )}
            </div>

            <div className="flex w-full px-2">
              <button type="submit" className="bg-[#0C7D69] w-full p-4 rounded-md text-white">
                Submit
              </button>
            </div>

          </form>
        </div>

      </div>
    </>
  )
}

export default App
