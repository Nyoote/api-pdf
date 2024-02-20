async function history(ID) {
    try {
        const response = await fetch("http://localhost:3000/history");
        const historyData = await response.json();

        const tableHistoryData = document.getElementById("table-history");
        const tableBody = document.getElementById("tbody-history");

        if (historyData.length > 0) {
            const headerRow = document.createElement("tr");

            const headerCellNumber = document.createElement("th");
            const headerTextID = document.createTextNode("ID");
            headerCellNumber.appendChild(headerTextID);
            headerRow.appendChild(headerCellNumber);

            for (const key in historyData[0]) {
                if (key !== "ID") {
                    const headerCell = document.createElement("th");
                    const headerText = document.createTextNode(key);
                    headerCell.appendChild(headerText);
                    headerRow.appendChild(headerCell);
                }
            }
            const headerCellAction = document.createElement("th")
            const headerTextAction = document.createTextNode("Actions")
            headerCellAction.appendChild(headerTextAction);
            headerRow.appendChild(headerCellAction);


            tableBody.appendChild(headerRow);
            let counter = 1;

            historyData.forEach((rowData) => {
                const row = document.createElement("tr");

                const cellNumber = document.createElement("td");
                const cellTextID = document.createTextNode(counter);
                cellNumber.appendChild(cellTextID);
                row.appendChild(cellNumber);

                for (const key in rowData) {
                    if (key !== "ID") {
                        const cell = document.createElement("td");
                        const cellText = document.createTextNode(rowData[key]);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                }
                const buttonView = document.createElement("button");
                const buttonViewText = document.createTextNode(("View pdf"));
                buttonView.appendChild(buttonViewText);
                row.appendChild(buttonView);

                const buttonDelete = document.createElement("button");
                const buttonDeleteText = document.createTextNode(("Delete pdf"));
                buttonDelete.appendChild(buttonDeleteText);
                row.appendChild(buttonDelete);

                tableBody.appendChild(row);

                buttonView.addEventListener('click', () => {
                    viewPdf(rowData.ID);
                });

                buttonDelete.addEventListener('click', () => {
                    deletePdf(rowData.ID);
                });
                
                counter++;
            });

            tableHistoryData.appendChild(tableBody);
        } else {
            const noDataMessage = document.createElement("p");
            const messageText = document.createTextNode("No history data available");
            noDataMessage.appendChild(messageText);
            tableHistoryData.appendChild(noDataMessage);
        }

        const containerHistory = document.querySelector(".container-history");
        containerHistory.appendChild(tableHistoryData);
    } catch (error) {
        console.error(error);
    }
}

history();


async function viewPdf (ID) {
    const requestPdf = await fetch(
        "http://localhost:3000/view-pdf", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ ID })
        }
    );
    const useablePdf = await requestPdf.json();

    const userDataForm = {
        titlePdf: useablePdf[0].TITLE_PDF,
        firstName: useablePdf[0].FIRSTNAME_USER,
        lastName: useablePdf[0].LASTNAME_USER,
        typePokemon: useablePdf[0].TYPE_POKEMON_USER,
        favouritePokemonGame: useablePdf[0].GAME_POKEMON_USER
      };
      
      const response = await fetch(
        "http://localhost:3000/regenerate-pdf", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(userDataForm)
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob)
      window.open(url);
}

async function deletePdf (ID) {
    const requestPdf = await fetch(
        "http://localhost:3000/delete-pdf", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ ID })
        }
    );
    if (requestPdf.status === 200) {
        location.reload()
    }

}