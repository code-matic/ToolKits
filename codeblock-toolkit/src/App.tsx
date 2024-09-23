import SamplePage from "./pages/SamplePage";
import backendPage from "./pages/backendPage";
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
    name: "Frontend Configuration",
    component: SamplePage
}, {
  name: "Backend Configuration",
  component: backendPage
}]
  return (
   <section>

<div className="border border-gray-500 w-[1200px] mx-auto mt-5 h-[100%] rounded-lg">
        <div className="p-5">
          <h2 className="text-lg font-bold mb-3">Keywords and Sample Values</h2>
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border-b">Key</th>
                <th className="px-4 py-2 text-left border-b">Sample Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">APPLICATION_NAME</td>
                <td className="px-4 py-2 border-b">frontend</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">APP_PROJECT_NAME</td>
                <td className="px-4 py-2 border-b">parentyn</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">PROJECT_ID</td>
                <td className="px-4 py-2 border-b">codematic-shared-environment</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">ENV_BUCKET_URL</td>
                <td className="px-4 py-2 border-b">envs_store_dev/parentyn/backend</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">ENVIRONMENT</td>
                <td className="px-4 py-2 border-b">sandbox</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">REGION</td>
                <td className="px-4 py-2 border-b">europe-west1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


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
