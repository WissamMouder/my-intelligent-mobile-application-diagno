import * as React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import MainContainer from './navigation/MainContainer';

function App() {
  return (
    <ThemeProvider>
      <MainContainer />
    </ThemeProvider>
  );
}

export default App;
