import { keymap } from "@codemirror/view";

export const customKeymap = keymap.of([
  {
    key: "Alt-[",
    run: (view) => {
      const sel = view.state.selection.main;
      if (!sel.empty) {
        view.dispatch({
          changes: [
            { from: sel.from, insert: "“" },
            { from: sel.to, insert: "”" },
          ]
        });
      } else {
        view.dispatch({
          changes: { from: sel.from, insert: "“”" },
          selection: { anchor: sel.from + 1 }
        });
      }
      return true;
    }
  },
  {
    key: "Alt-]",
    run: (view) => {
      const sel = view.state.selection.main;
      if (!sel.empty) {
        view.dispatch({
          changes: [
            { from: sel.from, insert: "‘" },
            { from: sel.to, insert: "’" },
          ]
        });
      } else {
        view.dispatch({
          changes: { from: sel.from, insert: "‘’" },
          selection: { anchor: sel.from + 1 }
        });
      }
      return true;
    }
  },
  {
    key: "Alt--",
    run: (view) => {
      const { from } = view.state.selection.main;

      view.dispatch({
        changes: [
          { from, insert: "ʼ" }
        ],
        selection: { anchor: from + 1 }
      });

      return true;
    }
  }
]);
