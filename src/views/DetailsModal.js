import FModal from "../components/FModal";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import FButton from "../components/FButton";
import FProductTag from "../components/FProductTag";
import {Data} from "./Data";
import {useEffect, useState} from "react";
import InstanceViewer from "./InstanceViewer";
import { axiosInstance } from "../api/requister";
import ESpinner from "../components/ESpinner";


const products = ["Financial Collection Services",
"Cash In",
"Education",
"Recharging",
"Subscription & Ads",
"Super Fawry",
"Telecom",
"Top-Up",
"Transportation",
"Acquiring",
"B2B",
"Cash Out",
"Charity",
"E-Commerce",
"Entertainment & Tourism",
"Government",
"Issuing (VCN)",
"Others",
"Send Money",
"Social Housing",
"Utilities",
"Vouchers"]


 

const DetailsModal = ({isOpen, setIsOpen, merchantData}) => {
    const [projection,selectedProjection] = useState("general")
    const [graphDataPlot, setGraphDataPlot] = useState([])
    const [loading,setLoading] = useState(false)

    const handleGraph=(graphResponse)=>{
        let graphData = []
        const keys = Object.keys(graphResponse)
        for (let  i =0; i<keys.length ; i++){
            graphData=[...graphData,...[{
                name:keys[i],
                uv:graphResponse[keys[i]]
        }]]
           
        }
        setGraphDataPlot(graphData)
        console.log({graphData})


    }
    useEffect(()=>{ 
        setLoading(true)
        if(merchantData){
            axiosInstance.post(`Merchant/ServiceTransactions`,{
                "serviceName": projection,
                "merchantCode": merchantData.code,
                "filter": "day"
              }
            )
            .then(response=>{
              
                handleGraph(response.data.transactions)
                setLoading(false)
            }).catch(error=>{
                setLoading(false)
            })
        }
    },[merchantData, projection])

    return (<>
        <FModal isAutoWidth title={merchantData.name} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="flex flex-col">
                <div className="grid gap-3 my-3 grid-cols-4 border border rounded bg-gray-50 primary-shadow p-3">
                    <InstanceViewer instance={"Merchant Code"} value={merchantData.code}/>
                    <InstanceViewer instance={"Class"} value={merchantData.clas}/>
                    <InstanceViewer instance={"Overdraft Limit"} value={merchantData.ovd_LIMIT}/>
                    <InstanceViewer instance={"AutoFund"} value={merchantData.autoFund}/>
                    <InstanceViewer instance={"Insurance Payment"} valueBlock={
                        merchantData.insurance ? <FProductTag productName={"مكتمل"} color="green"/> :
                            <FProductTag productName={"غير مفعل"}
                                         color="orange">
                                غير مكتمل</FProductTag>
                    }/>
                    <InstanceViewer instance={"License Delivery"} valueBlock={
                        merchantData.license ? <FProductTag productName={"مفعل"} color="green"/> :
                            <FProductTag productName={"غير مفعل"} color="orange">غير مكتمل</FProductTag>
                    }
                    />
                    <InstanceViewer instance={"Closing Balance "} value={merchantData.closingBalance}/>
                </div>
                <div>
                    <select value={projection}
                            onChange={(e)=> {
                                console.log(e.target.value)
                                selectedProjection(e.target.value)

                            }}

                            className={"my-4 w-full rounded border border-gray-300 p-1.5 text-sm  shadow-sm ring-orient-400 focus:border focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"}>
                        <option value={"general"} >General</option>
                        {
                            products.map((serviceCategory,index)=>
                                <option key={index} value={serviceCategory}>{serviceCategory}</option>
                            )
                        }
                      

                    </select>
                    {
                    loading ? <ESpinner isVisible={true}/> :<AreaChart width={900} height={250} data={graphDataPlot}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="80%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1}
                              fill="url(#colorUv)"/>
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1}
                              fill="url(#colorPv)"/>
                        <Area type="monotone" dataKey="amt" stroke="#82ca9d" fillOpacity={1}
                              fill="url(#colorPv)"/>
                    </AreaChart> }
                    
                </div>
            </div>
            <div>
                <FButton
                    onClick={() => {
                        setIsOpen(false);
                    }
                    }
                    className="w-full mt-4"

                >
                    اغلاق
                </FButton>

            </div>
        </FModal>
    </>)
}
export default DetailsModal
