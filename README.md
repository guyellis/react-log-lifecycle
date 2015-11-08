# react-log-lifecycle

Console.log Lifecycle events in a React Component

Questions? Ask me  [@wildfiction](https://twitter.com/wildfiction). Or create an issue.

## Install

```shell
npm install react-log-lifecycle
```

or

```shell
npm install react-log-lifecycle --save-dev
```

## Usage

In your React component:

```javascript
import React from 'react';
import LogLifecyle from 'react-log-lifecycle';

// Optional flags:
const flags = {
  // If logType is set to keys then the props of the object being logged
  // will be written out instead of the whole object. Remove logType or 
  // set it to anything except keys to have the full object logged.
  logType: 'keys',
  // A list of the param "types" to be logged.
  // The example below has all the types.
  names: ['props', 'nextProps', 'nextState', 'prevProps', 'prevState']
};

export default class MyReactComponent extends LogLifecyle {
  constructor(props) {
    super(props, flags);
  }
  render() {

    console.log('MyReactComponent render');

    return (
      <div>My Component with React Lifecycle Logging</div>
    );
  }
}
```

## Output in Console window

This output is without the optional flags object enabled above. With the flags enabled this will also output the objects or objects' keys.

```
#1.1 constructor(props)
  - Start of cycle #1
  - replaces getInitialState()
  - assign to this.state to set initial state.

#1.2 componentWillMount()
  - Invoked Once (client and server)
  - Can change state here with this.setState()  (will not trigger addition render)
  - Just before render()

MyReactComponent render

#1.3 componentDidMount()
  - Invoked Once (client only)
  - refs to children now available
  - integrate other JS frameworks, timers, ajax etc. here
  - Just after render()
  - End of Cycle #1

#2.1 componentWillReceiveProps(nextProps)
  - Start of cycle #2
  - invoked when component is receiving new props
  - not called in cycle #1
  - this.props is old props
  - parameter to this function is nextProps
  - can call this.setState() here (will not trigger addition render)

#2.2 shouldComponentUpdate(nextProps, nextState)
  - invoked when new props/state being received
  - not called on forceUpdate()
  - returning false from here prevents component update and the next 2 parts of the Lifecycle: componentWillUpdate() componentDidUpdate()
  - returns true by default;

#2.3 componentWillUpdate(nextProps, nextState)
  - cannot use this.setState() (do that in componentWillReceiveProps() above)
  - Just before render()

MyReactComponent render

#2.4 componentDidUpdate(prevProps, prevState)
  - Just after render()

#3.1 componentWillUnmount()
  - invoked immediately before a component is unmounted from DOM
  - do cleanup here. e.g. kill timers and unlisten to events such as flux store updates
```
