import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Search from './components/Search';
// import Disease from './components/Disease';

function App() {
  return (
    <div>
      <Header />
      <Search />
      {/* <Disease /> */}
      <Footer />
    </div>
  );
}

export default App;
