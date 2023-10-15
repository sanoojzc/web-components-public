import React, { useState, useCallback } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import {
  createEditor,
  Editor,
  // Transforms
} from 'slate'


const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const App = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'bold':
        return <strong></strong>
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const handleBoldClick = () => {
    const isActive = isMarkActive(editor, 'bold')
    if(isActive) {
      Editor.addMark(editor, 'bold', false)
    }
    else{
      Editor.addMark(editor, 'bold', true)
    }
    
  }

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  return (<>
  <button onClick={handleBoldClick}>bold</button>
  <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        // Pass in the `renderLeaf` function.
        renderLeaf={renderLeaf}
        // onKeyDown={event => {
        //   if (!event.ctrlKey) {
        //     return
        //   }

        //   switch (event.key) {
        //     case '`': {
        //       event.preventDefault()
        //       const [match] = Editor.nodes(editor, {
        //         match: n => n.type === 'code',
        //       })
        //       Transforms.setNodes(
        //         editor,
        //         { type: match ? null : 'code' },
        //         { match: n => Editor.isBlock(editor, n) }
        //       )
        //       break
        //     }

        //     case 'b': {
        //       event.preventDefault()
        //       Editor.addMark(editor, 'bold', true)
        //       break
        //     }
        //   }
        // }}
      />
    </Slate>
  </>
    
  )
}

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : props.leaf.unbold ? 'normal' : null }}
    >
      {props.children}
    </span>
  )
}
const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

export default App