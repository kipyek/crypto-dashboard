import React from 'react'
import FilterInput from '../components/FilterInput'
import LimitSelector from '../components/LimitSelector'
import SortSelector from '../components/SortSelector'
import CoinCard from '../components/CoinCard'

function HomePage({
    loading,
    error,
    filter,
    limit,
    setFilter,
    setLimit,
    sortBy,
    setSortBy,
    filteredCoins
}) {
  return (
    <div>
      <h1>🚀 Crypto Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error}</div>}

      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className='grid'>
          {
            filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>No matching coins</p>
          )
        }
        </main>)}

    </div>
  )
}

export default HomePage