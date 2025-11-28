import {LRLanguage, LanguageSupport} from "@codemirror/language"
import {parser} from "./dslParser.js"
import {styleTags, tags} from "@lezer/highlight"

//import { defaultHighlightStyle } from '@codemirror/language'
//console.log( defaultHighlightStyle.specs[13].tag.toString() )

export const dslLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Chapter: tags.heading1,
        Section: tags.heading2,
        Language: tags.heading3,
        Label: tags.keyword,
        Text: tags.string,
        Note: tags.lineComment,
        "Note/Text": tags.lineComment,
        Glossary: tags.comment,
        Gloss: tags.comment,
        Term: tags.comment,
        Annotation: tags.annotation,
        Reference: tags.link,
        Italic: tags.emphasis,
        Bold: tags.strong,
        Doubt: tags.literal
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "//"}
  }
})

export function dsl() {
  return new LanguageSupport(dslLanguage)
}
