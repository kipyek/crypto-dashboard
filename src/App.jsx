import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router';
import HomePage from './pages/home';
import AboutPage from './pages/about';


const API_URL = import.meta.env.VITE_COINS_API_URL

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`)
        const data = await res.json();
        setCoins(data)
        console.log("coins", data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCoins();
  }, [limit])

  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      )
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    })


  return (
    <Routes>
      <Route path='/' element={<HomePage
        loading={loading}
        error={error}
        filter={filter}
        limit={limit}
        setFilter={setFilter}
        setLimit={setLimit}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCoins={filteredCoins}
      />} />
      <Route path='/about' element={<AboutPage/>} />
    </Routes>
  )
}

export default App