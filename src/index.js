import p5 from "p5";

const seed = ~~(fxrand() * 123456789);
let s;

const numCircles = 10; //~~(fxrand()*500) + 100;

// these are the variables you can use as inputs to your algorithms
console.log(fxhash); // the 64 chars hex number fed to your algorithm
console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }

// this code writes the values to the DOM as an example
// const container = document.createElement("div")
// container.innerText = `
//   random hash: ${fxhash}\n
//   some pseudo random values: [ ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()}, ${fxrand()},... ]\n
// `
// document.body.prepend(container)

// this code writes the values to the DOM as an example


// azul = soleado
// violeta = inestable
// rosa = lluvioso

let sketch = function (p5) {
  let evita;
  let evita_mask;
  
  p5.preload = function() {
    evita = p5.loadImage('./assets/evita.png');
    evita_mask = p5.loadImage('./assets/evita_mask.png');
  }
  // 800	Clear	clear sky	 01d
    // 801	Clouds	few clouds: 11-25%	 02d
    // 802	Clouds	scattered clouds: 25-50%	 03d
    // 803	Clouds	broken clouds: 51-84%	 04d
    // 804	Clouds	overcast clouds: 85-100%	 04d
    let weather;
    let colors = [
      // https://coolors.co/43c4f7-7499e4-a56dd0-c86ad4-eb67d7
      {id:800, color:"#43c4f7"}, 
      {id:801, color:"#7499e4"}, 
      {id:802, color:"#a56dd0"}, 
      {id:803, color:"#c86ad4"}, 
      {id:804, color:"#eb67d7"}, 
      ];
    
  p5.setup = function () {
    
    p5.noLoop();    
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Argentina&appid=165ddf08b84183fb35965ae208a73e61&units=metric"
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)
        weather = data.weather[0]?.id;
        p5.draw();
      })  
      .catch((err) => {
        console.error(err);
        weather = 800;
      });
  };

  p5.draw = function () {
    if(!weather) return;    
    let color = colors.find(color => color.id === weather);
    console.log(color)
    p5.background(color?.color);
    
    p5.imageMode(p5.CENTER);
    p5.translate(p5.windowWidth/2,p5.windowHeight/2);
    let ratio = evita.height/evita.width ;
    p5.tint(color?.color);    
    p5.image(evita, 0,0, p5.windowWidth, p5.windowWidth*ratio);
    let br = p5.color(color?.color)
    p5.tint(255, 64*2.5);    
    p5.image(evita_mask, 0,0, p5.windowWidth, p5.windowWidth*ratio);

    p5.push();
    
    p5.pop();
  };

  p5.windowResized = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.draw();
  };
};

let myp5 = new p5(sketch, window.document.body);
