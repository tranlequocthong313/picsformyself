import React, { createContext, useState } from 'react'

import { ALL_PAGE } from '../constants/_tabName'

const NavActiveContext = createContext()

export function NavActiveProvider({ children }) {
  //active tab default is ALL-PAGE
  const [activeTab, setActiveTab] = useState(ALL_PAGE)

  const handleActiveTab = page => {
    setActiveTab(page)
  }

  const contextValue = {
    active: activeTab,
    handleActiveTab: handleActiveTab,
  }
  return (
    <NavActiveContext.Provider value={contextValue}>
      {children}
    </NavActiveContext.Provider>
  )
}

export default NavActiveContext
