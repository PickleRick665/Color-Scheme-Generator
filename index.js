const colorPickerInput = document.getElementById("color-picker-input")
const confirmColorBtn = document.getElementById("confirm-color-btn")
const colorSchemeMode = document.getElementById("color-scheme-mode")
const generatedColorContainer = document.getElementById("generated-colors-container")

let colorsArr = []

confirmColorBtn.addEventListener("click",function(){

    const selectedColor = colorPickerInput.value.replace('#','')
    const colorSchemeModeValue = colorSchemeMode.value

    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${colorSchemeModeValue}`)
        .then(response => response.json())
        .then(data => {
            
            for(let color of data.colors){
                colorsArr.push(color.hex.value)
            }
            
            clearStyles()
            renderColors()
        })

})

function renderColors(){
    
    let html = ""
    let style = document.createElement('style')

    for(let color of colorsArr){

        color = color.replace('#','')

        html += `
            <div class="generated-color-block">
                <div class=color_${color}></div>
                <div>#${color}</div>
            </div>
        `
        style.innerHTML += `
            .color_${color}{
                background-color: #${color};
                flex-grow: 1;
            }
        
        `
        document.querySelector('head').appendChild(style);
    }

    generatedColorContainer.innerHTML = html
    colorsArr = []
}

function clearStyles(){
    document.querySelector("style").remove()
}