import './App.css'
import { useState } from 'react'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  Action,
  createAction,
} from 'kbar'
import RenderResults from '../Components/RenderResults'
import ActionHandler from '../Components/ActionHandler'

const animatorStyle = {
  maxWidth: '600px',
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  background: '#fff',
}

const searchStyle = {
  padding: '12px 16px',
  fontFamily: '\'Source Code Pro\', monospace',
  fontSize: '16px',
  width: '100%',
  outline: 'none',
  border: 'none',
}

function App () {
  const [actions, setActions] = useState<Action[]>()

  const handleOpen = () => {
    const tabsDocument = document.querySelectorAll('.docs-sheet-tab')
    const tabsName = [...tabsDocument].map((item) => item.querySelector('span')?.textContent || '')
    const tabsAction = tabsName.map((tab, index) => createAction({
      name: tab,
      shortcut: [...tab.at(0)?.toLocaleLowerCase() ?? ''],
      keywords: tab.at(0),
      perform: () => tabsDocument[index].dispatchEvent(new MouseEvent('mousedown', { bubbles: true })),
    }))
    setActions(tabsAction)
  }

  return (
    <KBarProvider actions={actions} options={{ callbacks: { onOpen: handleOpen } }}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator style={animatorStyle}>
            <KBarSearch style={searchStyle} defaultPlaceholder="搜索工作表" />
            <RenderResults />
            {Array.isArray(actions) && actions?.length > 0 &&
              <ActionHandler action={actions} />}
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  )
}

export default App
