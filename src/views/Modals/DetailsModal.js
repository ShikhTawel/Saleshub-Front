import FModal from '../../components/FModal'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import FButton from '../../components/FButton'
import FProductTag from '../../components/FProductTag'
import { useEffect, useState } from 'react'
import InstanceViewer from '../InstanceViewer'
import { axiosInstance } from '../../api/requister'
import ESpinner from '../../components/ESpinner'
import FLabel from '../../components/FLabel'
import FInputField from '../../components/FInputField'
import { format } from 'date-fns'
import { useCustomAxios } from '../../Hooks/useAxios'
import { subMonths } from 'date-fns'

const DetailsModal = ({ isOpen, setIsOpen, merchantData }) => {
  const products = useCustomAxios(
    {
      method: 'GET',
      url: `/services`,
    },
    'services' + new Date().toLocaleDateString(),
  )

  const [projection, selectedProjection] = useState('general')
  const [graphDataPlot, setGraphDataPlot] = useState([])
  const [loading, setLoading] = useState(false)
  const [duration, setDuration] = useState('day')
  let [startDate, setStartDate] = useState(
    format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
  )
  let [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  let [reset, setReset] = useState(false)

  const handleGraph = (graphResponse) => {
    let graphData = []
    const keys = Object.keys(graphResponse)
    for (let i = 0; i < keys.length; i++) {
      graphData = [
        ...graphData,
        ...[
          {
            name: keys[i],
            uv: graphResponse[keys[i]],
          },
        ],
      ]
    }
    setGraphDataPlot(graphData)
  }

  const resetDate = () => {
    reset = true
    setReset(true)
    updateDataBasedOnDate()
  }

  const updateDataBasedOnDate = () => {
    if (duration != 'day') return
    if (startDate == '' || reset) {
      startDate = format(subMonths(new Date(), 3), 'yyyy-MM-dd')
      setStartDate(format(subMonths(new Date(), 3), 'yyyy-MM-dd'))
    }
    if (endDate == '' || reset) {
      endDate = format(new Date(), 'yyyy-MM-dd')
      setEndDate(format(new Date(), 'yyyy-MM-dd'))
    }

    reset = false
    setReset(false)

    setLoading(true)
    if (merchantData) {
      if (
        sessionStorage.getItem(
          projection +
            merchantData.code +
            duration +
            startDate +
            endDate +
            new Date().toLocaleDateString(),
        )
      ) {
        handleGraph(
          JSON.parse(
            sessionStorage.getItem(
              projection +
                merchantData.code +
                duration +
                startDate +
                endDate +
                new Date().toLocaleDateString(),
            ),
          ),
        )
        setLoading(false)
      } else {
        let serviceTransactionsRequestDto = {
          serviceName: projection,
          id: merchantData.code,
          filter: duration,
          startDate: startDate,
          endDate: endDate,
        }
        axiosInstance
          .post(`merchant/serviceTransactions`, serviceTransactionsRequestDto)
          .then((response) => {
            handleGraph(response.data.transactions)
            sessionStorage.setItem(
              projection +
                merchantData.code +
                duration +
                startDate +
                endDate +
                new Date().toLocaleDateString(),
              JSON.stringify(response.data.transactions),
            )
            setLoading(false)
          })
          .catch(() => {
            startDate = format(subMonths(new Date(), 3), 'yyyy-MM-dd')
            setStartDate(format(subMonths(new Date(), 3), 'yyyy-MM-dd'))
            endDate = format(new Date(), 'yyyy-MM-dd')
            setEndDate(format(new Date(), 'yyyy-MM-dd'))
            setLoading(false)
          })
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    if (merchantData) {
      if (
        sessionStorage.getItem(
          projection +
            merchantData.code +
            duration +
            startDate +
            endDate +
            new Date().toLocaleDateString(),
        )
      ) {
        handleGraph(
          JSON.parse(
            sessionStorage.getItem(
              projection +
                merchantData.code +
                duration +
                startDate +
                endDate +
                new Date().toLocaleDateString(),
            ),
          ),
        )
        setLoading(false)
      } else {
        let serviceTransactionsRequestDto = {
          serviceName: projection,
          id: merchantData.code,
          filter: duration,
          startDate: startDate,
          endDate: endDate,
        }
        axiosInstance
          .post(`merchant/serviceTransactions`, serviceTransactionsRequestDto)
          .then((response) => {
            handleGraph(response.data.transactions)
            sessionStorage.setItem(
              projection +
                merchantData.code +
                duration +
                startDate +
                endDate +
                new Date().toLocaleDateString(),
              JSON.stringify(response.data.transactions),
            )
            setLoading(false)
          })
          .catch(() => {
            startDate = format(subMonths(new Date(), 3), 'yyyy-MM-dd')
            setStartDate(format(subMonths(new Date(), 3), 'yyyy-MM-dd'))
            endDate = format(new Date(), 'yyyy-MM-dd')
            setEndDate(format(new Date(), 'yyyy-MM-dd'))
            setLoading(false)
          })
      }
    }
  }, [merchantData, projection, duration])

  return (
    <>
      <FModal
        isAutoWidth
        title={merchantData.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        callbackFunction={() => {
          handleGraph(
            JSON.parse(
              sessionStorage.getItem(
                projection +
                  merchantData.code +
                  duration +
                  startDate +
                  endDate +
                  new Date().toLocaleDateString(),
              ),
            ),
          )
        }}>
        <div className="flex flex-col">
          {duration == 'day' ? (
            <div
              className="grid gap-3 my-3 grid-cols-4 border border rounded bg-gray-50 primary-shadow p-3"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              Start Date{' '}
              <input
                value={startDate}
                type="date"
                onChange={(e) => {
                  e.preventDefault()
                  startDate = e.target.value
                  setStartDate(e.target.value)
                }}></input>
              End Date{' '}
              <input
                value={endDate}
                type="date"
                onChange={(e) => {
                  endDate = e.target.value
                  setEndDate(e.target.value)
                }}></input>
              <FButton onClick={updateDataBasedOnDate}>Submit Filter</FButton>
              <FButton onClick={resetDate}>Reset</FButton>
            </div>
          ) : null}

          <div className="grid gap-3 my-3 grid-cols-4 border border rounded bg-gray-50 primary-shadow p-3">
            <InstanceViewer
              instance={'Merchant Code'}
              value={merchantData.code}
            />
            <InstanceViewer
              instance={'Class'}
              value={merchantData.merchantClass}
            />
            <InstanceViewer
              instance={'Overdraft Limit'}
              value={merchantData.overdraftLimit}
            />
            <InstanceViewer
              instance={'AutoFund'}
              value={merchantData.autoFund}
            />

            <InstanceViewer
              instance={'License Delivery'}
              valueBlock={
                merchantData.license ? (
                  <FProductTag productName={'مفعل'} color="green" />
                ) : (
                  <FProductTag productName={'غير مفعل'} color="orange">
                    غير مكتمل
                  </FProductTag>
                )
              }
            />
            <InstanceViewer
              instance={'Closing Balance '}
              value={merchantData.closingBalance}
            />
          </div>
          <div>
            <div className="flex flex-row-reverse items-center gap-2">
              <div className={'flex gap-2'}>
                <div className="flex gap-2 items-center">
                  <FLabel htmlFor={'day'}>Day</FLabel>
                  <FInputField
                    type={'radio'}
                    className={'w-5 h-5'}
                    id={'day'}
                    name={'duration'}
                    checked={duration === 'day'}
                    onChange={(e) => setDuration(e.target.id)}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <FLabel htmlFor={'month'}>Month</FLabel>
                  <FInputField
                    type={'radio'}
                    className={'w-5 h-5'}
                    id={'month'}
                    name={'duration'}
                    checked={duration === 'month'}
                    onChange={(e) => setDuration(e.target.id)}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <FLabel htmlFor={'year'}>Year</FLabel>
                  <FInputField
                    type={'radio'}
                    className={'w-5 h-5'}
                    id={'year'}
                    name={'duration'}
                    checked={duration === 'year'}
                    onChange={(e) => setDuration(e.target.id)}
                  />
                </div>
              </div>

              <select
                value={projection}
                onChange={(e) => {
                  console.log(e.target.value)
                  selectedProjection(e.target.value)
                }}
                className={
                  'my-4 w-full rounded border border-gray-300 p-1.5 text-sm  shadow-sm ring-orient-400 focus:border focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2'
                }>
                <option value={'general'}>General</option>
                {products.response.map((serviceCategory, index) => (
                  <option key={index} value={serviceCategory}>
                    {serviceCategory}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <ESpinner isVisible={true} />
            ) : (
              <AreaChart width={900} height={250} data={graphDataPlot}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="80%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            )}
          </div>
        </div>
        <div>
          <FButton
            onClick={() => {
              setIsOpen(false)
            }}
            className="w-full mt-4">
            اغلاق
          </FButton>
        </div>
      </FModal>
    </>
  )
}
export default DetailsModal

/* Insurance
<InstanceViewer
              instance={"Insurance Payment"}
              valueBlock={
                merchantData.insurance ? (
                  <FProductTag productName={"مكتمل"} color="green" />
                ) : (
                  <FProductTag productName={"غير مفعل"} color="orange">
                    غير مكتمل
                  </FProductTag>
                )
              }
            />
            */
