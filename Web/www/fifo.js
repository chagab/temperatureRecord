class FIFO {
	constructor(numberOfPins, checkTime) {
		this._numberOfPins = numberOfPins; 
		this._checkTime = checkTime
		this._pins = {};
		for(let i = 0; i < this._numberOfPins; i++){
			this._pins[`A${i}`] = []; 
		
		}
	}

	push(pin, val){
		this._pins[`A${pin}`].push(val); 
	}

	update(){
		for(let i = 0; i < this._numberOfPins; i++){
			if(this._pins[`A${i}`].length > this._checkTime){
				this._pins[`A${i}`].shift(); 
			}
		}
	}
}


module.exports.FIFO = FIFO; 
