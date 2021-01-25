document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplay =document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const w= 4
    let squares = []
    let score = 0

    function createBoard(){
        for(let i=0 ;i< w*w;i++){
         square =document.createElement('div')
         square.innerHTML = 0
         gridDisplay.appendChild(square)
         squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()

   // generate a num.

   function generate(){
       let randomNumber = Math.floor(Math.random()*squares.length)
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML=2
            checkForGame()
        } else generate()
       
       }

    // swipe right

    function moveRight() {
        for(let i=0;i<16;i++){
            if(i%4===0){
                let totalOne =squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree =squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                //console.log(row)

                let filterRow = row.filter(num => num)
                //console.log(filterRow)
                let missing = 4-filterRow.length
                let zeros = Array(missing).fill(0)
               // console.log(zeros)
                let newRow = zeros.concat(filterRow)
                // console.log(newRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
      }
     // moveRight()

         // swipe left

    function moveLeft() {
        for(let i=0;i<16;i++){
            if(i%4===0){
                let totalOne =squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree =squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
               //console.log(row)

                let filterRow = row.filter(num => num)
                //console.log(filterRow)
                let missing = 4-filterRow.length
                let zeros = Array(missing).fill(0)
                // console.log(zeros)
                let newRow = filterRow.concat(zeros)
                // console.log(newRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
      }
       // moveLeft()

    //swipe down
    function moveDown(){
        for(let i=0;i<4;i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+w].innerHTML
            let totalThree = squares[i+(w*2)].innerHTML
            let totalFour = squares[i+(w*3)].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4- filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML=newColumn[0]
            squares[i+w].innerHTML = newColumn[1]
            squares[i+(w*2)].innerHTML = newColumn[2]
            squares[i+(w*3)].innerHTML = newColumn[3]
        
        }
    }


    //swipe up
    function moveUp(){
        for(let i=0;i<4;i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+w].innerHTML
            let totalThree = squares[i+(w*2)].innerHTML
            let totalFour = squares[i+(w*3)].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4- filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML=newColumn[0]
            squares[i+w].innerHTML = newColumn[1]
            squares[i+(w*2)].innerHTML = newColumn[2]
            squares[i+(w*3)].innerHTML = newColumn[3]
        
        }
    }


   function combineRow(){
       for(let i=0;i<15;i++){
           if(squares[i].innerHTML=== squares[i+1].innerHTML){
               let combinedTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
               squares[i].innerHTML=combinedTotal
               squares[i+1].innerHTML=0
               score += combinedTotal
               scoreDisplay.innerHTML = score 
            }
       }
       checkForWin()
   }


   function combineColumn(){
    for(let i=0;i<12;i++){
        if(squares[i].innerHTML=== squares[i+w].innerHTML){
            let combinedTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+w].innerHTML)
            squares[i].innerHTML=combinedTotal
            squares[i+w].innerHTML=0
            score += combinedTotal
            scoreDisplay.innerHTML = score
         }
    }
    checkForWin()
}






    // assign keycodes
   function control(e){
       if(e.keyCode === 39){
           keyRight()
       } else if(e.keyCode === 37){
           keyLeft()
       } else if(e.keyCode === 38){
           keyup()
       } else if(e.keyCode === 40){
           keyDown()
       }
   }
  
   document.addEventListener('keyup',control)

   function keyRight(){
       moveRight()
       combineRow()
       moveRight()
       generate()

   }


   function keyLeft(){
    moveLeft()
    combineRow()
    moveLeft()
    generate()

   }


   function keyDown(){
       moveDown()
       combineColumn()
       moveDown()
       generate()
   }

   function keyup(){
       moveUp()
       combineColumn()
       moveUp()
       generate()
   }

  // check for the number 2048 in the square to win 
  function checkForWin(){
      for(let i=0;i<squares.length;i++){
          if(squares[i].innerHTML == 2048){
              resultDisplay.innerHTML = 'you win!.'
              document.removeEventListener('keyup',control)
          }
      }
  }


   // check if there are no zeros on the board to lose
   function checkForGame(){
       let zeros =0
       for(let i=0;i<squares.length;i++){
           if(squares[i].innerHTML == 0){
               zeros++
           }
       }
       if(zeros === 0){
           resultDisplay.innerHTML = 'you lose!'
           document.removeEventListener('keyup',control)
       }
   }




})