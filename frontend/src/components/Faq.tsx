import { EuiText } from '@elastic/eui'
import { useState } from 'react'

export function FaqWrapper({ children }: any) {
  return (
    <div className="section-homepage-faq wf-section">
      <div className="homepage-faq-backgroundcolor" />
      <div className="mycontainer">
        <div className="textstyles-taglines">FAQ</div>
        <h2>Frequently Asked Questions</h2>
        {children}
      </div>
    </div>
  )
}


export default function FAQ({ items }) {
  const [state, setstate] = useState('')


  const content = items.map(({ Component, heading, id }) => {
    const isOpen = state === id
    const toggle = () => {
      if (isOpen) {
        return setstate('')
      }
      else {
        return setstate(id)
      }
    }

    return (<li
      key={id}

      data-hover="false"
      data-delay={0}
      data-w-id="cf9a6def-eabe-249a-4b43-cb875e030fc8"
      style={isOpen ? {} : { height: "70px" }}
      className="landing-dropdown-item w-dropdown"
    >
      <div
        data-w-id="cf9a6def-eabe-249a-4b43-cb875e030fc9"
        style={{
          color: "rgb(0, 0, 0)",
          backgroundColor: "rgb(255, 255, 255)",
        }}
        onClick={toggle}
        className="dropdown-toggle w-dropdown-toggle"
        id="w-dropdown-toggle-3"
        aria-controls="w-dropdown-list-3"
        aria-haspopup="menu"
        aria-expanded="false"
        role="button"
        tabIndex={0}
      >
        <div
          style={{
            transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${isOpen ? '180' : '0'}deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
            transformStyle: "preserve-3d",
          }}
          className="dropdown-toggle__icon w-icon-dropdown-toggle"
          aria-hidden="true" />
        <h3 className="dropdown-text--breaking">
          {heading}
        </h3>
      </div>
      <nav
        className="dropdown-list w-dropdown-list"
        id="w-dropdown-list-3"
        aria-labelledby="w-dropdown-toggle-3"
      >
        <Component />
      </nav>
    </li>
    )
  })

  return (<>          <ul className="homepage-faqdiv">
    {content}  </ul>
  </>)

}




export function NewFaqWrapper({ children }: any) {
  return (
    <div>
      <div className="">
        <h2 className=" text-black font-semibold text-vnet-blue mb-2 text-2xl text-center">FAQs</h2>
        {/* <EuiText>
                
              </EuiText> */}
        {children}

      </div>
    </div>

  )
}


export function NewFAQ({ items, }) {

  const [state, setstate] = useState([])
  const content = items.map(({ Component, heading, id }) => {
    const isOpen = state.includes(id)
    const toggle = () => {
      if (isOpen) {
        return setstate(state.filter(x => x !== id))
      }
      else {
        return setstate([...state, id])
      }
    }
    // 
    return <li

      key={id}
      className="bg-white my-2 shadow-lg" x-data="accordion(4)">
      <h2 onClick={() => {
        toggle()
      }} className=" text-black flex flex-row justify-between items-center font-semibold p-3 cursor-pointer">
        <span className='text-xl'>{heading}</span>
        <div>
          <svg onClick={() => { }} className={("fill-current force-eui-primary h-6 w-6 transform transition-transform duration-500" + (isOpen ? ' rotate-180' : ''))} viewBox="0 0 20 20">
            <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10" />
          </svg>
        </div>
      </h2>
      <div
        id={id}
        style={isOpen ? { maxHeight: document.getElementById(id).scrollHeight } : undefined}
        className="border-l-2 border-purple-600 overflow-hidden max-h-0 " x-ref="tab" onClick={() => { }} >
        <div className='p-3 text-gray-900 text-m'>
          <Component />
        </div>
      </div>
    </li>
  })

  return (<>               <ul className="flex flex-col ">
    {content}
  </ul>

  </>)

}
