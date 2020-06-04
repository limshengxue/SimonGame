const state = {
    sequence : sequenceGen(5),
    inputs : new Array(),
    difficulty : "Normal"
}
window.l = state

//Generate the sequence of color pass in the numbers of color required
function sequenceGen(length){
    const colors = ["blue","green","red","yellow"]
    const sequence = new Array()
    for(let i = 0 ; i < length;i++){
        sequence.push(colors[Math.floor(Math.random() * 4)])
    }
    return sequence
}

//Pass in the number of sounds required,play the array of audio
function animationGen(i = 0,timing){
    const sequence = state.sequence
    if(i < sequence.length){
        console.log(timing)
      const sound = new Audio(`sounds/${sequence[i]}.mp3`)
        sound.play()
        $(`#${sequence[i]}`).addClass("pressed")
        setTimeout(()=>{
        $(`#${sequence[i]}`).removeClass("pressed")
        animationGen(i+1,timing)
        },timing) 
    } 
}

//window on load 
const initialise = function(e){
     state.difficulty = $(e.target).text() 
     init(1)
}

$(".play").click(initialise)

function init(level){
    state.inputs = new Array() 
    //Disable the keydown event listener
    $(".play").unbind("click",initialise)
    //Render the title of the level
    $("h1").text(`Level ${level}`)
    $("h1").fadeIn("fast").fadeOut("fast").fadeIn("fast").fadeOut("fast").fadeIn("fast")
    //Generate the random sequence with correct numbers of elements
    state.sequence = sequenceGen(level)
    console.log(state.sequence)
    //Play the animation
    if(state.difficulty == "Easy"){
        const audio = new Audio("sounds/laugh.mp3")
        audio.play()
        setTimeout(()=>{audio.pause()},3000)
        animationGen(0,700)
    }else if(state.difficulty == "Normal"){
        animationGen(0,500)
    }else{
        animationGen(0,200)
    }
    //Set Up Mouse Event Listener
    $(".btn").click(playerInput)
}

function playerInput(e){
    //Receive player input
    const id = e.target.id
    state.inputs.push(id)
    //Play animation as player input
    const audio = new Audio(`sounds/${id}.mp3`)
    audio.play()
    $(`#${id}`).addClass("pressed")
    setTimeout(()=>{
        $(`#${id}`).removeClass("pressed")
    },300)
    //Check player input with the sequence
    const ans = state.sequence.slice(0,state.inputs.length)
    const i = id == state.sequence[state.inputs.length - 1]
    //If wrong then game over
    if(!i){
        const over = new Audio("sounds/wrong.mp3")
        over.play()
        $("body").addClass("game-over")
        $(".btn").unbind("click",playerInput)
        setTimeout(()=>{
            $("body").removeClass("game-over")
            $("h1").text("Press A key to Start")
            $(".play").click(initialise)},500)
    }else if(state.inputs.length == state.sequence.length && i){
        console.log("Test")
        $(".btn").unbind("click",playerInput)
       //If correct call init function with another level (sequence.length + 1)
       setTimeout(()=>{init(state.sequence.length + 1)},700)
    }
}

