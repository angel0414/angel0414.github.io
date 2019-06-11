
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBy_2MIM4KYwOSHsvb_1XUTsTvg47CypIo",
    authDomain: "angel-0414.firebaseapp.com",
    databaseURL: "https://angel-0414.firebaseio.com",
    projectId: "angel-0414",
    storageBucket: "angel-0414.appspot.com",
    messagingSenderId: "772380631050",
    appId: "1:772380631050:web:2a1fa43a37bd7048"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let database = firebase.database()
let x
let y
let c
let d 
let f
let g
let h
let j
let o
let p
let direction
let direction2
let direction3
let direction4
let score;
let pig
let level
let time
let meow = document.getElementById("meow")
let scoreboard = {}




function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 100  
  y = 200 
  c = 900
  d = 200
  f = 100
  g = 400
  h = 100
  j = 200
  o = 0
  p = 70
  direction=[1,1,1]
  direction2=1
  direction3=[1,1,1]
  direction4=1
  score = 0
  c = [ 100, 300, 600 ]
  d = [ 200, 400, 600 ]
  h = [ 100, 400, 700 ]
  j = [ 200, 400, 600 ]
  pig = 0
  cow = 1
  level = 1
  s = width/905
  time = 600
  

}

function draw() {
  if (time > 0) {
  background(110, 155, 229);
  fill(247, 246, 192)
  circle(x*s, y, 60*s)
  if (keyIsDown(LEFT_ARROW)) {
      x = x - 8
      }
  if (keyIsDown(RIGHT_ARROW)) {
      x = x + 8
      }
  if (keyIsDown(DOWN_ARROW)) {
      y = y + 8
      }
  if (keyIsDown(UP_ARROW)) {
      y = y - 8
      }
  
  
  for (i=0; i<pig; i=i+1) {
    fill(249, 189, 245)
    circle(c[i]*s, d[i], 80*s)
    c[i] = c[i] + 6*direction[i]
    if ( c[i]*s > width || c[i]*s < 0) {
    direction[i] = direction[i] * -1
    }
    if (dist( x*s, y, c[i]*s, d[i]) < 60*s + 80*s) {
      score = score - 1
    }
  }
    
  
  
  
  fill(232, 104, 104)
  circle(f*s, g, 55*s)
  f = f + 6*direction2
  
  if ( f*s > width || f*s < 0) {
    direction2 = direction2 * -1
  }

  
  if (dist( x*s, y, f*s, g) < 60*s + 55*s) {
	score = score + 1
  }

  
  for (i=0; i<cow; i=i+1) {
    fill(176, 244, 205)
    square(h[i]*s, j[i], 80*s)
    j[i] = j[i] + 6*direction3[i]
    if ( j[i] > height || j[i] < 0) {
      direction3[i] = direction3[i] * -1
    }
    if (dist( x*s, y, h[i]*s, j[i]) < 60*s + 60*s) {
      score = score - 1
    }
  }
  
   fill(238, 214, 255)
  circle(o*s, p, 68*s)
  o = o + 10*direction4
  
  if ( o*s > width || o*s < 0) {
    direction4 = direction4 * -1
  }
   if (dist( x*s, y, o*s, p) < 60*s + 68*s) {
	score = score - 1
  }

  
  
  
  
  
  fill(0, 0, 0)
  textSize(30)
  text("Score: "+score, 450, 100)	
  
  
  text("Time: "+time.toFixed(1), 450, 135)
  time = time - 0.3
  
  
  
  if (score > 350 && level == 1) {
    pig = pig + 1
    level = 2
    c.push.apply(c, [300])
    d.push.apply(d, [300])
    direction.push.apply(direction, [1])
    
}
  
  if (score > 650 && level == 2) {
    pig = pig + 1
    level = 3
    c.push.apply(c, [500])
    d.push.apply(d, [500])
    direction.push.apply(direction, [1])
    
}
  
  if (score > 950 && level == 3) {
    pig = pig + 1
    level = 4
    c.push.apply(c, [700])
    d.push.apply(d, [700])
    direction.push.apply(direction, [1])
    
}
  
   if (score > 1200 && level == 4) {
    cow = cow + 1
    level = 5
    h.push.apply(h, [800])
    j.push.apply(j, [800])
    direction.push.apply(direction, [1])
    
}
  
  if (score > 1500 && level == 5) {
    cow = cow + 1
    level = 6
    h.push.apply(h, [900])
    j.push.apply(j, [900])
    direction.push.apply(direction, [1])
    
}
  

  }
  else {
    meow.innerHTML = "Name? <input id='cat'><button onclick='restart()'>Restart</button>"
noLoop()

  }
}


function restart() { 
        let cat = document.getElementById("cat")
		name = cat.value 
	    database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
		time = 600
		score = 0
        pig = 0
        cow = 1
        level = 1
        x = 100  
        y = 200 
		loop()
		meow.innerHTML = ""
        generate_leaderboard()
}
onclick=generate_alltime_leaderboard()


function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()


