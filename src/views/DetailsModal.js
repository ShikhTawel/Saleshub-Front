import FModal from "../components/FModal";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import FButton from "../components/FButton";
import FProductTag from "../components/FProductTag";
import {Data} from "./Data";
import {useState} from "react";
import InstanceViewer from "./InstanceViewer";







const DetailsModal = ({isOpen, setIsOpen, merchantData}) => {
    const [projection,selectedProjection] = useState("total")
    return (<>
        <FModal isAutoWidth title={"مـــاركت الأمانة"} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="flex flex-col">
                <div className="grid gap-3 my-3 grid-cols-4 border border rounded bg-gray-50 primary-shadow p-3">
                    <InstanceViewer instance={"Merchant ID"} value={merchantData.id}/>
                    <InstanceViewer instance={"Class"} value={merchantData.class}/>
                    <InstanceViewer instance={"Overdraft Limit"} value={merchantData.overdraftLimit}/>
                    <InstanceViewer instance={"AutoFund"} value={merchantData.autoFund}/>
                    <InstanceViewer instance={"Insurance Payment"} valueBlock={
                        merchantData.insurancePayment ? <FProductTag productName={"مكتمل"} color="green"/> :
                            <FProductTag productName={"غير مفعل"}
                                         color="orange">
                                غير مكتمل</FProductTag>
                    }/>
                    <InstanceViewer instance={"License Delivery"} valueBlock={
                        merchantData.licenseDelivery ? <FProductTag productName={"مفغعل"} color="green"/> :
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
                        <option>أختر المنتج</option>
                        <option value={'total'}>الاجمالي</option>
                        <option value={'uv'}>كهرباء</option>
                    </select>
                    <AreaChart width={900} height={250} data={merchantData?.data?.[projection]}>
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
                    </AreaChart>
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
