/*Code by Shay Sapozhniov 
Student ID 3193268*/


/*Create a JS Class called Color.*/

class Color{
    /*The JS constructor takes one parameter, which is a hex color string, including the # at the front.*/
    constructor(hex_color){
        this.hex = hex_color;
    }



    /*Create a method called changeElementBackgroundColor(element)*/
    

    /*The method will modify the style property for backgroundColor in JS to
     give the element the background color matching the value that was provided in the constructor. */
    changeElementBackgroundColor(element)
    {
        element.style.backgroundColor = this.hex;

    }



}