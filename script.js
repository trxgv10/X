// Sample data for the dashboard
const watchlistData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 185.43, change: 1.23, changePercent: 0.67, volume: '25.4M' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: -0.45, changePercent: -0.12, volume: '18.7M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.65, change: 2.34, changePercent: 1.67, volume: '22.1M' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 154.62, change: 0.89, changePercent: 0.58, volume: '30.2M' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.42, change: -3.21, changePercent: -1.28, volume: '45.8M' }
];

const portfolioData = [
    { symbol: 'AAPL', name: 'Apple Inc.', quantity: 25, avgCost: 165.32, currentPrice: 185.43, marketValue: 4635.75, gainLoss: 502.75 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 15, avgCost: 345.67, currentPrice: 378.85, marketValue: 5682.75, gainLoss: 497.70 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 30, avgCost: 132.45, currentPrice: 142.65, marketValue: 4279.50, gainLoss: 306.00 },
    { symbol: 'JPM', name: 'JPMorgan Chase', quantity: 40, avgCost: 145.23, currentPrice: 167.89, marketValue: 6715.60, gainLoss: 906.40 }
];

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    updateTime();
    setInterval(updateTime, 60000); // Update time every minute
});

function initializeDashboard() {
    populateWatchlist();
    populatePortfolio();
}

function populateWatchlist() {
    const tbody = document.getElementById('watchlistBody');
    tbody.innerHTML = '';

    watchlistData.forEach(stock => {
        const row = document.createElement('tr');
        const changeClass = stock.change >= 0 ? 'positive' : 'negative';
        const changeSign = stock.change >= 0 ? '+' : '';
        
        row.innerHTML = `
            <td><strong>${stock.symbol}</strong><br><small>${stock.name}</small></td>
            <td>$${stock.price.toFixed(2)}</td>
            <td class="${changeClass}">${changeSign}${stock.change.toFixed(2)}</td>
            <td class="${changeClass}">${changeSign}${stock.changePercent.toFixed(2)}%</td>
            <td>${stock.volume}</td>
        `;
        tbody.appendChild(row);
    });
}

function populatePortfolio() {
    const tbody = document.getElementById('portfolioBody');
    tbody.innerHTML = '';

    portfolioData.forEach(holding => {
        const row = document.createElement('tr');
        const gainLoss = holding.gainLoss;
        const gainLossClass = gainLoss >= 0 ? 'positive' : 'negative';
        const gainLossSign = gainLoss >= 0 ? '+' : '';
        const gainLossPercent = ((gainLoss / (holding.marketValue - gainLoss)) * 100).toFixed(2);

        row.innerHTML = `
            <td><strong>${holding.symbol}</strong></td>
            <td>${holding.name}</td>
            <td>${holding.quantity}</td>
            <td>$${holding.avgCost.toFixed(2)}</td>
            <td>$${holding.currentPrice.toFixed(2)}</td>
            <td>$${holding.marketValue.toFixed(2)}</td>
            <td class="${gainLossClass}">
                ${gainLossSign}$${gainLoss.toFixed(2)}<br>
                <small>${gainLossSign}${gainLossPercent}%</small>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Modal Functions
function showTradeModal() {
    document.getElementById('tradeModal').style.display = 'block';
}

function closeTradeModal() {
    document.getElementById('tradeModal').style.display = 'none';
    document.getElementById('tradeForm').reset();
}

function showTransferModal() {
    alert('Transfer modal would open here. This is a demo feature.');
}

function refreshData() {
    // Simulate data refresh with small random changes
    watchlistData.forEach(stock => {
        const randomChange = (Math.random() - 0.5) * 2;
        stock.change += randomChange;
        stock.price += randomChange;
        stock.changePercent = (stock.change / (stock.price - stock.change)) * 100;
    });

    portfolioData.forEach(holding => {
        const randomChange = (Math.random() - 0.5) * 5;
        holding.currentPrice += randomChange;
        holding.marketValue = holding.quantity * holding.currentPrice;
        holding.gainLoss = holding.marketValue - (holding.quantity * holding.avgCost);
    });

    populateWatchlist();
    populatePortfolio();
    
    // Show refresh confirmation
    const status = document.getElementById('marketStatus');
    status.textContent = 'Data Updated';
    status.style.backgroundColor = '#2196F3';
    
    setTimeout(() => {
        status.textContent = 'Market Open';
        status.style.backgroundColor = '#4CAF50';
    }, 2000);
}

// Form submission handler
document.getElementById('tradeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const symbol = document.getElementById('symbol').value.toUpperCase();
    const quantity = parseInt(document.getElementById('quantity').value);
    const action = document.getElementById('action').value;
    
    // Simulate trade execution
    alert(`${action.toUpperCase()} order for ${quantity} shares of ${symbol} has been submitted.`);
    closeTradeModal();
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('tradeModal');
    if (e.target === modal) {
        closeTradeModal();
    }
});
