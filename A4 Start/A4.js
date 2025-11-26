
// Save the URL
let color_url = 'https://acs2909.lusciousorange.com/colors.php';//FILL THIS IN;


//The URL for the colors is https://acs2909.lusciousorange.com/colors.php


//passcode with a value of St2F7L!b9 

// So i need https://acs2909.lusciousorange.com/colors.php?passcode=St2F7L!b9&username=sapozhnikov-s

// pasteing the link gives {"name":"Scarlet","code":"#FD0E35"}

///reloading gives random new json cool.




window.addEventListener('DOMContentLoaded', initialize);

function initialize() 
{
    document.getElementById("color_form").addEventListener("submit" , processFormSubmi);
}

function processFormSubmi(event) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();

    const SelectedColor = document.getElementById("color_selector");

    if (SelectedColor.value == "random")
    {
        console.log("fetch data random was selected!");
        xhr.onload = function () 
        {
            const data = JSON.parse(xhr.responseText);
            console.log(data);

            if (!SelectedColor.querySelector(`option[value="${data.code}"]`)) {
                console.log("Adding new color:", data.name);

                const option = document.createElement("option");

                option.value = data.code;         
                option.textContent = data.name;     

                SelectedColor.appendChild(option);
            }


        };

        xhr.open("GET", "https://acs2909.lusciousorange.com/colors.php?passcode=St2F7L!b9&username=sapozhnikov-s");
        xhr.send();

    }


}

function processXHRLoad(xhr_load_event) 
{


}

function addColorToSelect(color_code, color_name) 
{
    const SelectedColor = document.getElementById("color_selector");
    if (!SelectedColor.querySelector(`option[value="${color_code}"]`)) {
        console.log("Adding new color:", color_name);

        const option = document.createElement("option");

        option.value = color_code;         
        option.textContent = color_name;     

        SelectedColor.appendChild(option);
    }	
    else{
        console.log("Color already exists!")
    }
}

function createNewSwatchBox(color_code, color_name) {

}
