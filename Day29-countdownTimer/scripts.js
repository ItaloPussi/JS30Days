let countdown;

const displayCountdown = document.querySelector(".display__time-left")
const displayEndTimeOnScreen = document.querySelector(".display__end-time")
const buttons = document.querySelectorAll(".timer__button")

buttons.forEach(button=>
	button.addEventListener("click", (e)=>{
		timer(parseInt(e.target.dataset.time))
	})
)

document.customForm.addEventListener("submit", function(e){
	e.preventDefault()
	const mins = this.minutes.value
	const seconds = parseInt(mins)*60
	this.reset()
	timer(seconds)
})

function timer(seconds){
	clearInterval(countdown)
	const now = Date.now()	
	const then = now+seconds * 1000
	displayEndTime(then)
	displayTimeLeft(seconds)
	countdown = setInterval(()=>{
		const secondsLeft = Math.round((then -Date.now()) / 1000)
		//check if we should stop it
		if(secondsLeft <0){
			clearInterval(countdown)
			return
		}
		displayTimeLeft(secondsLeft)
	},1000)
}

function addZeroToLeft(number){
	if(number < 10 && number > -10){
		return `0${number}`
	}else{
		return number
	}
}
function displayTimeLeft(seconds){
	const minutesLeft = Math.floor(seconds/60)
	const secondsLeft = seconds % 60
	displayCountdown.textContent = `${minutesLeft}:${addZeroToLeft(secondsLeft)}`
	document.title = `${minutesLeft}:${addZeroToLeft(secondsLeft)}`
}

function displayEndTime(timestamp){
	const date = new Date(timestamp)
	const end = `${date.getHours()}h${addZeroToLeft(date.getMinutes())}`
	displayEndTimeOnScreen.textContent = `You're free until ${end}`
}

