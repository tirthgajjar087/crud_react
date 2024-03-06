import logo from './logo.svg';
import './App.css';
import ReadData from './ReadData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddData from './AddData';
import EditData from './EditData';
import ShowData from './ShowData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReadData />}></Route>
        <Route path="/add_data" element={<AddData />} />
        <Route path="/edit_data/:id" element={<EditData />} />
        <Route path='/show_data/:emp_id' element={<ShowData />} />
      </Routes>
    </BrowserRouter>

    // <ReadData />
  );
}

export default App;
