import { css } from '@emotion/react';

export const globalStyles = css`
#__next, .euiDataGrid__content {
    background: inherit;
}

html {
    background-color: unset;
    font-size: 16px;
}

body {
    background: radial-gradient(circle 600px at top left, rgba(0, 191, 179, 0.05), transparent), radial-gradient(circle 800px at 600px 200px, rgba(240, 78, 152, 0.05), transparent), radial-gradient(circle 800px at top right, rgba(254, 197, 20, 0.05), transparent), radial-gradient(circle 800px at left center, rgba(254, 197, 20, 0.05), transparent), radial-gradient(circle 800px at right center, rgba(240, 78, 152, 0.05), transparent), radial-gradient(circle 800px at right bottom, rgba(0, 119, 204, 0.05), transparent), radial-gradient(circle 800px at left bottom, rgba(240, 78, 152, 0.05), transparent);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.video-responsive {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
}

.video-responsive iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
}

.page-card-wrapper {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.page-card-wrapper-large {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.page-content {
    min-height: calc(100vh);
}

.page-inner-content {
    min-height: calc(100vh - 48px);
}

.content {
    height: calc(100vh - 48px);
}

.euiHeader + * {
    padding-top: 48px;
}

.sidebar-height {
    height: calc(100vh - 48px - 2rem)
}

.table-height {
    height: calc(100vh - 48px - 2rem - 32px)
}

::-webkit-scrollbar {
    width: 4px;
}

nav.euiCollapsibleNav, .euiOverlayMask {
    top: 48px;
}
.child-iframe-m-auto iframe {
    margin:auto !important;

}
.euiForm__errors {
    text-align: left;
    margin-bottom: 24px;
}

.primary-link {
    font-weight: 500;
    text-align: left;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    color: #006bb8;
    padding: 0;
    line-height: inherit;
    font-size:12px
}


.euiHeaderSectionItem {
    min-width: 0px;
}

.child-h-full > * {
    height: 100%;
}
.euiCollapsibleNavGroup__children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.bg-cta {
    background-color: #0065f2 !important;
}

.cta-button {
    padding: 40px 16px ;
    font-size: 20px;
    font-weight: 600;
}

.cta-button .euiButton__text {
    font-size: 20px;
    font-weight: 600;
}
.force-eui-primary, .landing .hide-section a, .landing .hide-section .euiLink {
    color: #006bb8  !important; 
}
.text-m {
    color: inherit;
    clear: both;
    font-size: 1.1429rem;
    line-height: 1.7143rem;
}
`
;

