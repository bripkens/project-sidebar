'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

'use strict';

var Projects = _react2['default'].createClass({
  displayName: 'Projects',

  render: function render() {
    var _this = this;

    var projectNames = Object.keys(this.props.projects).sort();

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'h1',
        null,
        'Projects'
      ),
      _react2['default'].createElement(
        'ul',
        { className: 'list-group' },
        projectNames.map(function (projectName) {
          return _react2['default'].createElement(
            'li',
            { className: _this.getProjectClasses(projectName),
              onClick: _this.onClick.bind(_this, projectName) },
            _react2['default'].createElement(
              'span',
              null,
              _this.props.projects[projectName].title
            )
          );
        })
      )
    );
  },

  getProjectClasses: function getProjectClasses(projectName) {
    var classes = 'list-item';
    if (this.props.activeProjects.indexOf(projectName) !== -1) {
      classes += ' ' + 'selected';
    }
    return classes;
  },

  onClick: function onClick(projectName) {
    var project = this.props.projects[projectName];
    this.props.onSelect(project);
  }
});

exports['default'] = Projects;
module.exports = exports['default'];