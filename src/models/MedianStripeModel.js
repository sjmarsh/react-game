export class MedianStripeModel {

    id;
    height;
    top;

    constructor(id){
        this.id = id;
        this.sendToTop();
    }

    sendToTop() {
        this.top = 1;
        this.height = 1;
    }

    move() {
        this.top *= 1.1;
        this.height *= 1.06;
    }
}