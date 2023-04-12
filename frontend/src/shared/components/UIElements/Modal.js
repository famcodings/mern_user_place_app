import React from "react";
import ReactDOM from "react-dom"

import { CSSTransition } from "react-transition-group";
import Backdrop from "./BackDrop";

import "./Modal.css"

const ModalOverlay = (props) => {
    const content = (
        <div ref={props.nodeRef} className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                {props.header}
            </header>
            <form className={`modal__content ${props.contentClass}`} onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
                {props.children}
            </form>
            <div className={`modal__footer ${props.footerClass}`}>
                {props.footer}
            </div>
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = (props) => {
    // To resolve warning due to findDOMNode: https://github.com/reactjs/react-transition-group/blob/1fd4a65ac45edd2aea3dec18eeb8b9c07c7eb93f/CHANGELOG.md#features
    const nodeRef = React.useRef(null)
    
    return (
        <React.Fragment>
            { props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                nodeRef={nodeRef}
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay nodeRef={nodeRef} {...props} />
            </CSSTransition>
        </React.Fragment>
    )
}

export default Modal;