class DNA{
    constructor(genes){
        this.genes = genes;
        this.fitness = 0;
        this.matingVal = 0;

    }

    setFitness(target){
        this.fitness = 0;
        for (let i = 0; i < this.genes.length; i++){
            if (this.genes[i] == target.charAt(i)){
                this.fitness ++;
            }
        }
    }

    mutate(rate){
        for (let i=0;i<this.genes.length;i++){
            if (random(1) < rate){
                this.genes[i] = char(Math.floor(random(32,128)))
            }
        }
    }
}