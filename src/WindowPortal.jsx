import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { copyStyles } from "./domUitls"
import { toPairs } from "lodash"

export default class extends React.PureComponent {
    static propTypes = {
        size: PropTypes.object,
        position: PropTypes.object,
        toggleWindow: PropTypes.func
    }

    constructor (props) {
        super(props)
        this.container = document.createElement("div")
        this.window = null
    }

    render () {
        const { children } = this.props
        return ReactDOM.createPortal(children, this.container)
    }

    getFeatures () {
        const { size, position } = this.props
        return toPairs({ ...size, ...position })
            .map(x => x.join("="))
            .join(",")
    }

    componentDidMount () {
        const { toggleWindow } = this.props
        this.window = window.open("", "", this.getFeatures())
        this.window.document.body.appendChild(this.container)
        this.window.document.title = "Child Window"
        copyStyles(window.document, this.window.document)
        this.window.addEventListener("beforeunload", () => toggleWindow(false))
    }

    componentWillUnmount () {
        this.window.close()
    }
}
