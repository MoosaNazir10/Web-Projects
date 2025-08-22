let items = [];

const userInfo = JSON.parse(localStorage.getItem('itemName')) || {};
    const calorieLog = JSON.parse(localStorage.getItem('itemWeight')) || [];
    const workoutLog = JSON.parse(localStorage.getItem('itemValue')) || [];

function addItem() {
    const name = document.getElementById('itemName').value;
    const weight = parseInt(document.getElementById('itemWeight').value);
    const value = parseInt(document.getElementById('itemValue').value);

    if (name.length && weight > 0 && value > 0) {
        items.push({ name, weight, value });
        document.getElementById('itemName').value = '';
        document.getElementById('itemWeight').value = '';
        document.getElementById('itemValue').value = '';
        displayItems();
    } else {
        alert('Please enter valid item details.');
    }
}

function displayItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        itemList.innerHTML += `<li>${item.name} - Weight: ${item.weight}, Value: ${item.value}</li>`;
    });
}

function calculateOptimalCargo() {
    const capacity = parseInt(document.getElementById('truckCapacity').value);
    if (capacity <= 0) {
        alert('Please enter a valid truck capacity.');
        return;
    }

    const result = knapsack(capacity, items);
    displayResult(result);
}




function knapsack(capacity, items) {
    const n = items.length;
    const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (items[i - 1].weight <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - items[i - 1].weight] + items[i - 1].value);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

                                          //  items to include in the OS
    let w = capacity;
    const selectedItems = [];
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            w -= items[i - 1].weight;
        }
    }

    return selectedItems;
}

function displayResult(selectedItems) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.color= '#FFFFFF';

    if (selectedItems.length === 0) {
        resultDiv.innerHTML = 'No items can be packed within the given capacity.';
        return;
    }

    let totalValue = 0;
    let totalWeight = 0;
    const resultList = document.createElement('ul');

    selectedItems.forEach(item => {
        totalValue += item.value;
        totalWeight += item.weight;
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Weight: ${item.weight}, Value: ${item.value}`;
        resultList.appendChild(listItem);
    });

    resultDiv.appendChild(resultList);
    resultDiv.innerHTML += `<p>Total Weight: ${totalWeight}</p>`;
    resultDiv.innerHTML += `<p>Total Value: ${totalValue}</p>`;
}

function reset() {
    // Clear input fields
    document.getElementById('itemName').value = '';
    document.getElementById('itemWeight').value = '';
    document.getElementById('itemValue').value = '';
    document.getElementById('truckCapacity').value = '';
    
    // Clear items array
    items = [];
    
    // Clear item list display
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    
    // Clear result display
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}