import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import ShoppingList from './pages/ShoppingList';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recipe/:id" element={<RecipeDetails/>}/> 
        <Route path="/shopping-list" element={<ShoppingList/>}/>
        <Route path="/calendar" element={<Calendar/>} />
      </Routes>
    </Router>
  );
}

export default App
