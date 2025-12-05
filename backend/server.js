const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const csv = require('csv-parser');
app.use(cors());
app.use(express.json());

function loadData() {
const raw = fs.readFileSync("data/sample-spend.json", 'utf8');
return JSON.parse(raw).map(item => ({
...item,
// ensure numeric
cost_usd: Number(item.cost_usd),
date: item.date
}));
}



// function loadData() {
//   const results = [];

//   return new Promise((resolve, reject) => {
//     fs.createReadStream("data/aws_line_items_12mo.csv")
//     // fs.createReadStream("data/gcp_billing_12mo.csv")
//       .pipe(csv())
//       .on("data", (row) => {
//         results.push({
//           ...row,
//           cost_usd: Number(row.cost_usd || row.Cost || row.amount || 0),
//           date: row.date || row.UsageDate || row.Day || ""
//         });
//       })
//       .on("end", () => {
//         resolve(results);
//       })
//       .on("error", reject);
//   });
// }



// API: GET /api/spend
// supports optional query params: cloud, team, env, month (YYYY-MM or YYYY-MM-DD will match prefix)
app.get('/api/spend', async(req, res) => {
try {
let data = await loadData();


const { cloud, team, env, month, sort, order } = req.query;


if (cloud && cloud !== 'All') {
data = data.filter(d => d.cloud_provider === cloud);
}
if (team && team !== 'All') {
data = data.filter(d => d.team === team);
}
if (env && env !== 'All') {
data = data.filter(d => d.env === env);
}
if (month) {
// match by prefix YYYY-MM
data = data.filter(d => d.date.startsWith(month));
}


if (sort) {
const s = sort;
const o = order === 'desc' ? -1 : 1;
data = data.sort((a,b) => {
if (a[s] < b[s]) return -1 * o;
if (a[s] > b[s]) return 1 * o;
return 0;
});
}


res.json({ data });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to load data' });
}
});


// Serve static frontend in production (optional)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('*', (req, res) => {
const index = path.join(__dirname, '..', 'frontend', 'dist', 'index.html');
if (fs.existsSync(index)) res.sendFile(index);
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));