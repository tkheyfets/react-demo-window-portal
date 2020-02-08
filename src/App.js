import React from "react"
import "./App.css"
import WindowPortal from "./WindowPortal"
import logo from "./logo.svg"

export default class App extends React.Component {
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
  render () {
    const { name, isOpened } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <label>Name:</label>
          <input type="text"
                 value={name}
                 onChange={this.setName.bind(this)} />
          <button onClick={() => this.toggleChildWindow.call(this)}>
            {isOpened ? "Close" : "Open"} Child Window
          </button>
        </header>
        {isOpened ? <WindowPortal
            toggleWindow={this.toggleChildWindow.bind(this)}
            size={{ width: 400, height: 400}}
            position={{ left: 300, top: 100 }}>
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
