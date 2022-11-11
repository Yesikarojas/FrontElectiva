import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Menu from './components/navegacionn/Menu'
import Init from  './components/paginas/Init'
import Matter from  './components/paginas/Matter'
import Activities from  './components/paginas/Activities'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu/>
        <Routes>
          <Route path='/' element={<Init/>}/>
          <Route path='/matter' element={<Matter/>}/>
          <Route path='/activities' element={<Activities/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
