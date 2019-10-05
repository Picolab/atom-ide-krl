'use babel';

import IdeKrlView from './ide-krl-view';
import { CompositeDisposable } from 'atom';

export default {

  ideKrlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ideKrlView = new IdeKrlView(state.ideKrlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ideKrlView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ide-krl:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ideKrlView.destroy();
  },

  serialize() {
    return {
      ideKrlViewState: this.ideKrlView.serialize()
    };
  },

  toggle() {
    console.log('IdeKrl was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
