/*Code by Shay Sapozhniov 
Student ID 3193268*/

/*Create a JS Class called Shape. */

class Shape
{
    /*The JS constructor takes no parameters but logs "Shape constructor" to the console.*/
    constructor(){
        console.log("Shape constructor")
    }
    
    

    /*It accepts one parameter which is a DOM element. It must be the object itself.*/
    /*we can assume they user did the heavy lifting for us example: document.body*/
    
    setElementToBordered(element){ /*Create a method called setElementToBordered(element)*/
        
        /*It will add the CSS class bordered to the element that is provided.*/
        element.classList.add('bordered')
        

    }

    
    

}