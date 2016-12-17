var N; 																				//total population
var I;																				//infected population
var S = N-I;																	//susceptible population
var R = 0;																		//recovered population
var Ninput, Iinput;
var CONSlider, CURSlider,TIMESlider;					//variables for sliders
var TSL = 360;																//variable for translating sliders and text boxes

function setup() {
  createCanvas(1000,600);
  background(160);
  CONSlider = createSlider(0, 100, 20);				//slider for contagiousness
  CONSlider.position(70, 85+TSL);		
  CONSlider.style('float');
  CURSlider = createSlider(0, 100, 15);				//slider for recovery frequency
  CURSlider.position(70, 125+TSL);
  CURSlider.style('float');
  
  TIMESlider = createSlider(0,365,0);					//slider for selecting a specific time
  TIMESlider.position(700,250+TSL);

	Ninput = createInput('10000');							//text box for total population
	Ninput.position(70,165+TSL);
	Iinput = createInput('1');									//text box for initial infected population
	Iinput.position(270,165+TSL);
 
}

function draw() {
	textSize(18);
	textFont("Trebuchet MS");
	
if (float(Iinput.value()) <= 0) {
	noStroke();																	//program does nothing if initial infected < 0
	textSize(22);
	fill(255,0,0);
	text("Number of infected must be positive",500,150);
	text("and cannot be greater than the total population",500,175);
	textSize(12);	
	
} else if (float(Ninput.value()) >= float(Iinput.value())) {
	SIR();																			//program starts if infected < total population
	noFill();		
	strokeWeight(0);
	fill(0);																		//slider labels
  text("Percent of infected to infect another",225,50);
  text("Percent of infected to be uninfected",225,90);
  text("Specific day",700,250);	
  text("%",575,50);
  text("%",575,90);
  
  textSize(14);
  text("Total population",70,160);						//text box labels
  text("Initial infected population",270,160);
  
  textSize(18);
  text("% susceptible",775,300);							//labels for three categories
	text("% infected",775,325);									
	text("% recovered",775,350);
	
	text("Time (days)",325,535);								//graph labels
	rotate(-HALF_PI);														
	text("Percent of total population",-450,75);
	rotate(HALF_PI);
	text("100%",45,205);
	text("0%",55,505);
	text("0",95,525);
	text("365",640,525);
	
	strokeWeight(0);
	fill(0,0,255);															//colored circles for legend
  ellipse(900,295,10,10);
  fill(255,0,0);
	ellipse(900,320,10,10);
	fill(0,255,0);
	ellipse(900,345,10,10);
	fill(160);
} else {
	noStroke();																	//program stops if initial infected > initial population
	textSize(22);
	fill(255,0,0);
	text("Number of infected must be positive",500,150);
	text("and cannot be greater than the total population",500,175);
	textSize(12);
}
}
 
function SIR() {
	
	N = Ninput.value();													//population
	I = Iinput.value();													//uninfected susceptible population
	S = N-I;
	
	push();
	reset();																		//reset variables and canvas to initial state
	
	translate(100,100);
	var CON = CONSlider.value()/100;
  var CUR = CURSlider.value()/100;
  var sArr = [];															//array for susceptible
	var iArr = [];															//array for infected
	var rArr = [];															//array for recovered

for (var time = 0;time<=365;time++) {	
	var s = S/N;																//ratio of susceptible to total
	var i = I/N;																//ratio of infected to total
	var r = R/N;																//ratio of recovered to total

	sArr.push(s);																//push values into arrays
	iArr.push(i);
	rArr.push(r);
	
	s = sArr[time] - sArr[time]*iArr[time]*CON;	//recursive functions
  i = iArr[time] + sArr[time]*iArr[time]*CON - iArr[time]*CUR;
  r = rArr[time] + iArr[time]*CUR; 

	S = s*N;																		//set consecutive values for variables
	I = i*N;
	R = r*N;
}
for (var Gtime = 0;Gtime<365;Gtime++) {				//Gtime is variable specifically used for graphing
	strokeWeight(5);
	stroke(0,0,255);														//lines connected consecutive values in array
	line(1.5*Gtime,400-300*sArr[Gtime],1.5*Gtime+1,400-300*sArr[Gtime+1]);
	stroke(255,0,0);
	line(1.5*Gtime,400-300*iArr[Gtime],1.5*Gtime+1,400-300*iArr[Gtime+1]);
	stroke(0,255,0);
	line(1.5*Gtime,400-300*rArr[Gtime],1.5*Gtime+1,400-300*rArr[Gtime+1]);
}
	pop();
	var TIM = TIMESlider.value()
	stroke(100);
	strokeWeight(5);														//line for x = specific time
	rect(1.5*TIM+99.5,200,1,300);
											
	sRnd = round(sArr[TIM]*100000)/1000;				//round array value to nearest thousandth
	iRnd = round(iArr[TIM]*100000)/1000;
	rRnd = round(rArr[TIM]*100000)/1000;
	
	noStroke(0);
	fill(0);
	text(sRnd,700,300);													//print value of s ratio at Specific day
	text(iRnd,700,325);													//print value of i ratio at Specific day
	text(rRnd,700,350);													//print value of r ratio at Specific day
	
	text(TIMESlider.value(),825,250);						//print slider values
  text(CONSlider.value(),535,50);
  text(CURSlider.value(),535,90);
}

function reset() {														//resets all variables as initial values
	clear();
	background(160);

	strokeWeight(12);														//graph boundaries
	stroke(0);
	fill(255);
	rect(100,200,365*1.5,300);									//covers canvas where graphs are

	N = Ninput.value(); 															
	I = Iinput.value();																
	I = N-S;															
	R = 0;
	time = 0;
}
