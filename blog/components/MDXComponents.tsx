/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { MDXLayout, ComponentMap } from 'pliny/mdx-components'
import { TOCInline } from 'pliny/ui/TOCInline'
import { Pre } from 'pliny/ui/Pre'
import { BlogNewsletterForm } from 'pliny/ui/NewsletterForm'

import Image from './Image'
import CustomLink from './Link'

export const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout content={content} {...rest} />
}

function FaqContent({ items, ...props }) {
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

    return (
    <li
      key={id}
      data-hover="false"
      data-delay={0}
      data-w-id="cf9a6def-eabe-249a-4b43-cb875e030fc8"
      style={isOpen ? {} : {}}
      className={"landing-dropdown-item w-dropdown " + (isOpen ? "open" : "")}
    >
      <div
        data-w-id="cf9a6def-eabe-249a-4b43-cb875e030fc9"
        style={{
          color: "rgb(0, 0, 0)",
          backgroundColor: "rgb(255, 255, 255)",
        }}
        onKeyPress={toggle}
        onClick={toggle}
        className="dropdown-toggle w-dropdown-toggle"
        id="w-dropdown-toggle-3"
        aria-controls="w-dropdown-list-3"
        aria-haspopup="menu"
        aria-expanded="false"
        role="button"
        tabIndex={0}
      >
        <h3
          className="dropdown-text--breaking"
        >
          {heading}
        </h3>
        <div>
          <svg style={{
            transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${isOpen ? '180' : '0'}deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
            transformStyle: "preserve-3d",
            fill: 'black'
          }} width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="euiIcon eui-yuxi89-euiIcon-s-isLoaded" focusable="false" role="img" data-icon-type="arrowDown" data-is-loaded="true" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M1.957 4.982a.75.75 0 011.06-.025l4.81 4.591a.25.25 0 00.346 0l4.81-4.59a.75.75 0 011.035 1.085l-4.81 4.59a1.75 1.75 0 01-2.416 0l-4.81-4.59a.75.75 0 01-.025-1.06z" /></svg>
        </div>
      </div>
      <div
        className={"dropdown-list w-dropdown-list " + (isOpen ? "open" : "")}
        id="w-dropdown-list-3"
        aria-labelledby="w-dropdown-toggle-3"
      >
        <Component />
      </div>
    </li>
    )
  })

  return <ul>
    {content}
  </ul>
}


export const Faq = (props) => {

  return (<>
    <h2 id="faq">FAQs</h2>
    <FaqContent {...props} />
  </>)
}

export const MDXComponents: ComponentMap = {
  Faq,
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
}
