class Genetic{
    constructor(population){
        this.population = population;
    }

    selection(population,target){
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
}