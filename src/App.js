import React from "react"
import "./App.css"
import WindowPortal from "./WindowPortal"
import logo from "./logo.svg"

export default class App extends React.Component {
  input = null
  state = { name: "John Doe", isOpened: false }
  setName (event) {
    const { target: { value } } = event
    const { name } = this.state
    if (value !== name) this.setState({ name: value.trim() })
  }
  toggleChildWindow (close) {
    const { isOpened } = this.state
    this.setState({ isOpened: typeof close === "undefined" ? !isOpened : close })
  }
  componentDidMount () {
    if (this.input !== null) {
      const { name } = this.state
      this.input.value = name
    }
  }
  render () {
    const { name, isOpened } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <label>Name:</label>
          <input type="text"
                 ref={node => this.input = node}
                 onChange={this.setName.bind(this)} />
          <button onClick={() => this.toggleChildWindow.call(this)}>
            {isOpened ? "Close" : "Open"} Child Window
          </button>
        </header>
        {isOpened ? <WindowPortal
            id="childWindow"
            toggleWindow={this.toggleChildWindow.bind(this)}
            features={{
              width: 400,
              height: 400,
              left: 300,
              top: 100,
              location: "no"
            }}>
          <header className="App-header">
            <img src={`${window.location.origin}${logo}`}
                 alt="logo"
                 className="App-logo"/>
            <p>
              Name is: <strong>{name}</strong>
            </p>
          </header>
        </WindowPortal> : null}
      </div>
    )
  }
}
