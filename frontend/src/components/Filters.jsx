import React from 'react'
import { useEffect } from 'react'

const unique = (arr, key) => Array.from(new Set(arr.map(x => x[key])).values())


export default function Filters({ filters, setFilters, setSort }) {
// we will fetch initial small dataset from local copy for filter options
const [options, setOptions] = React.useState({ clouds: ['All'], teams: ['All'], envs: ['All'] })


useEffect(() => {
// attempt to load sample from public assets (optional)
fetch('/api/spend')
.then(r => r.json())
.then(j => {
const d = j.data || []
setOptions({
clouds: ['All', ...unique(d, 'cloud_provider')],
teams: ['All', ...unique(d, 'team')],
envs: ['All', ...unique(d, 'env')]
})
})
.catch(() => {})
}, [])


return (
<div className="controls">
<select value={filters.cloud} onChange={e => setFilters(f => ({ ...f, cloud: e.target.value }))}>
{options.clouds.map(c => <option key={c} value={c}>{c}</option>)}
</select>


<select value={filters.team} onChange={e => setFilters(f => ({ ...f, team: e.target.value }))}>
{options.teams.map(t => <option key={t} value={t}>{t}</option>)}
</select>


<select value={filters.env} onChange={e => setFilters(f => ({ ...f, env: e.target.value }))}>
{options.envs.map(x => <option key={x} value={x}>{x}</option>)}
</select>


<input type="month" value={filters.month} onChange={e => setFilters(f => ({ ...f, month: e.target.value }))} />


<button onClick={() => { setFilters({ cloud: 'All', team: 'All', env: 'All', month: '' }) }}>Reset</button>


</div>
)
}