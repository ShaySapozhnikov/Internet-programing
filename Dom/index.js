
var i = 0;
var txt = 'Hello world';
var speed = 100; 

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("myElement").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }

  else {
    setTimeout(() => {
      i = 0;
      document.getElementById("myElement").innerHTML = "";
      typeWriter();
    }, 1000);
  

  }
}

typeWriter()




