let phrase = promt("Please input a phrase")

let popSize = 150;
let population = [];

let bestPhrase;
let totalGens = 0;
let mutationRate = 0.01;
let avgFitness = 0;

let font;


function setup() {
  createCanvas(1920, 300);
  // phrase = prompt("Please enter phrase: ");
  
  for (let i=0;i<popSize;i++){
    let genes = randomString(phrase.length);
    genes = genes.split('');
    population[i] = new DNA(genes);
  }


}

function preload(){
  font = loadFont('./SpecialElite-Regular.ttf')
}



function draw() {
  background(255);
  let matingPool = selection(population,phrase);

  let bestFitness = -1;
  
  for (let dna of population){
    if (bestPhrase === phrase){
      break;
    }
    else{
      if (dna.fitness > bestFitness){
        bestPhrase = dna.genes.join('');
      }
    }
  }


  if (bestPhrase !== phrase){
    totalGens ++;

    for (let dna of population){
      avgFitness += dna.fitness;
    }

    avgFitness = avgFitness/popSize;
  }


  textSize(20);
  textFont(font);
  text("Best Phrase:",20,45);

  textSize(40);
  text(bestPhrase,20,110);

  textSize(12);
  text("total generaions: " + totalGens, 20,200)
  textSize(12);
  text("average fitness: " + avgFitness, 20,225)
  textSize(12);
  text("total population: " + popSize, 20,250)
  textSize(12);
  text("mutation rate: " + mutationRate*100 + "%", 20,275)

  text("All Phrase:",600,15)

  population = reproduce(matingPool,mutationRate);
}




function randomString(len){
  let string = '';

  for (let i = 0; i < len; i++){
    string += char(Math.floor(random(32,128)));
  }

  return(string);
}


function selection(population,target){
  let matingPool = [];
  for (let dna of population){
    dna.setFitness(target);
  }

  for (let dna of population){
    let matingVal = dna.fitness
    dna.matingVal = matingVal**2;
  }

  for (let dna of population){
    for (let i=0;i<int(dna.matingVal);i++){
      matingPool.push(dna);
    }
  }

  return(matingPool);
}

function reproduce(matingPool,mutationRate){
  newPop = [];
  for (let i=0;i<popSize;i++){

    let parent1 = matingPool[int(random(matingPool.length))];
    let parent2 = matingPool[int(random(matingPool.length))];

    let midpoint = int(random(1,parent1.genes.length-1));

    let parent1genes = parent1.genes.slice(0,midpoint)
    let parent2genes = parent2.genes.slice(midpoint,parent2.genes.length)
  
    let childGenes = Array.prototype.concat(parent1genes,parent2genes);
    let child = new DNA(childGenes);

    child.mutate(mutationRate);

    newPop[i] = child;
  }

  return(newPop);
}