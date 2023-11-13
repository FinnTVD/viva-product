'use client'
import DestinationItem from './DestinationItem'

function index({ data, lang,onCloseMenu }) {
  const dataMenu = data
  const handleSort = (fn) => {
    fn?.sort(function(a, b) {
      var numA = parseInt(a?.country?.priority) || 99;
      var numB = parseInt(b?.country?.priority) || 99;
      return numA - numB;
    });
  }

  handleSort(dataMenu)
  
  return (
    <div className='grid grid-cols-3 gap-[2.5vw] content pt-[2.93vw] pb-[4.38vw] h-max'>
      {dataMenu &&
        dataMenu.map((item, index) => (
          <DestinationItem
            tour={item}
            key={index}
            lang={lang}
            onCloseMenu={onCloseMenu}
          />
        ))}
    </div>
  )
}

export default index
