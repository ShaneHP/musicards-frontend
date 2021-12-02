// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard';

//get code from url
const code = new URLSearchParams(window.location.search).get('code');

console.log('code: ' + code);

function App() {
    return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
