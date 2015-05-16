'use strict';

var path = require('path');
var CSON = require('season');

function ProjectSidebarView() {
  var element = this.element = document.createElement('div');
  element.classList.add('project-sidebar', 'padded');

  var heading = document.createElement('h1');
  heading.textContent = 'Projects';
  element.appendChild(heading);

  var list = document.createElement('ul');
  list.classList.add('list-group');
  element.appendChild(list);

  var projects = getProjects();
  Object.keys(projects).sort().forEach(function(name) {
    var project = projects[name];
    var li = document.createElement('li');
    li.textContent = name;
    li.classList.add('list-item');
    li.addEventListener('click', function() {

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
    });
    list.appendChild(li);
  });
}
module.exports = ProjectSidebarView;

ProjectSidebarView.prototype.serialize = function() {};

ProjectSidebarView.prototype.destroy = function() {
  this.element.remove();
};

ProjectSidebarView.prototype.getElement = function() {
  return this.element;
};

function getProjects() {
  var confPath = path.join(atom.getConfigDirPath() + '/projects.cson');
  return CSON.readFileSync(confPath);
}
