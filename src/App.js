import React, { useState } from 'react'
import './App.scss';
import PaintingContainer from './components/Paintings/PaintingsContainer';
import { IsDarkContext } from './context';
import cn from "classnames"

function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <IsDarkContext.Provider value={{
      isDark,
      setIsDark
    }}>
      <div className={cn("App", {
        dark: isDark,
      })}
      >
        <PaintingContainer />
      </div>
    </IsDarkContext.Provider>

  );
}

export default App;
