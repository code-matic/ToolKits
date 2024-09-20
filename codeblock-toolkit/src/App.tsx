import SamplePage from "./pages/SamplePage";
import { useState } from "react";
// import CopyWithIndentationFromDiv from "./copySample";

function App() {

  const [tabIndex, setTabIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const handleDropdown = (index: number) => {
    const activeIndex = tabIndex === index ? -1 : index
    setTabIndex(activeIndex)
}

const tabs = [{
    name: "VPC Configuration",
    component: SamplePage
}, {
  name: "Subnet",
  component: null
}]
  return (
   <section>
    <div  className="border border-gray-500 w-[1200px] mx-auto mt-5 h-[100%] rounded-lg">
      <div className="flex border-b border-gray-500">
        {
          tabs.map((item, index)=> (
            <button key={index} className={`${tabIndex === index ? "text-blue-500 border-blue-500 border-b-2" : ""} p-2 px-4 text-gray-500 font-medium hover:border-b-2 hover:border-gray-500`} 
            onClick={()=> handleDropdown(index)} >{item.name}</button>
          ))
        }
        
      </div>
      <div className="p-7">
        {
          tabs.map((tab, index) => (
            tabIndex === index && <div key={index}>
              {tab.component ? <tab.component /> : <div>{tab.name} Content goes here. No content specified</div>}
              </div>
          ))
        }

      </div>
    </div>

    <div>
    <div>
      </div>
    </div>


   </section>
  )
}

export default App
