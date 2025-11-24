A lightweight editor for writing and processing text files storing parallel translations.

The app scans a selected folder for `.ptm` files, and presents them in two modes: code editor and side-by-side rendered text.

## Format

The PTM format is largely inspired by QTML, but opts for minimum verbosity. The markdown-like text is parsed into a JSON tree of the following structure:

```
book
|
+-- chapter
|   |
|   +-- section
|   |   |
|   |   +-- language 1
|   |   +-- language 2
|   |   +-- glossary
|   |   +-- notes
|   |
|   +-- section
+-- chapter
```

The file must containt the `chapter`, `section` and `language` nodes, but `glossary` and `annotation` are optional.

The basic syntax of the file then looks like this:

```md
# chapter-id
## section-id
### language-1-id
Text in language 1.
### language-2-id
Text in language 2.
```
There must be a space between node tokens `#, ##, ###` and their label, and the labels cannot (yet) include spaces. An empty line between nodes and within a text is allowed.

### Glossary

A section can include a glossary. Glossary is collected over the whole document and is compiled into a table.

```
==
= word in language 1 = word in language 2 = word in language 3
```

The glossary has to precede annotation. It can include any number of translations, but only first two are collected into the table.

### Annotations

A word in a block can have an annotation attached to it:

```
This word^1 has an annotation with label 1.
```

Then the content of that annotation is declared in the annotation node:

```
%%
>1 this is the text of the annotation 1
```

Annotation labels should be unique within a section, but can be re-used:

```
### language-1
Some word^1 that has annotation.
### language-2
Translated word^1 that has the same annotation to it.
```
