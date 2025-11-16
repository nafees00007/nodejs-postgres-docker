async function checkConnection() {
    const statusDiv = document.getElementById('status');
    const detailsDiv = document.getElementById('details');
    
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (data.status === 'success') {
            statusDiv.className = 'status-success';
            statusDiv.innerHTML = `
                <div class="success-icon">✅</div>
                <p>Connection Successful!</p>
            `;
            detailsDiv.innerHTML = `
                <strong>Status:</strong> ${data.status}<br>
                <strong>Message:</strong> ${data.message}<br>
                <strong>Database Time:</strong> ${new Date(data.timestamp).toLocaleString()}
            `;
        } else {
            throw new Error(data.message || 'Connection failed');
        }
    } catch (error) {
        statusDiv.className = 'status-error';
        statusDiv.innerHTML = `
            <div class="error-icon">❌</div>
            <p>Connection Failed</p>
        `;
        detailsDiv.innerHTML = `
            <strong>Error:</strong> ${error.message}<br>
            <strong>Tip:</strong> Check your database configuration in .env file
        `;
    }
}

// Check connection on page load
checkConnection();

// Refresh every 10 seconds
setInterval(checkConnection, 10000);

