

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


function engageVideoScroll(){
    const videoScroll = document.querySelector('.video-scroll');
    const video = videoScroll.querySelector('video');
    const videoTxt = videoScroll.querySelector('h1');
    let result = videoScroll.clientHeight;
    console.log(`heigth is - ${result}`);
    //ScrollMagic
    const controller = new ScrollMagic.Controller();

    //Scenes
    let scene = new ScrollMagic.Scene({
        duration: 12000,
        triggerElement: videoScroll,
        triggerHook: 0,
    })
    // .addIndicators()
    .setPin(videoScroll)
    .addTo(controller);

    //Video Animation
    let accelamount = 1;
    let scrollpos = 0;
    let delay = 0;

    scene.on('update', e => {
        scrollpos = e.scrollPos / 1000;
    });

    setInterval(() => {
        delay += (scrollpos - delay) * accelamount;

        video.currentTime = scrollpos;
    }, 40);
}

function engagePinSteps(){

    

    const getVh = () => {
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return vh;
    }

    let video = document.querySelector('.video-scroll');

    const getVideoVh = () =>{
        const vVh = video.clientHeight;
        return vVh; 
    }
    
    console.log(getVideoVh());
    
    gsap.utils.toArray('.video-scroll-text').forEach(section => {
        gsap.to(section,{
            yPercent: -100,
            ease: 'none',
            scrollTrigger:{
                trigger: section,
                pin: true,
                scrub: true,
                start: 'top top',
                end: () => `+=${section.clientHeight + getVh()}`,
                endTrigger: '.vst4',
                invalidateOnRefresh: true,
                markers: true
            }
        })
    }) 

}

function engageHorizontalScroll(){
    let horizontal = document.querySelector('.horizontal')
    let slides = gsap.utils.toArray('.horizontal-slide');

    gsap.to(slides, {
        // xPercent: -100 * (slides.length - 1),
        x: () => -(horizontal.scrollWidth - document.documentElement.clientWidth) + "px",
        ease: 'none',
        scrollTrigger: {
            trigger: '.horizontal',
            pin: true,
            scrub: 1,
            snap: 1 / (slides.length - 1),
            end: () => "+=" + horizontal.offsetWidth,
            invalidateOnRefresh: true,
            endTrigger: '.hs3',
            // markers: true
        }
    })
}
/////////////



////////////
window.addEventListener('scroll', function(){
    console.log(scrollY);
})

function engage(){
    engageVideoScroll()
    engagePinSteps()
    engageHorizontalScroll()
}

window.addEventListener('load', function(){
    engage();
})