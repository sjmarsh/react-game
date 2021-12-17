import { MedianStripeModel } from "./MedianStripeModel";

export class MedianStripManager {

    TOTAL_STRIPES = 80;
    BOTTOM_OF_ROAD = 330;
    
    constructor() {
        this.reset();
    }

    reset() {
        this.medianStripes = [];
        this._medianCounter = 0;
        this._stripeCounter = 0;

        for(let i = 0; i < this.TOTAL_STRIPES; i++){
            this.animate();
        }
    }

    animate() {
        if ((!this.medianStripes && this.medianStripes.length === 0) || this._medianCounter > 2)
        {
            this.medianStripes = [...this.medianStripes, new MedianStripeModel(this._stripeCounter)];
            this._medianCounter = 0;
            this._stripeCounter++;
        }

        for (let stripe of this.medianStripes)
        {
            stripe.move();
        }

        var bottomStripeIndex = this.medianStripes.findIndex(m => m.top > this.BOTTOM_OF_ROAD);
        if (bottomStripeIndex > -1)
        {
            this.medianStripes = this.medianStripes.filter((_, i) => i !== bottomStripeIndex);            
        }
        else {
            this._medianCounter++;
        }        
    }
}