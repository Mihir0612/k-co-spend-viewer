import React from 'react'


export default function Summary({ data }) {
const total = data.reduce((s, r) => s + Number(r.cost_usd || 0), 0)
const byCloud = data.reduce((acc, r) => { acc[r.cloud_provider] = (acc[r.cloud_provider] || 0) + Number(r.cost_usd || 0); return acc }, {})


return (
<div className="summary">
<div className="card">
<h3>Total (filtered)</h3>
<div style={{fontSize: '20px'}}>${total.toFixed(2)}</div>
</div>


<div className="card">
<h3>By cloud</h3>
{Object.keys(byCloud).length === 0 ? <div>No data</div> : (
<ul>
{Object.entries(byCloud).map(([k,v]) => <li key={k}>{k}: ${v.toFixed(2)}</li>)}
</ul>
)}
</div>
</div>
)
}