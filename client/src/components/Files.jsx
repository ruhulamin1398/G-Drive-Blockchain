import { useState } from "react"




export default function Files({ contract, account, shared, title }) {


  const [allfiles, setAllFiles] = useState([])
  console.log('files:contract', contract)
  console.log('files:account', account)


  const GetAllFiles = async () => {
 
    const Otheraddress = document.querySelector(".address").value;
    try {

      if (shared) {
        if(!Otheraddress){
          alert('Enter The Address')
        } else{
          
        const files = await contract.display(Otheraddress)
        console.log('files', files)
        setAllFiles(files)

        }
      } else {
        const files = await contract.display(account)

        setAllFiles(files)
      }
    } catch (e) {
      alert("You don't have access");
    }





  }

 
  const files = []
  return (
    <>


    <div className="text-3xl font-bold  shadow-sm text-slate-50   border-bottom-1"> {title} </div>
 
      <div className="grid grid-cols-2   w-2/3    left mb-10"> 
      
      { shared ?  <input
        type="text"
        placeholder="Enter Others Address "
        className="address w-full left   "
      />  : ""
      }
      <button className=" button  p-2 w-48 " onClick={GetAllFiles}>
        Load Files
      </button>
      </div>



      <ul role="list" className="divide-y divide-gray-100  grid grid-cols-1 md:grid-cols-3  gap-5  ">
        {allfiles.map((file) => (
          <li key={file} className="flex justify-between gap-x-1  py-2 px-4 bg-gray-100 rounded-2xl">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-24 w-24 flex-none rounded-full bg-gray-50" src={file} alt=" Image" />
              <div className="min-w-0 flex-auto">
                <a href={file} target="_blank" rel="noopener noreferrer">
                  <p className="text-sm font-semibold leading-6 text-gray-900 whitespace-normal break-words "> {file.substring(36)}</p>
                </a>



              </div>
            </div>

          </li>
        ))}
      </ul>
    </>
  )
}


 