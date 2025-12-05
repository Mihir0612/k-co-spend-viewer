import React, { useEffect, useState } from 'react'
import Filters from './components/Filters'
import SpendTable from './components/SpendTable'
import Summary from './components/Summary'


export default function App() {
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)
const [filters, setFilters] = useState({ cloud: 'All', team: 'All', env: 'All', month: '' })
const [sort, setSort] = useState({ sortBy: 'date', order: 'asc' })


useEffect(() => {
fetchData()
}, [filters, sort])


async function fetchData() {
setLoading(true)
const params = new URLSearchParams()
if (filters.cloud) params.set('cloud', filters.cloud)
if (filters.team) params.set('team', filters.team)
if (filters.env) params.set('env', filters.env)
if (filters.month) params.set('month', filters.month)
if (sort.sortBy) params.set('sort', sort.sortBy)
if (sort.order) params.set('order', sort.order)


try {
const res = await fetch(`/api/spend?${params.toString()}`)
const json = await res.json()
setData(json.data || [])
} catch (err) {
console.error(err)
setData([])
} finally {
setLoading(false)
}
}


return (
<div className="container">
<div className="header">
<h1>K&Co — Cloud Spend Viewer</h1>

</div>


<Filters filters={filters} setFilters={setFilters} setSort={setSort} />


<Summary data={data} />


{loading ? <div className="loading">Loading data…</div>
: data.length === 0 ? <div className="loading">No data found for this filter.</div>
: <SpendTable data={data} setSort={setSort} sort={sort} />}
</div>
)
}