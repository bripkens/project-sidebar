ProjectSidebarView = require './project-sidebar-view'
{CompositeDisposable} = require 'atom'

module.exports = ProjectSidebar =
  projectSidebarView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @projectSidebarView = new ProjectSidebarView(state.projectSidebarViewState)
    # @modalPanel = atom.workspace.addModalPanel(item: @projectSidebarView.getElement(), visible: false)

    @sidebarPanel = atom.workspace.addRightPanel(item: @projectSidebarView.getElement(), visible: false, priority: 0)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'project-sidebar:toggle': => @toggle()

  deactivate: ->
    @sidebarPanel.destroy()
    @subscriptions.dispose()
    @projectSidebarView.destroy()

  serialize: ->
    projectSidebarViewState: @projectSidebarView.serialize()

  toggle: ->
    if @sidebarPanel.isVisible()
      @sidebarPanel.hide()
    else
      @sidebarPanel.show()
