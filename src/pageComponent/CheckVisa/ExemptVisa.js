import checkIcon from "@/assets/images/check-gr.svg"
import Image from "next/image"

function ExemptVisa({ title, desc, dataInfo }) {
  return (
    <div className='md:mt-[6.13vw] md:mb-0 mb-[14.93vw] w-full md:rounded-[1vw] rounded-[2.13333vw] relative'>
      <div className='absolute exempt-visa inset-0 z-[-1] md:rounded-[1vw] rounded-[2.13333vw]'></div>
      <div className='flex md:flex-row flex-col gap-[3vw] justify-between pt-[4.73vw] p-[3.75vw]'>
        <div className='flex flex-col'>
          <h2 className='text-[#138140] font-optima md:text-[2.5vw] text-[5.86667vw] font-semibold leading-[110%] md:mb-[1.5vw] mb-[2.13vw]'>
            {title}
          </h2>
          <p className=' text-textColor md:text-[1vw] text-[3.73333vw] leading-[150%] md:mb-0 mb-[1.6vw]'>
          <div
              className='flex flex-col w-full checkVisa-info text-editor'
              dangerouslySetInnerHTML={{ __html: `${desc}`}}
            ></div>
          </p>
        </div>
        <div className='flex flex-col md:gap-[1.87vw] gap-[6.4vw] md:mb-0 mb-[13.07vw] md:mt-[6.13vw] mt-[7.47vw]'>
              <div className='md:pl-[1.75vw] pl-[6.47vw] pr-[6.33vw] md:pr-[1.69vw] md:pt-[2.5vw] pt-[5.87vw] md:pb-[2.81vw] pb-[8.53vw] flex flex-col bg-white  md:w-[19vw]  md:rounded-[0.5vw] rounded-[2.13333vw]'>
                <h3 className='text-textColor md:text-[1.25vw] font-medium leading-[1.5] md:mb-[1.5vw] mb-[4.27vw]'>
                  {dataInfo?.whyapply}
                </h3>
                {dataInfo?.listreason?.map((item, index) => (
                  <div key={index} className='flex md:gap-[1vw] gap-[2.13vw] md:mb-[1vw] mb-[3.73vw]'>
                    <Image src={checkIcon} width={'100%'} height={'100%'} alt="check icon" className="w-[1vw] h-[1vw] max-md:w-[3.73vw] max-md:h-[3.73vw] mt-[0.25vw]" />
                    <p className='text-textColor md:text-[0.875vw] whitespace-normal leading-[150%]'>{item.reason}</p>
                  </div>
                ))}
              </div>

              <div className='md:pl-[1.75vw] pl-[6.47vw] pr-[6.33vw] md:pr-[1.69vw] md:pt-[2.5vw] pt-[5.87vw] md:pb-[2.81vw] pb-[8.53vw] flex flex-col bg-white  md:w-[19vw]  md:rounded-[0.5vw] rounded-[2.13333vw]'>
                <h3 className='text-textColor md:text-[1.25vw] font-medium leading-[1.5] md:mb-[1.5vw] mb-[4.27vw]'>
                  {dataInfo?.contactus}
                </h3>
                <div className='flex md:gap-[0.5vw] gap-[2.13vw] md:mb-[1vw] mb-[3.73vw] '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='md:w-[1.4vw] md:h-[1.4vw] flex flex-shrink-0'
                    width='16'
                    height='17'
                    viewBox='0 0 16 17'
                    fill='none'
                  >
                    <path
                      d='M13.25 14.5C11.9611 14.5 10.6472 14.1889 9.30833 13.5667C7.96944 12.9444 6.72778 12.0611 5.58333 10.9167C4.43889 9.77222 3.55556 8.53056 2.93333 7.19167C2.31111 5.85278 2 4.53889 2 3.25C2 3.03889 2.07222 2.86111 2.21667 2.71667C2.36111 2.57222 2.53889 2.5 2.75 2.5H5.08333C5.23889 2.5 5.37222 2.55556 5.48333 2.66667C5.59444 2.77778 5.67222 2.91667 5.71667 3.08333L6.16667 5.18333C6.18889 5.33889 6.18611 5.48056 6.15833 5.60833C6.13056 5.73611 6.07222 5.84444 5.98333 5.93333L4.31667 7.61667C4.60556 8.10556 4.91111 8.56111 5.23333 8.98333C5.55556 9.40556 5.91111 9.80556 6.3 10.1833C6.71111 10.6056 7.14444 10.9917 7.6 11.3417C8.05556 11.6917 8.53333 12 9.03333 12.2667L10.6167 10.6333C10.7278 10.5111 10.8556 10.4278 11 10.3833C11.1444 10.3389 11.2889 10.3278 11.4333 10.35L13.4167 10.7833C13.5833 10.8278 13.7222 10.9167 13.8333 11.05C13.9444 11.1833 14 11.3333 14 11.5V13.75C14 13.9611 13.9278 14.1389 13.7833 14.2833C13.6389 14.4278 13.4611 14.5 13.25 14.5Z'
                      fill='#138140'
                    />
                  </svg>
                  <p
                    className='phoneContact text-editor md:!text-[0.875vw]'
                    dangerouslySetInnerHTML={{ __html: `${dataInfo?.listcontact?.phone}` }}
                  ></p>
                </div>
                <div className='flex md:gap-[0.5vw] gap-[2.13vw] md:mb-[1vw] mb-[3.73vw]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='md:w-[1.3vw] md:h-[1.3vw] flex flex-shrink-0'
                    width='16'
                    height='17'
                    viewBox='0 0 16 17'
                    fill='none'
                  >
                    <path
                      d='M2.33398 13.8337C2.06732 13.8337 1.83398 13.7337 1.63398 13.5337C1.43398 13.3337 1.33398 13.1003 1.33398 12.8337V4.16699C1.33398 3.90033 1.43398 3.66699 1.63398 3.46699C1.83398 3.26699 2.06732 3.16699 2.33398 3.16699H13.6673C13.934 3.16699 14.1673 3.26699 14.3673 3.46699C14.5673 3.66699 14.6673 3.90033 14.6673 4.16699V12.8337C14.6673 13.1003 14.5673 13.3337 14.3673 13.5337C14.1673 13.7337 13.934 13.8337 13.6673 13.8337H2.33398ZM8.00065 8.80033L13.6673 5.08366V4.16699L8.00065 7.80033L2.33398 4.16699V5.08366L8.00065 8.80033Z'
                      fill='#138140'
                    />
                  </svg>
                  <div
                    className='emailContact text-editor md:!text-[0.875vw]'
                    dangerouslySetInnerHTML={{ __html: `${dataInfo?.listcontact?.email}` }}
                  ></div>
                </div>
                <div className='flex md:gap-[0.5vw] gap-[2.13vw] md:mb-[1vw] mb-[3.73vw]'>
                  <svg
                    className='md:w-[1.4vw] md:h-[1.4vw] flex flex-shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='18'
                    viewBox='0 0 16 18'
                    fill='none'
                  >
                    <path
                      d='M8.00083 9.83398C8.32207 9.83398 8.59657 9.7196 8.82435 9.49083C9.05213 9.26208 9.16602 8.98708 9.16602 8.66583C9.16602 8.3446 9.05163 8.0701 8.82287 7.84232C8.59411 7.61454 8.31911 7.50065 7.99787 7.50065C7.67663 7.50065 7.40213 7.61503 7.17435 7.8438C6.94657 8.07256 6.83268 8.34756 6.83268 8.6688C6.83268 8.99003 6.94707 9.26454 7.17583 9.49232C7.40459 9.7201 7.67959 9.83398 8.00083 9.83398ZM7.99935 16.6673C6.21046 15.1451 4.87435 13.7312 3.99102 12.4257C3.10768 11.1201 2.66602 9.91176 2.66602 8.80065C2.66602 7.13398 3.20213 5.80621 4.27435 4.81732C5.34657 3.82843 6.58824 3.33398 7.99935 3.33398C9.41046 3.33398 10.6521 3.82843 11.7243 4.81732C12.7966 5.80621 13.3327 7.13398 13.3327 8.80065C13.3327 9.91176 12.891 11.1201 12.0077 12.4257C11.1243 13.7312 9.78824 15.1451 7.99935 16.6673Z'
                      fill='#138140'
                    />
                  </svg>
                  <div
                    className='addressContact text-editor md:!text-[0.875vw]'
                    dangerouslySetInnerHTML={{ __html: `${dataInfo?.listcontact?.address}` }}
                  ></div>
                </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default ExemptVisa
