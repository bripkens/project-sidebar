'use strict';

import React from 'react';
import path from 'path';
import CSON from 'season';
import _ from 'lodash';

import Projects from './Projects';

const Sidebar = React.createClass({
  getInitialState() {
    return {
      projects: this.getProjects(),
      activeProjects: this.getActiveProjects()
    }
  },

  componentDidMount() {
    this.projectSubscription = atom.project.onDidChangePaths(() =>
      this.setState({
        activeProjects: this.getActiveProjects()
      })
    )
  },

  componentWillUnmount() {
    this.projectSubscription.dispose();
  },

  render() {
    return (
      <div className='project-sidebar padded'>
        <Projects projects={this.state.projects}
                  activeProjects={this.state.activeProjects}
                  onSelect={this.onSelect} />
      </div>
    );
  },

  getProjects() {
    const confPath = path.join(atom.getConfigDirPath(), 'projects.cson');
    return CSON.readFileSync(confPath);
  },

  getActiveProjects() {
    const paths = atom.project.getPaths().slice().sort();
    return _.values(this.getProjects())
      .filter(project =>
        _.isEqual(project.paths.slice().sort(), paths)
      )
      .map(project => project.title);
  },

  onSelect(project) {
    // remove all current directories that do not belong to the
    // selected project.
    atom.project.getDirectories()
      .filter(function(directory) {
        return project.paths.indexOf(directory.path) === -1;
      })
      .forEach(function(directory) {
        atom.project.removePath(directory.path);
      });

    // next add all remaining project directories
    project.paths.forEach(function(eachPath) {
      if (!atom.project.contains(eachPath)) {
        atom.project.addPath(eachPath);
      }
    });
  }
});

export default Sidebar;
