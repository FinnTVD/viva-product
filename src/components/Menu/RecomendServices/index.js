import ServiceItem from './ServiceItem'
function index({ rcmServicesList, lang,onCloseMenu }) {
  const data = rcmServicesList?.data?.categories?.nodes
  const dataService = data?.filter((item,index) => item?.description === null)
  return (
    <div className='grid grid-cols-3 grid-rows-[max-content] gap-[2.5vw] content ml-auto mr-auto py-[3vw] max-h-[90vh] overflow-y-auto'>
      {dataService?.map((item, index) => (
        <ServiceItem
          key={index}
          data={item}
          lang={lang}
          onCloseMenu={onCloseMenu}
        />
      ))}
    </div>
  )
}

export default index
