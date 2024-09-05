gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var tl = gsap.timeline();

tl.from("header",{
  opacity:0,
  y:-50,
  duration:0.5,
  delay:0.3
})

tl.from("nav",{
  y:-50,
  opacity:0,
  duration:0.3,
  delay:0.3
})

tl.from(".intro h2",{
  opacity:0,
  y:100,
  duration:0.3,
  // duration:1,
  stagger:0.2
})

tl.from(".intro h1",{
  opacity:0,
  y:100,
  duration:0.5,
  // duration:1,
  stagger:0.2
})

tl.from(".intro span",{
  opacity:0,
  duration:0.5,
})

tl.from(".image",{
  x:100,
  opacity:0,
  duration:0.2,
})

gsap.to(".overlay",{
    top:"-100%",
    opacity:1,
    scrollTrigger:{
        scroller:".main",
        trigger:".page2",
        start:"top 100%",
        end:"top 0%",
        // markers:true,
        scrub:2,
        // pin:true,
    }
})
gsap.from(".page2",{
  opacity:0,
  scale:0,
  scrollTrigger:{
      scroller:".main",
      trigger:".page2",
      start:"top 52%",
      end:"top -20%",
      // markers:true,
      scrub:2,
      pin:true,
  }
})

const mouse = document.querySelector(".mouse")
const image = document.querySelector(".mouse img")
document.querySelector(".intro").addEventListener("mousemove",function(e){
  gsap.to(mouse,{
    top:e.y-55+"px",
    left:e.x-55+"px",
    transform: "scale(1)",
    display: "block",
    mixBlendMode:"difference"
    // duration:0.2,
  })
})
document.querySelector(".intro").addEventListener("mouseenter", function(){
  gsap.to(mouse,{
    backgroundImage:"hidden",
    transform: "scale(1)",
    duration:0.3
  })
})
document.querySelector(".home").addEventListener("mouseleave", function(){
  gsap.to(mouse,{
    transform: "scale(0)",
    backgroundImage:"inatial",


  })
})

const app = document.querySelector(".section")

app.addEventListener("mousemove",function(e){
    gsap.to(mouse,{
      top:e.y-55+"px",
      left:e.x-55+"px",
      transform: "scale(1)",
      display: "block",
      // duration:0.2,
    })
  })
  app.addEventListener("mouseenter", function(){
    gsap.to(mouse,{
      transform: "scale(1)",
    })
  })
app.addEventListener("mouseleave", function(){
    gsap.to(mouse,{
      transform: "scale(0)",
    })
  })
  
  const text = document.querySelectorAll(".about p")
  
text.forEach(function(e){
  var anim = e.childNodes[2]
  
  gsap.from(e,{
    y:50,
    opacity:0,
      scrollTrigger:{
        scroller:".main",
        trigger:".about",
        start:"top 10%",
        end:"top 0%",
        // markers:true,
        scrub:1,
        // pin:true,
      }
    })
})

const front = document.querySelector("#front")
const frontend = document.querySelector(".frontend")
const back = document.querySelector("#back")
const backend = document.querySelector(".backend")

back.addEventListener("click", function(){
  backend.style.display="block";
  frontend.style.display = "none";
  front.style.borderBottom = "0px solid #159f00";
  front.style.fontWeight = '100';
  back.style.fontWeight = '400';
  back.style.borderBottom = "2px solid #159f00";
})

front.addEventListener("click", function(){
  frontend.style.display="block";
  backend.style.display = "none";
  front.style.borderBottom = "2px solid #159f00";
  front.style.fontWeight = '400';
  back.style.fontWeight = '100';
  back.style.borderBottom = "0px solid #159f00";
})

// const contact = document.querySelector(".contact");
// contact.addEventListener("mousemove",function(e){
//   gsap.to(mouse,{
//     top:e.y-55+"px",
//     left:e.x-55+"px",
//     transform: "scale(1)",
//     display: "block",
//     // duration:0.2,
//   })
// })
// contact.addEventListener("mouseenter", function(){
//   gsap.to(mouse,{
//     transform: "scale(1)",
//   })
// })
// contact.addEventListener("mouseleave", function(){
//   gsap.to(mouse,{
//     transform: "scale(0)",
//   })
// })