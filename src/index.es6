'use strict';

import {CompositeDisposable} from 'atom';
import React from 'react';
import Sidebar from './Sidebar';

const ProjectSidebar = {

  activate() {
    this.element = document.createElement('div');
    this.sidebar = React.render(
      <Sidebar />,
      this.element
    );

    this.panel = atom.workspace.addRightPanel({
      item: this.element,
      visible: false,
      priority: 0
    });

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add(
        'atom-workspace',
        'project-sidebar:toggle',
        () => this.toggle()
      )
    );
  },

  deactivate() {
    React.unmountComponentAtNode(this.element);
    this.panel.destroy();
    this.subscriptions.dispose();
  },

  toggle() {
    if (this.panel.isVisible()) {
      this.panel.hide();
    } else {
      this.panel.show();
      this.sidebar.onShow();
    }
  },
};

export default ProjectSidebar;
