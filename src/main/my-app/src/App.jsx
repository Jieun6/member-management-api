// #frontend/src/App.jsx
import {Route, Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import CreateMember from './pages/CreateMember';
import UpdateMember from './pages/UpdateMember';

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/create-member" element={<CreateMember />} />
            <Route path="/update-member" element={<UpdateMember />} />
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;