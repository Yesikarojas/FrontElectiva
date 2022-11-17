import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

import Menu from './components/navegacion/Menu';
import Activities from  './components/paginas/Activities'
import Matter from './components/paginas/matter';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Menu/>}>
              <Route index element={<Matter/>}/>
              <Route path='matter' element={<Matter/>}/>
              <Route path='activities' element={<Activities/>}/>
              <Route path='*' element={<Navigate replace to='/'/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
