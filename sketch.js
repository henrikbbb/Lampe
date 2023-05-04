let lightswitch
let lightbulb
let remote
let colorOff, colorOn
let lightLevel
let soundOff, soundOn

function preload() {
	soundOff = loadSound('off.mp3')
	soundOn = loadSound('on.mp3')
}

function setup() {
	createCanvas(windowWidth - 5, windowHeight - 5)

	lightswitch = new Lightswitch()
	lightbulb = new Lightbulb()
	remote = new Remote()

	colorOff = color(175)
	colorOn = color(255, 255, 225)

	lightLevel = 3
}

function draw() {
	background(0)

	if (lightswitch.on) {
		noFill()
		strokeWeight(4)
		let rMax = map(lightLevel, 1, 3, 400, 1500)
		for (let r = lightbulb.r; r < rMax; r+=lightLevel*1.3) {
			let amt = map(r, lightbulb.r, rMax, 0.1, 1)
			let c = lerpColor(lightbulb.getColor(), color(0), amt)
			stroke(c)
			circle(lightbulb.x, lightbulb.y, r)
		}
	}

	lightswitch.show()
	lightbulb.show()
	remote.show()
}

function distance(x1, y1, x2, y2) {
	let dx = x1 - x2
	let dy = y1 - y2
	return sqrt(dx*dx + dy*dy)
}

function mouseClicked() {
	if (lightswitch.mouseOver()) {
		lightswitch.toggle()
		lightLevel = 3
	}

	if (remote.buttonPlus.mouseOver()) {
		if (lightLevel < 3) {
			lightLevel++
		}
	}

	if (remote.buttonMinus.mouseOver()) {
		if (lightLevel > 1) {
			lightLevel--
		}
	}
}

class Lightswitch {
	constructor() {
		this.x = width/2 - 200
		this.y = height - 150
		this.rI = 100
		this.rO = 150

		this.on = true
	}

	show() {
		strokeWeight(5)
		fill(150)
		circle(this.x, this.y, this.rO)

		strokeWeight(3)
		if (this.mouseOver() && mouseIsPressed) {
			strokeWeight(5)
		}
		fill(250)
		circle(this.x, this.y, this.rI)
	}

	toggle() {
		lightswitch.on = !lightswitch.on
		if (lightswitch.on) {
			soundOn.play()
		} else {
			soundOff.play()
		}
	}

	mouseOver() {
		return distance(mouseX, mouseY, this.x, this.y) < this.rI/2
	}
}

class Lightbulb {
	constructor() {
		this.x = width/2
		this.y = 175
		this.r = 150
	}

	show() {
		if (lightswitch.on) {
			fill(this.getColor())
		} else {
			fill(colorOff)
		}

		ellipseMode(CENTER)

		noStroke()
		circle(this.x, this.y, this.r)

		noStroke()

		fill(150)
		rect(this.x, 0, 50, this.y + 50)
		arc(this.x, this.y, this.r, this.r, 1.5*PI - 1, 1.5*PI + 1, CHORD)

		fill(50)
		rect(this.x, 0, 150, 50)
		rect(this.x, 0, 75, this.y)

		// rect(this.x, this.y -this.r/2, this.r/2, this.r/3, 10)

		// strokeWeight(10)
		// stroke(125)
		// line(this.x, 0, this.x, this.y - 110)
	}

	getColor() {
		return lerpColor(colorOff, colorOn, map(lightLevel, 0, 3, 0, 1))
	}
}

class Remote {
	constructor() {
		this.x = width/2 + 200
		this.y = height - 150
		this.w = 100
		this.h = 200

		this.buttonPlus = new ButtonPlus(this.x, this.y - this.h/4, this.w/2, this.w/2)
		this.buttonMinus = new ButtonMinus(this.x, this.y + this.h/4, this.w/2, this.w/2)
	}

	show() {
		rectMode(CENTER)

		stroke(0)
		strokeWeight(5)
		fill(250)
		rect(this.x, this.y, this.w, this.h, 10)

		this.buttonPlus.show()
		this.buttonMinus.show()

	}
}

class ButtonPlus {
	constructor(x, y, w, h) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}

	show() {
		fill(150)
		stroke(0)
		strokeWeight(3)
		if (this.mouseOver() && mouseIsPressed) {
			strokeWeight(5)
		}
		rect(this.x, this.y, this.w, this.h, 10)

		stroke(0)
		strokeWeight(5)
		line(this.x - this.w/4, this.y, this.x + this.w/4, this.y)
		line(this.x, this.y - this.h/4, this.x, this.y + this.h/4)
	}

	mouseOver() {
		return ((this.x - this.w/2 <= mouseX) && (mouseX <= this.x + this.w/2) && (this.y - this.h/2 <= mouseY) && (mouseY <= this.y + this.h/2))
	}
}

class ButtonMinus {
	constructor(x, y, w, h) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}

	show() {
		fill(150)
		stroke(0)
		strokeWeight(3)
		if (this.mouseOver() && mouseIsPressed) {
			strokeWeight(5)
		}
		rect(this.x, this.y, this.w, this.h, 10)

		stroke(0)
		strokeWeight(5)
		line(this.x - this.w/4, this.y, this.x + this.w/4, this.y)
	}

	mouseOver() {
		return ((this.x - this.w/2 <= mouseX) && (mouseX <= this.x + this.w/2) && (this.y - this.h/2 <= mouseY) && (mouseY <= this.y + this.h/2))
	}
}