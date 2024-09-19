import VpcConfiguration from "./codeBlocks";
import { useState } from "react";
// import CopyWithIndentationFromDiv from "./copySample";

function App() {

  const [tabIndex, setTabIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parentValues, setParentValues] = useState<any>({
    subnetName: "",
    range: "",
    networkName: "",
    region: "",
  });

    const handleValuesUpdate = (updatedValues: typeof parentValues) => {
      setParentValues(updatedValues);
    };

  const handleDropdown = (index: number) => {
    const activeIndex = tabIndex === index ? -1 : index
    setTabIndex(activeIndex)
}

const tabs = ["gloud", "Terraform"]
  return (
   <section>

    {/* FIRST */}
    <div  className="border border-gray-500 w-[800px] mx-auto mt-5 h-[100%] rounded-lg">
      <div className="flex border-b border-gray-500">

        {
          tabs.map((item, index)=> (
            <button className={`${tabIndex === index ? "text-blue-500 border-blue-500 border-b-2" : ""} p-2 px-4 text-gray-500 font-medium hover:border-b-2 hover:border-gray-500`} 
            onClick={()=> handleDropdown(index)} >{item}</button>
          ))
        }
        
      </div>
      <div className="p-7">
        {
            tabIndex === 0 && <VpcConfiguration onValuesUpdate={handleValuesUpdate} />
        }
        {
            tabIndex === 1 && <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, delectus. Fuga hic animi quis totam ipsum delectus aperiam, beatae odio.</div>
        }
      </div>
    </div>

        {/* OTHER CODE BLOCKS */}
    <div>
    <div>
        <p>Field 1 (Parent): {parentValues.subnetName}</p>
      </div>
    </div>

    {/* <CopyWithIndentationFromDiv/> */}
   </section>
  )
}

export default App
