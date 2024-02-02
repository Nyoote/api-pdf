async function pdgGenerator() {
const userInput = document.getElementById('userInput').value
    const response = await fetch(
        "http://localhost:3000/generator-pdf"
    )
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${userInput}.pdf`

    console.log('a.download', a.download)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
}


async function submitFunction(){
    const userDataForm = {
        titlePdf: document.getElementById('userInput').value,
        name: document.getElementById('name').value,
    }
    const userInput = document.getElementById('userInput').value

    console.log(userDataForm.titlePdf)
    const response = await fetch(
        "http://localhost:3000/generator-form", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userDataForm)
        }
    )
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${userInput}.pdf`
    console.log('a.download', a.download)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}