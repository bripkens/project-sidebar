'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _atom = require('atom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

'use strict';

var ProjectSidebar = {

  activate: function activate() {
    var _this = this;

    this.element = document.createElement('div');
    this.sidebar = _react2['default'].render(_react2['default'].createElement(_Sidebar2['default'], null), this.element);

    this.panel = atom.workspace.addRightPanel({
      item: this.element,
      visible: false,
      priority: 0
    });

    this.subscriptions = new _atom.CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', 'project-sidebar:toggle', function () {
      return _this.toggle();
    }));
  },

  deactivate: function deactivate() {
    _react2['default'].unmountComponentAtNode(this.element);
    this.panel.destroy();
    this.subscriptions.dispose();
  },

  toggle: function toggle() {
    if (this.panel.isVisible()) {
      this.panel.hide();
    } else {
      this.panel.show();
      this.sidebar.onShow();
    }
  } };

exports['default'] = ProjectSidebar;
module.exports = exports['default'];