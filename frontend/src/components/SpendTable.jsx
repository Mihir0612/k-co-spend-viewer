import React from 'react'

export default function SpendTable({ data, setSort, sort }) {
  function onSort(column) {
    const order =
      sort.sortBy === column && sort.order === 'asc'
        ? 'desc'
        : 'asc'
    setSort({ sortBy: column, order })
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort('date')}>Date</th>
          <th onClick={() => onSort('cloud_provider')}>Cloud</th>
          <th>Service</th>
          <th>Team</th>
          <th>Env</th>
          <th onClick={() => onSort('cost_usd')}>Cost (USD)</th>
        </tr>
      </thead>

      <tbody>
        {data.map((r, i) => (
          <tr key={i}>
            <td>{r.date}</td>
            <td>{r.cloud_provider}</td>
            <td>{r.service}</td>
            <td>{r.team}</td>
            <td>{r.env}</td>
            <td>${Number(r.cost_usd).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
