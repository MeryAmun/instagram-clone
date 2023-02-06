import './App.css';
import { Posts } from './components';

function App() {
  return (
    <div className="app">
     <div className="app__header">
    <img src="https://www.instagram.com/static/images/web/mobile" alt="logo"  className='app__headerImage'/>
     </div>
     <h1>Instagram</h1>
     {/* Header */}
     {/* Posts */}
     <Posts/>
     {/* Posts */}
    </div>
  );
}

export default App;
