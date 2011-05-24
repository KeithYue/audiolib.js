/*
	wrapper-end.js
	Please note that this file is of invalid syntax if standalone.
*/

// Controls
audioLib.ADSREnvelope		= ADSREnvelope;
audioLib.MidiEventTracker	= MidiEventTracker;
audioLib.StepSequencer		= StepSequencer;

//Effects
audioLib.AllPassFilter	= AllPassFilter;
audioLib.Chorus		= Chorus;
audioLib.Delay		= Delay;
audioLib.Distortion	= Distortion;
audioLib.IIRFilter	= IIRFilter;
audioLib.LowPassFilter	= LowPassFilter;
audioLib.LP12Filter	= LP12Filter;


//Geneneration
audioLib.Oscillator	= Oscillator;

audioLib.version	= '0.4.1';

function EffectArray(){
	var	arr	= Array.prototype.splice.call(arguments, 0),
		proto	= arr.prototype = EffectArray.prototype;
	for (i in proto){
		if (proto.hasOwnProperty(i)){
			arr[i] = proto[i];
		}
	}
	return arr;
}

(function(proto){
	EffectArray.prototype = proto;
	proto.pushSample = function(sample){
		var	self	= this,
			mix,
			i;
		for (i=0; i<self.length; i++){
			mix	= self[i].mix;
			sample	= self[i].pushSample(sample) * mix + sample * (1 - mix);
		}
		return sample;
	};
}({}));

function EffectClass(){
}

EffectClass.prototype = {
	type:	'effect',
	sink:	true,
	source:	true,
	mix:	0.5,
	join:	function(){
		return EffectArray.apply(0, [this].concat(Array.prototype.splice.call(arguments, 0)));
	}
};

(function(names, i, effects, name, proto){
	effects = audioLib.effects = {};
	for (i=0; i<names.length; i++){
		name = names[i];
		effects[name]	= audioLib[name];
		proto		= effects[name].prototype = new EffectClass();
		proto.name	= proto.fxid = name;
	}
}(['AllPassFilter', 'Chorus', 'Delay', 'Distortion', 'IIRFilter', 'LowPassFilter', 'LP12Filter']));

audioLib.EffectArray	= EffectArray;
audioLib.EffectClass	= EffectClass;

return audioLib;
}).call(typeof exports === 'undefined' ? {} : this, this.window || global, Math);
