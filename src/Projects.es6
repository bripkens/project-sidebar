'use strict';

import React from 'react';

const Projects = React.createClass({
  render() {
    const projectNames = Object.keys(this.props.projects).sort();

    return (
      <div>
        <h1>Projects</h1>
        <ul className='list-group'>
          {projectNames.map(projectName =>
            <li className={this.getProjectClasses(projectName)}
                onClick={this.onClick.bind(this, projectName)}>
              <span>{this.props.projects[projectName].title}</span>
            </li>
          )}
        </ul>
      </div>
    );
  },

  getProjectClasses(projectName) {
    let classes = 'list-item';
    if (this.props.activeProjects.indexOf(projectName) !== -1) {
      classes += ' ' + 'selected';
    }
    return classes;
  },

  onClick(projectName) {
    const project = this.props.projects[projectName];
    this.props.onSelect(project);
  }
});

export default Projects;
