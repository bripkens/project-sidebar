'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _season = require('season');

var _season2 = _interopRequireDefault(_season);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Projects = require('./Projects');

var _Projects2 = _interopRequireDefault(_Projects);

'use strict';

var Sidebar = _react2['default'].createClass({
  displayName: 'Sidebar',

  getInitialState: function getInitialState() {
    return {
      projects: this.getProjects(),
      activeProjects: this.getActiveProjects()
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    this.projectSubscription = atom.project.onDidChangePaths(function () {
      return _this.setState({
        activeProjects: _this.getActiveProjects()
      });
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    this.projectSubscription.dispose();
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'project-sidebar padded' },
      _react2['default'].createElement(_Projects2['default'], { projects: this.state.projects,
        activeProjects: this.state.activeProjects,
        onSelect: this.onSelect })
    );
  },

  getProjects: function getProjects() {
    var confPath = _path2['default'].join(atom.getConfigDirPath(), 'projects.cson');

    try {
      return _season2['default'].readFileSync(confPath);
    } catch (e) {
      atom.notifications.addError('Failed to open the project sidebar', {
        detail: 'The project-sidebar package requires a configured ' + 'installation of the project-manager plugin. project-sidebar ' + 'loads a list of projects by inspecting the ' + '~/.atom/projects.cson` file which is managed by project-manager.'
      });

      // fall back to an empty object, which is basically the same as saying
      // that no projects have been configured.
      return {};
    }
  },

  getActiveProjects: function getActiveProjects() {
    var paths = atom.project.getPaths().slice().sort();
    return _lodash2['default'].values(this.getProjects()).filter(function (project) {
      return _lodash2['default'].isEqual(project.paths.slice().sort(), paths);
    }).map(function (project) {
      return project.title;
    });
  },

  onSelect: function onSelect(project) {
    // remove all current directories that do not belong to the
    // selected project.
    atom.project.getDirectories().filter(function (directory) {
      return project.paths.indexOf(directory.path) === -1;
    }).forEach(function (directory) {
      atom.project.removePath(directory.path);
    });

    // next add all remaining project directories
    project.paths.forEach(function (eachPath) {
      if (!atom.project.contains(eachPath)) {
        atom.project.addPath(eachPath);
      }
    });
  },

  onShow: function onShow() {
    this.setState({
      projects: this.getProjects(),
      activeProjects: this.getActiveProjects()
    });
  }
});

exports['default'] = Sidebar;
module.exports = exports['default'];