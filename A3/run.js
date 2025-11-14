
/*Code by Shay Sapozhniov 
Student ID 3193268*/


//NOTE!

/*This is where you will put your calls to instantiate your classes
 and other necessary code, as directed. In this document, 
 there are several directions to add code to this file. 
The changes MUST happen in the order provided, 
otherwise it will not produce a correct answer. */



/*In run.js, instantiate a new instance of Circle and use it to set all the elements with CSS class type_a to be circles. */

let circle = new Circle();


circle.setElementsWithSelectorAsCircle('.type_a');


/*In run.js, instantiate a new instance of Color and use it to set 
the set type_b in row_1 and the type_a in row_2, to both be colored with #BB1122. */

let color = new Color('#BB1122');


let typeB = document.querySelector('#row_1 .type_b');
let typeA = document.querySelector('#row_2 .type_a');

color.changeElementBackgroundColor(typeA);

color.changeElementBackgroundColor(typeB);




let newElementColor = new Color('#009900'); /*#009900 which must be applied using your Color JS class*/

let boxes = document.querySelectorAll('.box_row');

//  console.log(boxes[2]); test

/*You are going to add one element to each of the three rows, to make them have 4 items, so it's a grid of 12 items. */
/*n run.js, create the new instance of Color, create the three elements and add them to the appropriate location in the DOM*/

for (let i = 0; i < boxes.length; i ++){
    let div = document.createElement('div'); /*Each item must be a div*/
    div.classList.add('new_item'); /*Each item must have the CSS class new_item*/
    newElementColor.changeElementBackgroundColor(div); /*Each item must have a background color*/
    

    switch(i)
    {
        
        case 0:
            boxes[i].append(div) /*For row_1, the new item must be the last one in the row*/
            break
        
        case 1: /*For row_2, the new item must be the first one in the row*/
            boxes[i].prepend(div) 
            break
        case 2: /*For row_3, the new item must be the third one in the row, after the type_a*/
            let typeB = boxes[i].querySelector('.type_b');
            boxes[i].insertBefore(div, typeB)
            break

    }
}



/* wanted a better solution then a nested for loop 
and i already thought css already had child nested selction so i added the sourse here how i got the loop idea.

https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator

*/


let childElements = document.querySelectorAll('.box_row > div');

//console.log(childElements); debug



for (let i = 0; i < childElements.length; i++) {
    childElements[i].innerHTML = i + 1;
}




