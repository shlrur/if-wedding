import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My React Webpack Babel Boiler Plate ^^';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();