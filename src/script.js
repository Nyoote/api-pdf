const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitDataPdf);

async function submitDataPdf() {
    const userDataForm = {
      titlePdf: document.getElementById('titlePdf').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      typePokemon: document.querySelector('input[name="type"]:checked').id,
      favouritePokemonGame: document.querySelector('input[name="game"]:checked').id
    };
    
    const response = await fetch(
      "http://localhost:3000/generator-form", {
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