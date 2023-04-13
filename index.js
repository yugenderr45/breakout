const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2
let lives=2
let userStart = [230, 10]
let currentPosition = userStart

let ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let score = 0


//my block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight]
  }
}

//all my blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
]

//draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'  
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
    grid.appendChild(block)
    console.log(blocks[i].bottomLeft)
  }
}
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        console.log(currentPosition[0] > 0)
        drawUser()   
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - blockWidth)) {
        currentPosition[0] += 10
        console.log(currentPosition[0])
        drawUser()   
      }
      break
  }
}
document.addEventListener('keydown', moveUser)

//draw User
function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)

//check for collisions
function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length == 0) {
        setHighScore();
        getHighScore();
        scoreDisplay.innerHTML = 'You Win!'
        alert("you are Maginificient!")
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
        myreplay()
      }
    }
  }
  // check for wall hits
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection()
  }

  //check for user collision
  if
  (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
  )
  {
    changeDirection()
  }

  //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    
   setHighScore();
   getHighScore();
    scoreDisplay.innerHTML = 'You lose! score is '+ score;
    document.removeEventListener('keydown', moveUser)
    alert("Your current score is"+score);
    alert("Score card updated.");
    myreplay()
    
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}

function myreplay() {
  var x = document.getElementById("replay");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
}


function setHighScore(){

 var data = JSON.parse(window.localStorage.getItem('u2'));
 let inputVal = document.getElementById("namePlayer").value;

 if(data==null){
  var _json = {};
  
  _json["score"] = [{"name":"sai kumar javvaji","score": 0}];
  _json["score"][0]["name"] = inputVal;
  _json["score"][0]["score"] = score;
  window.localStorage.setItem('u2', JSON.stringify(_json));
  console.log(_json);
  console.log('First time');
 }else{
  
  var _newObj = {"name": "ram kumar", "score" : 0};
  _newObj["score"] = score;
  _newObj["name"] = inputVal;
  data["score"].push(_newObj);
 
  window.localStorage.setItem('u2', JSON.stringify(data));

 }

}

function getHighScore(){
  // var jsonStr = '{"score":[{"name":"1","score":"12"},{"name":"2","score":"14"},{"name":"3","score":"15"}]}';

  // window.localStorage.setItem('user', JSON.stringify(jsonStr));
  // console.log('*****************************');
 

  var data = JSON.parse(window.localStorage.getItem('u2'));
  
  console.log(data);

 
  
  var tab=`<tr bgcolor="#5D6D7E">
  <td style="padding:8px";> <h3> player Name <h3/> </td>
  <td style="padding:8px";><h3> player Score <h3/> </td>
</tr>`;
  
  if(data!=null){
    console.log(data);

    var sc= data.score;

    sc.sort(function(a, b){
      return b.score - a.score;
    });
  
  for (let r of data.score) {

    
    
       tab += `<tr>
          <td>${r.name} </td>
          <td>${r.score}</td>

            </tr>`;
  
  }
          }
  document.getElementById("sam").innerHTML = tab;


}
getHighScore();

