async function history() {
    try {
        const response = await fetch("http://localhost:3000/history");
        const historyData = await response.json();

        const tableHistoryData = document.createElement("table");
        const tableBody = document.createElement("tbody");

        const headerRow = document.createElement("tr");

        for (const key in historyData[0]) {
            const headerCell = document.createElement("th");
            const headerText = document.createTextNode(key);
            headerCell.appendChild(headerText);
            headerRow.appendChild(headerCell);
        }

        tableBody.appendChild(headerRow);

        historyData.forEach((rowData) => {
            const row = document.createElement("tr");

            for (const key in rowData) {
                const cell = document.createElement("td");
                const cellText = document.createTextNode(rowData[key]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            tableBody.appendChild(row);
        });

        tableHistoryData.appendChild(tableBody);
        document.body.appendChild(tableHistoryData);
    } catch (error) {
        console.error(error);
    }
}

history();
