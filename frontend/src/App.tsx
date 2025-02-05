import './App.css';
import HomePage from './MyComponents/HomePage';
import UpdateContact from './MyComponents/UpdateContact';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { BookmarkProvider } from './Context/BookmarkContext';

const App: React.FC = () => {
  return (
    <BookmarkProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/update' element={<UpdateContact/>} />
        </Routes>
      </Router>
    </BookmarkProvider>
  )
}

export default App
