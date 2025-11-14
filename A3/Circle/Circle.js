/*Code by Shay Sapozhniov 
Student ID 3193268*/

/*Create a JS Class called Circle.*/

class Circle{
     /*The JS constructor takes no parameters but logs "Circle constructor" to the console. */
    constructor()
    {
        console.log("Circle constructor");
    }
    /*Create a method called setElementsWithSelectorAsCircle(selector)*/
    setElementsWithSelectorAsCircle(selector){

        let shape = new Shape();
        /*This method finds all the elements that match that selector and adds the CSS class circle_box to those elements.*/
        let elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.classList.add('circle_box');


            /*This method also sets the element as bordered, using the setElementToBordered method.*/
            shape.setElementToBordered(element);
            



        });



        








    }





}