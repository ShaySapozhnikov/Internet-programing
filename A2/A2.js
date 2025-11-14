// Code by Shay Sapozhniov 
// Student ID 3193268

//note to marker i've added 2 solutions to this problem

const num_items = 30; // scalabilty should be better with the 2nd solution.
let your_name = "Shay";
let original = [];
let upper = [];
let matches = {};

let starting_number = Number(prompt("Enter starting number: ")); // if using node  or nodemon just manuly put a starting number 



function toUpperPlusThree(input)
{
    const result = [];

    for (let i = 0; i < input.length; i++)
    {
        
        result.push({ 
            name: input[i].name.toUpperCase(), 
            sum: input[i].sum + 3,
            product: input[i].product + 3,
            div: input[i].product / input[i].sum
        });
    }
    
    return result;  
}

function findMatchItems(o, u) {
    let result = {
      sum_matches: [],
      product_matches: []
    };
  
    if (o.length !== u.length) return false;  //if somehow wizardry happens


    // o(n^2) The easy solution brute force approach (terrible for performance).
    // for (let i = 0 ; i < o.length ; i ++)
    // {
    //     for(let j = 0; j < u.length; j++)
    //     {
            
    //         if (o[i].sum === u[j].sum) {
    //             result.sum_matches.push({
    //                 or: o[i],     
    //                 up: u[j]       
    //             });
    //         }
            
          
    //         if (o[i].product === u[j].product) {
    //             result.product_matches.push({
    //                 or: o[i],      
    //                 up: u[j]      
    //             });
    //         }

    //     }   
    // }     
  
    
    
    // O(n) - The better solution (way better if num_items ever gets increasd to 10000 etc)
    const sumMap = new Map();
    const productMap = new Map();

    for (const item of o){ //<--- builiding the keys of the original array (just looping through objects easier then sayin let i = 0 etc etc etc)
       
        // creating the hash map step by step explination

        if(!sumMap.has(item.sum))
        {
            sumMap.set(item.sum, []); // item.sum <-- this will be the key, [empty array] 


        }
        sumMap.get(item.sum).push(item); // <--store the whole object once the key is set
        
        if (!productMap.has(item.product))  
        {
            productMap.set(item.product, []); 
        }
        productMap.get(item.product).push(item);
    }


    for (const item of u)  // <---- checking with u objects 
    {
        if (sumMap.has(item.sum)) // <-- check if the number matchs a key we set. (line 67) "hey is the value in item.sum the same as the key we set."
        {
            for (const oItem of sumMap.get(item.sum)) { // pushes all values that match the key! Gives o(n)
              result.sum_matches.push({
                or: oItem, 
                up: item
              });
            }
        }


        if (productMap.has(item.product)) { // same explination like in line 84 onwards 
            for (const oItem of productMap.get(item.product)) {
              result.product_matches.push({
                or: oItem,
                up: item
              });
            }
          }
    }
     
    return result;
}




for (let count = 1 ; count <= num_items; count++)
{
    original.push(
    {
        name: your_name,
        sum: starting_number + count,
        product: starting_number * count
    });
}


upper = toUpperPlusThree(original);

matches = findMatchItems(original, upper);



console.log('Original', original);
console.log('Upper', upper);
console.log('Matches', matches);
