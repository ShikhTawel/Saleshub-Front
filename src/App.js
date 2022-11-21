import './App.css';
import FAvatar from "./components/FAvatar";
import FCustomDataTable from "./components/FCustomDataTable/FCustomDataTable";
import {useState} from "react";
import {useCustomAxios} from "./Hooks/useAxios";
import logo from '../src/assets/images/logo.jpg'
import {Data} from "./views/Data";
import DetailsModal from "./views/DetailsModal";
import InstanceViewer from "./views/InstanceViewer";

const data = [


    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]

function App() {
    const [page, setPage] = useState(0)
    const [filter, setFilter] = useState([])

    const {response, loading, error, totalNumberOfPages, Refetch} = useCustomAxios({
        method: "GET",
        url: `/user/?page=${page}&size=5`,
    })

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
            Header: "معرف فوري",
            accessor: "fawryId", // String-based value accessors!
        },
        {
            Header: "الأسم",
            accessor: "name", // String-based value accessors!
        },
        {
            Header: "Overdraft Limit",
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
                            <FAvatar name={"Mohamed Ismail"}/>
                            <div className={"flex flex-col "}>
                                <span className={"text-lg"}>Mohamed Ismail</span>
                                <div className={"flex gap-2"}>
                                    <span className={"text-lg leading-3"}>R45 - </span>
                                    <span className={"text-lg leading-3"}>16</span>
                                </div>
                            </div>
                        </div>
                        <InstanceViewer vertical value={'15000'} instance={'Target'}/>
                        <InstanceViewer vertical value={'9477'} instance={'Achieved'}/>
                    </div>
                    <div className={"flex gap-2   w-full "}>
                        <div className={"w-full"}>
                            <div className={"primary-shadow rounded border bg-white p-3 h-full pb-10"}>
                                <div className={"my-2"}>
                                    <span className={"text-lg font-semibold"}>الموقع </span>
                                </div>
                                <iframe
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
                                data={Data}
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
    );
}

export default App;



