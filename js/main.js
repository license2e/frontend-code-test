'use strict';

var React = require('react'),
  MainView = require('./views/MainView');

React.render(
  React.createElement(MainView),
  document.getElementById('app')
);
