async function history(ID) {
    try {
        const response = await fetch("http://localhost:3000/history");
        const historyData = await response.json();

        const tableHistoryData = document.getElementById("table-history");
        const tableBody = document.getElementById("tbody-history");

        const headerRow = document.createElement("tr");

        for (const key in historyData[0]) {

            const headerCell = document.createElement("th");
            const headerText = document.createTextNode(key);
            headerCell.appendChild(headerText)
            headerRow.appendChild(headerCell);
        }
        const headerCellAction = document.createElement("th")
        const headerTextAction = document.createTextNode("Actions")
        headerCellAction.appendChild(headerTextAction);
        headerRow.appendChild(headerCellAction);


        tableBody.appendChild(headerRow);


        historyData.forEach((rowData) => {
            const row = document.createElement("tr");

            for (const key in rowData) {
                const cell = document.createElement("td");
                const cellText = document.createTextNode(rowData[key]);
                cell.appendChild(cellText);
                row.appendChild(cell);
    
            }
            const buttonView = document.createElement("button");
            const buttonViewText = document.createTextNode(("View pdf"));
            buttonView.appendChild(buttonViewText);
            row.appendChild(buttonView);
            tableBody.appendChild(row);

            buttonView.addEventListener('click', () => {
                viewPdf(rowData.ID);
            });
            
        });

        tableHistoryData.appendChild(tableBody);

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
      const a = document.createElement('a')
      a.href = url
      a.download = `${userDataForm.titlePdf}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
}