import React from 'react';
import ReactDOM from 'react-dom';

const Test = React.createClass({
  render() {
    return <p>Hellooo world!</p>;
  }
});

ReactDOM.render(
  <Test/>,
  document.getElementById('content')
);
