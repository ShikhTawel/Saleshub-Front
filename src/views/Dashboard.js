import {useEffect, useState} from "react";
import {useCustomAxios} from "../Hooks/useAxios";
import DetailsModal from "./DetailsModal";
import FAvatar from "../components/FAvatar";
import InstanceViewer from "./InstanceViewer";
import FCustomDataTable from "../components/FCustomDataTable/FCustomDataTable";
import logo from "../assets/images/logo.jpg";
import ESpinner from "../components/ESpinner";
import axios from "axios";


const Dashboard =()=>{
    const [page, setPage] = useState(0)
    const [filter, setFilter] = useState([])
    const salesRepTargetResponse = useCustomAxios({
        method: "GET",
        url: `SalesRep/target/${localStorage.getItem('username')}`,
    })
    // const salesRepTargetResponse = '';
    // axios
    //     .get(`${BASE_URL}SalesRep/target/${localStorage.getItem('username')}`)
    //     .then((res) => {
    //         salesRepTargetResponse = res.data;
    //     })
    //     .catch((err) => {

    //     });

    const salesRepAchievedResponse = useCustomAxios({
        method: "GET",
        url: `SalesRep/achieved/${localStorage.getItem('username')}`,
    })
    const salesRepMerchantsCountResponse = useCustomAxios({
        method: "GET",
        url: `SalesRep/${localStorage.getItem('username')}/merchantsNumber`,
    })

    const {response, loading, error, totalNumberOfPages, Refetch} = useCustomAxios({
        method: "GET",
        url: `SalesRep/${localStorage.getItem('username')}/merchants/${page}/5`,
    })

    useEffect(()=>{
        Refetch()
    },[page])



    const [filterOptions, setFilterOptions] = useState([
        {
            id: 0,
            value: "",
            key: "",
        },
    ])
    const [merchantData, setMerchantData] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const cols = [
        {
            Header: "الكود",
            accessor: "code", // String-based value accessors!
        },
        {
            Header: "الأسم",
            accessor: "name", // String-based value accessors!
        },
        {
            Header: "الاداء",
            accessor: "overdraftLimit", // String-based value accessors!
        },

    ]

    return (
        <>

            <DetailsModal merchantData={merchantData} isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
            <div className={" bg-gray-50 w-full min-h-screen f-col-center"}>
                <div className={"bg-orient-500 p-3 f-col-center text-white w-full"}>
                    <span>Fawry Merchant System</span>
                </div>
                <div className={"p-5 w-full"}>
                    <div
                        className={"flex w-full  justify-between gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded my-5 "}>
                        <div className={"flex gap-2 items-center "}>
                            <FAvatar name={"mostafa.elamrawiy"}/>
                            <div className={"flex flex-col "}>
                                <span className={"text-lg"}>{localStorage.getItem('username')}</span>
                                <div className={"flex gap-2"}>
                                    <InstanceViewer  value={salesRepMerchantsCountResponse?.response} instance={'Merchants'}/>
                                </div>
                            </div>
                        </div>
                        <InstanceViewer  value={salesRepTargetResponse?.response} instance={'Target'}/>
                        <InstanceViewer  value={salesRepAchievedResponse?.response} valueBlock = {
                            salesRepAchievedResponse.loading ? <ESpinner isVisible={true}/> : salesRepAchievedResponse?.response
                        } instance={'Achieved Current Month'}/>
                    </div>
                    <div className={"flex gap-2   w-full "}>
                        <div className={"w-full"}>
                            <div className={"primary-shadow rounded border bg-white p-3 h-full pb-10"}>
                                <div className={"my-2"}>
                                    <span className={"text-lg font-semibold"}>الموقع </span>
                                </div>
                                <iframe
                                    title='map'
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                    width="100%"
                                    height="300px"
                                    frameBorder="0"
                                    style={{border: 0}}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"w-full mt-5"}>
                        <div className={"col-span-2 bg-white"}>
                            <FCustomDataTable
                                cols={cols}
                                data={response?response.content:[]}
                                isLoading={loading}
                                page={page}
                                setPage={setPage}
                                size={2}
                                Refetch={Refetch}
                                setFilter={setFilter}
                                filterOptions={filterOptions}
                                setFilterOptions={setFilterOptions}
                                filter={filter}
                                totalNumberOfPages={totalNumberOfPages}
                                rowFunction={(row) => {
                                    setMerchantData(row)
                                    setIsModalOpen(true)

                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className={"bg-orient-500 p-3 f-col-center mt-auto w-full text-white"}>
                    <img src={logo} width={80}/>
                </div>
            </div>

        </>
    )
}
export default Dashboard
