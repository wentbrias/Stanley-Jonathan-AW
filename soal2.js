const transactions = [
  { id: 1, buyer: "Ayu", category: "Buku", amount: 85000 },
  { id: 2, buyer: "Budi", category: "Elektronik", amount: 450000 },
  { id: 3, buyer: "Ayu", category: "Buku", amount: 60000 },
  { id: 4, buyer: "Citra", category: "Elektronik", amount: 320000 },
  { id: 5, buyer: "Dani", category: "Buku", amount: 75000 },
  { id: 6, buyer: "Budi", category: "Fashion", amount: 130000 },
];

function totalRevenue(transactions) {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );
}

function revenueByCategory(transactions) {
  const grouppedObjectByRevenue = new Map();

  transactions.forEach((transaction) => {
    const currentRevenue =
      grouppedObjectByRevenue.get(transaction.category) || 0;

    grouppedObjectByRevenue.set(
      transaction.category,
      currentRevenue + transaction.amount,
    );
  });

  const result= Array.from(grouppedObjectByRevenue, ([category, revenue]) => ({
    category,
    revenue,
  }));

  return result.map(item => {
    return {
       category: item.category,
       amount: item.revenue
    }
  })
}

function repeatBuyers(transactions) {
  const iterated = new Map();
  const repeatBuyers = new Set();

  transactions.forEach((transaction) => {
    const foundIterated = iterated.get(`${transaction.buyer}`);

    if (!foundIterated) iterated.set(`${transaction.buyer}`, transaction);
    else if (foundIterated && foundIterated.id !== transaction.id)
      repeatBuyers.add(transaction.buyer);
  });

  return Array.from(repeatBuyers);
}

function topCategory(transactions) {
  return revenueByCategory(transactions).sort((a, b) => b.amount - a.amount);
}

module.exports = { topCategory,repeatBuyers,revenueByCategory,totalRevenue }