export class StatsModel {
    
    timePlayed;
    stageNumber;
    score;

    constructor() {
        this.reset();
    }

    reset = () => {
        this.timePlayed = 0;
        this.stageNumber = 1;
        this.score = 0;
    }

    update = (timePlayed, stageNumber) => {
        this.timePlayed = timePlayed;
        this.stageNumber = stageNumber;
        this.score++;
    }

    get timePlayedFormatted() {
        return this._formatMillisecondsToTimestamp(this.timePlayed);
    }

    _formatMillisecondsToTimestamp = (timeMilliseconds) => {
        
        function pad(num) {
          const padDigits = 2;
          return ('00' + num).slice(-padDigits);
        }
      
        var milliseconds = timeMilliseconds % 1000;
        timeMilliseconds = (timeMilliseconds - milliseconds) / 1000;
        var seconds = timeMilliseconds % 60;
        timeMilliseconds = (timeMilliseconds - seconds) / 60;
        var minutes = timeMilliseconds % 60;
        //var hours = (timeMilliseconds - minutes) / 60;
      
        return pad(minutes) + ':' + pad(seconds) + '.' + pad(milliseconds);
      }
      

}