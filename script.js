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


gsap.to(".overlay",{
    top:"-100%",
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

const mouse = document.querySelector(".mouse")
document.querySelector(".intro").addEventListener("mousemove",function(e){
  // document.querySelector(".mouse").style.top = e.y-15+"px";
  // document.querySelector(".mouse").style.left = e.x-30+"px";
  gsap.to(mouse,{
    top:e.y-45+"px",
    left:e.x-45+"px",
    transform: "scale(1)",
    display: "block"
    // duration:0.2,
  })
})
document.querySelector(".intro").addEventListener("mouseenter", function(){
  gsap.to(mouse,{
    transform: "scale(1)"
  })
})
document.querySelector(".home").addEventListener("mouseleave", function(){
  gsap.to(mouse,{
    transform: "scale(0)"
  })
})

const text = document.querySelectorAll(".about p")

text.forEach(function(e){
  var anim = e.childNodes[2]
  
  gsap.from("anim",{
    opacity:0,
    duration:1,

      scrollTrigger:{
        scroller:".main",
        trigger:".about",
        start:"top 14%",
        end:"top -10%",
        markers:true,
        scrub:2,
        pin:true,
      }
    })
})