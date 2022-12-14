
window.addEventListener('load', function(){
        

    const GAME_WIDTH = 640;
    const GAME_HEIGHT = 360;
    let gameIsLive = true;
    let playerScore = 0;
    let hit = 0;

    let enemies = [
        { id = enemy1
        xPos: 100,
        yPos: 100,
        width: 40,
        height: 40,
        speed: 1,
        },
        {
        xPos: 260,
        yPos: 100,
        width: 40,
        height: 40,
        speed: 2,
        },
        {
        xPos: 380,
        yPos: 100,
        width: 40,
        height: 40,
        speed: 3,
        },
        {
        xPos: 450,
        yPos: 100,
        width: 40,
        height: 40,
        speed: 3,
        },
        {
        xPos: 590,
        yPos: 200,
        width: 40,
        height: 40,
        speed: 1
        }
        
    ];

    let player = {
        xPos: 10,
        yPos: 160,
        speedX: 2,
        speedY: 2,
        width: 40,
        height: 40,
        isMoving: false
    }

    let goal = {

        xPos:580,
        yPos: 160,
        width: 50,
        height: 36
    } 

    function moveSelection(event){

        switch(event.keyCode){

            case 38:
            moveUp();
            break;
            case 40:
            moveDown();
            break;
            case 37:
            moveLeft();
            break;
            case 39:
            moveRight();
            break;
        }
    }

    function moveLeft(){

        player.xPos += player.speedX - 5;
    }
    function moveUp(){

        player.yPos += player.speedY - 5;
    }
    function moveRight(){

        player.xPos += player.speedX + 5;
    }
    function moveDown(){

        player.yPos += player.speedY + 5;
    }
    

    let movePlayer = function(){

        player.isMoving = true;
    }

    let stopPlayer = function(){

        player.isMoving = false;
    }

     
    
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    
    window.addEventListener("keydown", moveSelection, true);
    canvas.addEventListener("mousedown", movePlayer);
    /* canvas.addEventListener("mouseup", stopPlayer); */
    canvas.addEventListener("touchstart", movePlayer);
    /* canvas.addEventListener("touchend", stopPlayer); */

    let step = function()
    {
        
        
        update();
        draw();
        if(gameIsLive){

            window.requestAnimationFrame(step);   
        }
    };

    /* function checkScore(){

        //if(hit > playerScore){

            //playerScore = hit;
            document.getElementById("score").innerHTML = "moose";
       // }
    }
 */
    

    let update = function()
        {
        
        
         if(checkForCollision(player, goal)){

            gameIsLive = false;
            alert ("You win!");
            window.location = "";
        } 

        if(player.isMoving){

            player.xPos += player.speedX;
        }
        
        enemies.forEach(function(element, index)
            {
                if(checkForCollision(player, element)){
                    /* gameIsLive = false;
                    alert("Game Over!");
                    
                    window.location = ";" */
                    document.getElementById("score").innerHTML = hit;
                    hit++;
                }
                element.yPos += element.speed;
            if(element.yPos <= 10)
                {
                element.yPos = 10;
                element.speed *= -1;
                }
            else if(element.yPos >= GAME_HEIGHT - 50)
                {
                element.yPos = GAME_HEIGHT - 50;
                element.speed *= -1;
                }
            }
        )};

    let draw = function()
        {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        
        /* ctx.fillStyle = "rgb(200, 0, 100)";
        ctx.fillRect(10, 10, 30, 50); */

        ctx.drawImage(sprites.background, 0, 0);
        ctx.drawImage(sprites.player, player.xPos, player.yPos);
        ctx.drawImage(sprites.goal, goal.xPos, goal.yPos);
        
        enemies.forEach(function(element, index){

            ctx.drawImage(sprites.enemy, element.xPos, element.yPos);
        })
        
        }
        
        let checkForCollision = function(rect1, rect2){

            let closeOnWidth = Math.abs(rect1.xPos - rect2.xPos)
            <= Math.max(rect1.width, rect2.width);
            let closeOnHeight = Math.abs(rect1.yPos - rect2.yPos)
            <= Math.max(rect1.height, rect2.height);
            return closeOnHeight && closeOnWidth;
        }
    
    let sprites = {};
    
    let load = function(){

        sprites.player = new Image();
        sprites.player.src = "images/balloonBlue2.png";
        sprites.background = new Image();
        sprites.background.src = "images/wood2.png";
        sprites.enemy = new Image();
        sprites.enemy.src = "images/balloonPink2.png";
        sprites.goal = new Image();
        sprites.goal.src = "images/treasurechest.png";
    }
    
    
    load();
    step();
    });