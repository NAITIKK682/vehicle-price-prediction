// app.js
document.addEventListener('DOMContentLoaded', function() {
    // Format INR
    function formatINR(num) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
    }

    // Load makes from API
    fetch('/api/makes')
        .then(response => response.json())
        .then(makes => {
            const brandSelect = document.getElementById('brand');
            makes.forEach(make => {
                const option = document.createElement('option');
                option.value = make;
                option.textContent = make;
                brandSelect.appendChild(option);
            });
        });

    // Get Estimate button
    document.getElementById('getEstimate').addEventListener('click', async function() {
        const brand = document.getElementById('brand').value;
        const year = parseInt(document.getElementById('year').value);
        const mileage = parseFloat(document.getElementById('mileage').value);
        const condition = document.querySelector('input[name="condition"]:checked').value;

        if (!brand || !year || !mileage) {
            alert('Please fill all fields');
            return;
        }

        this.disabled = true;
        this.textContent = 'Calculating...';

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ make, year, mileage_km: mileage, condition }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Show prediction
            document.getElementById('predictedPrice').textContent = data.predicted_price_inr.toLocaleString('en-IN');
            document.getElementById('predictionResult').classList.remove('hidden');

            // Store in localStorage
            const recentPrediction = {
                brand,
                year,
                mileage,
                condition,
                price: data.predicted_price_inr,
                timestamp: new Date().toISOString()
            };

            let recentPredictions = JSON.parse(localStorage.getItem('recentPredictions')) || [];
            recentPredictions.unshift(recentPrediction);
            if (recentPredictions.length > 4) {
                recentPredictions.pop();
            }
            localStorage.setItem('recentPredictions', JSON.stringify(recentPredictions));

            // Update recent predictions table
            updateRecentPredictionsTable();

        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            this.disabled = false;
            this.textContent = 'Get Estimate';
        }
    });

    // Update recent predictions table
    function updateRecentPredictionsTable() {
        const tableBody = document.getElementById('recentPredictionsTable');
        tableBody.innerHTML = '';

        const recentPredictions = JSON.parse(localStorage.getItem('recentPredictions')) || [];

        recentPredictions.forEach(pred => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2">${pred.brand}</td>
                <td class="py-2">${pred.year}</td>
                <td class="py-2">${pred.mileage} km</td>
                <td class="py-2">${pred.condition}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Initialize recent predictions table
    updateRecentPredictionsTable();

    // Load scatter plot data
    fetch('/static/data/test_predictions.csv')
        .then(response => response.text())
        .then(csvText => {
            const lines = csvText.split('\n');
            const headers = lines[0].split(',');
            const data = [];

            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === '') continue;
                const values = lines[i].split(',');
                data.push({
                    actual: parseFloat(values[0]),
                    predicted: parseFloat(values[1])
                });
            }

            // Create scatter chart
            const ctx = document.getElementById('scatterChart').getContext('2d');
            new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Actual vs Predicted',
                        data: data.map(d => ({ x: d.actual, y: d.predicted })),
                        backgroundColor: 'rgba(0, 121, 107, 0.6)',
                        borderColor: 'rgba(0, 121, 107, 1)',
                        pointRadius: 3,
                        pointHoverRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Actual Price (₹)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Predicted Price (₹)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Actual: ₹${context.raw.x.toLocaleString()} | Predicted: ₹${context.raw.y.toLocaleString()}`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading scatter plot data:', error);
        });
});