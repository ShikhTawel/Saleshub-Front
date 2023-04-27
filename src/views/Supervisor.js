import { useCustomAxios } from '../Hooks/useAxios'
import React from 'react'
import SectionTitle from '../components/SectionTitle'
import logo from '../assets/images/logo.jpg'
import DataTableFilter from './DataTableFilter'
import DetailsModal from './DetailsModal'
import { useState } from 'react'
import ESpinnerBig from '../components/ESpinnerBig'
import InstanceViewer from './InstanceViewer'
import DetailsModalRep from './DetailsModalRep'
import { getColor, getPerformance } from '../Utilities/Performance'
import { getMerchantsColumns, getRepsColumns } from '../Utilities/ColumnsDefinition'

const Supervisor = () => {
  const [merchantData, setMerchantData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [repData, setRepData] = useState('')
  const [isRepModalOpen, setIsRepModalOpen] = useState(false)

  const { loading, response } = useCustomAxios(
    {
      method: 'GET',
      url: `/supervisor/${localStorage.getItem('username')}/reps`,
    },
    localStorage.getItem('username') +
      '+reps+' +
      new Date().toLocaleDateString(),
  )
  const merchantsResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/supervisor/${localStorage.getItem('username')}/merchants`,
    },
    localStorage.getItem('username') +
      '+merchants+' +
      new Date().toLocaleDateString(),
  )

  const supervisorTargetAchievedResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/supervisor/${localStorage.getItem('username')}/targetAchieved`,
    },
    localStorage.getItem('username') +
      '+targetAchieved+' +
      new Date().toLocaleDateString(),
  )
  const supervisorMerchantsCountResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/supervisor/${localStorage.getItem('username')}/merchantsNumber`,
    },
    localStorage.getItem('username') +
      '+merchantsNumber+' +
      new Date().toLocaleDateString(),
  )

  const supervisorPerformanceResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/supervisor/${localStorage.getItem('username')}/performance`,
    },
    localStorage.getItem('username') +
      '+performance+' +
      new Date().toLocaleDateString(),
  )

  const supervisorMerchantsClassesResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/supervisor/${localStorage.getItem('username')}/merchantsClasses`,
    },
    localStorage.getItem('username') +
      '+merchantsClasses+' +
      new Date().toLocaleDateString(),
  )

  const repsCols = getRepsColumns()

  const columns = getMerchantsColumns()

  if (
    loading ||
    merchantsResponse.loading ||
    supervisorMerchantsCountResponse.loading
  ) {
    return (
      <>
        <span>
          <ESpinnerBig isVisible={true} />
        </span>
      </>
    )
  } else {
    return (
      <>
        <div className={'p-5'}>
          <div className={'p-5 w-full'}>
            <div
              className={
                'flex w-full  justify-between gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded mt-5 '
              }>
              <div className={'flex gap-2 items-center '}>
                <div className={'flex flex-col '}>
                  <span className={'text-lg'}>
                    <div
                      className={'border primary-shadow p-1 bg-white rounded'}>
                      <span className={'text-2xl font-bold'}>المشرف: </span>
                      <span className={'text-2xl font-bold'}>
                        {localStorage.getItem('username')}
                      </span>
                    </div>
                    <div className={'flex gap-2'}>
                      <InstanceViewer
                        value={supervisorMerchantsCountResponse?.response}
                        instance={'POS'}
                      />
                    </div>
                    <div className={'flex gap-2'} style={{backgroundColor: getColor(supervisorPerformanceResponse?.response)}}>
                      <InstanceViewer 
                        value={getPerformance(supervisorPerformanceResponse?.response)}
                        instance={'الاداء'}
                      />
                    </div>
                  </span>
                </div>
              </div>
              {supervisorTargetAchievedResponse.response.map((item, index) => {
                return (
                  <div
                    style={{
                      direction: 'ltr',
                    }}
                    key={index}
                    className={'flex flex-col gap-2 items-start '}>
                    <span className={'text-lg'}>{item?.serviceName}</span>
                    <div
                      className={
                        'flex flex-col gap-1 divide-y border rounded bg-gray-100 border-dashed  '
                      }>
                      <p className={'text-left px-1'}>
                        Target {item?.targetFormmated}
                      </p>{' '}
                      <p className={'text-left px-1'}>
                        Achieved {item?.achievedWithPercentage}
                      </p>{' '}
                      <p className={'text-left px-1'}>
                        Expected Achieved {item?.expectedWithPercentage}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={'p-5 w-full'}>
            <div
              className={
                'flex w-full  justify-between gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded mt-5 '
              }>
              <div className={'flex flex-col '}>
                <span className={'text-lg'}>فئات التجار</span>
              </div>
              {supervisorMerchantsClassesResponse.response.map((item, index) => {
                return (
                  <div
                    style={{
                      direction: 'ltr',
                    }}
                    key={index}
                    className={'flex flex-col gap-2 items-start '}>
                    <span className={'text-lg'}>{item?.classType}</span>
                    <div
                      className={
                        'flex flex-col gap-1 divide-y border rounded bg-gray-100 border-dashed  '
                      }>
                      <p className={'text-left px-1'}>Count {item?.count}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <DetailsModal
            merchantData={merchantData}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
          <DetailsModalRep
            repData={repData}
            isOpen={isRepModalOpen}
            setIsOpen={setIsRepModalOpen}
          />
          <SectionTitle title={'المناديب'} />
          <DataTableFilter
            columns={repsCols}
            data={response}
            onRowClick={(row) => {
              setIsRepModalOpen(true)
              setRepData(row)
            }}
          />
          <SectionTitle title={'التجار'} />
          <DataTableFilter
            columns={columns}
            data={merchantsResponse.response}
            onRowClick={(row) => {
              setIsModalOpen(true)
              setMerchantData(row)
            }}
          />
        </div>

        <div
          className={
            'bg-orient-500 p-3 f-col-center mt-auto w-full text-white'
          }>
          <img src={logo} width={80} />
        </div>
      </>
    )
  }
}

export default Supervisor
