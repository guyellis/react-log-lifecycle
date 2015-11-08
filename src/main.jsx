import React from 'react';

export default class LogLifecyle extends React.Component {

  constructor(props) {
    super(props);
    this.cycleNum = 1;
    console.log(`#${this.cycleNum}.1 constructor(props)
  - Start of cycle #${this.cycleNum}
  - replaces getInitialState()
  - assign to this.state to set initial state.
`);
  }

  componentWillMount() {
    console.log(`#${this.cycleNum}.2 componentWillMount()
  - Invoked Once (client and server)
  - Can change state here with this.setState()  (will not trigger addition render)
  - Just before render()
`);
  }

  componentDidMount() {
    console.log(`#${this.cycleNum}.3 componentDidMount()
  - Invoked Once (client only)
  - refs to children now available
  - integrate other JS frameworks, timers, ajax etc. here
  - Just after render()
  - End of Cycle #${this.cycleNum}
`);
    this.cycleNum = 2;
  }

  componentWillReceiveProps(nextProps) {
    console.log(`#${this.cycleNum}.1 componentWillReceiveProps(nextProps)
  - Start of cycle #${this.cycleNum}
  - invoked when component is receiving new props
  - not called in cycle #1
  - this.props is old props
  - parameter to this function is nextProps
  - can call this.setState() here (will not trigger addition render)
`);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(`#${this.cycleNum}.2 shouldComponentUpdate(nextProps, nextState)
  - invoked when new props/state being received
  - not called on forceUpdate()
  - returning false from here prevents component update and the next 2 parts of the Lifecycle: componentWillUpdate() componentDidUpdate()
  - returns true by default;
`);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(`#${this.cycleNum}.3 componentWillUpdate(nextProps, nextState)
  - cannot use this.setState() (do that in componentWillReceiveProps() above)
  - Just before render()
`);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`#${this.cycleNum}.4 componentDidUpdate(prevProps, prevState)
  - Just after render()
`);
  }

  componentWillUnmount() {
    this.cycleNum = 3;
    console.log(`#${this.cycleNum}.1 componentWillUnmount()
  - invoked immediately before a component is unmounted from DOM
  - do cleanup here. e.g. kill timers and unlisten to events such as flux store updates
`);
  }

}
