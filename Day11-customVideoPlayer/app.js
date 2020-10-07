/* Get Our Elements */
const player = document.querySelector(".player")
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress")
const progressBar = player.querySelector(".progress__filled")
const toggle = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll("button[data-skip]")
const ranges = player.querySelectorAll(".player__slider")

function togglePlay(){
	video.paused ? video.play() : video.pause()
}

function updateButton(){
	toggle.textContent = video.paused ? "►" : "||"
}

function handleProgress(){
	const percent = (video.currentTime / video.duration * 100).toFixed(2)
 	 progressBar.style.flexBasis = `${percent}%`;
}

function handleRangeUpdate(){
	video[this.name] = this.value
}

function handleSkip(){
	video.currentTime += parseInt(this.getAttribute('data-skip'))
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay)
video.addEventListener("play", updateButton)
video.addEventListener("pause", updateButton)
toggle.addEventListener("click", togglePlay)
video.addEventListener('timeupdate', handleProgress);

ranges.forEach(range=>{
	range.addEventListener("change", handleRangeUpdate)
	range.addEventListener("mousemove", handleRangeUpdate)
})

skipButtons.forEach(skip=>{
	skip.addEventListener("click", handleSkip)
})

let mouseDown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", ()=> mouseDown = true)
progress.addEventListener("mouseup", ()=> mouseDown = false)



