gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// gsap.registerPlugin(ScrollToPlugin);

let bodyScrollBar;

const fields = document.querySelectorAll('.hover-field');

// function initSvgLogo(){
//     //TODO - Svg Logo Animation
// }

function initNavigation(){

    const navBtn = document.querySelector('.toggle-btn button');
    const nav = document.querySelector('.navigation');

    const mainNavLinks = gsap.utils.toArray('.navigation a');
    mainNavLinks.forEach(link => {
        link.addEventListener('mouseleave', e => {
            //add class
            link.classList.add('animate-out');
            setTimeout(() => {
                // remove class
                link.classList.remove('animate-out');
            }, 300)
        })
    })

    navBtn.addEventListener('click', function(){
        nav.classList.toggle('activated')
    })
}

function initHeroParallax(){
    const parrallaxForest = gsap.timeline({
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            scrub: true,
        }
    });

    parrallaxForest
    .to('.hero', {backgroundPosition: `50% 16%`});
}

function initHoverFlower(){
    fields.forEach(field => {
        field.imageBlock = field.querySelector('.hover-field_mask');
        
        field.addEventListener('mouseenter', createHoverFlower);
        field.addEventListener('mouseleave', createHoverFlower);
    })
}

function createHoverFlower(e){
    // console.log(e.type);

    const {imageBlock} = e.target;

    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'Power4.out'
        }
    })

    if(e.type === 'mouseenter'){
        tl.to(imageBlock, {yPercent: 100});

    }else if(e.type === 'mouseleave'){
        tl.to(imageBlock, {yPercent: 0});
    }
}

//Transfer light section & mtn pass section
function initTlTextReveal(){
    gsap.to('.tl-prologue h1',{
        duration: .5,
        opacity: 1,
        scrollTrigger: {
            trigger: '.tl-prologue',
            start: 'top center+=32%',
        }
    })

    gsap.to('.tl-prologue p', {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: true,
        scrollTrigger: {
            trigger: '.tl-prologue',
            start: 'top center+=32%',
        }
    })

    const parralaxMtn = gsap.timeline({
        ease: 'none',
        scrollTrigger: {
            trigger: '.mountain-pass',
            start: 'top top',
            scrub: true,
        }
    });

    parralaxMtn
        .to('.mountain-pass', {marginBottom: 0});
}

function initTextRevealDark(){
    gsap.to('.bcg-change_text h1',{
        duration: 2,
        opacity: 1,
        scrollTrigger: {
            trigger: '.bcg-change_text',
            start: 'top center+=32%',
        }
    })

    gsap.to('.bcg-change_text p', {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: true,
        scrollTrigger: {
            trigger: '.bcg-change_text',
            start: 'top center',
        }
    })

    const lines = document.querySelectorAll('#blue-line path');
    for(let i = 0;i < lines.length; i++){
        console.log(`Line ${i} is ${lines[i].getTotalLength()}`)
    }

    gsap.to('#blue-line path', {
        duration: 1,
        strokeDashoffset: 0,
        scrollTrigger: {
            trigger: '.bcg-change',
            start: 'top center'
        }
    })
    gsap.to('#yellow-line path', {
        duration: 1.6,
        strokeDashoffset: 0,
        scrollTrigger: {
            trigger: '.bcg-change',
            start: 'top center'
        }
    })
}

function initCircleMove(){
    gsap.utils.toArray('.circle-big').forEach(circles => {
        
        const image = circles.querySelector('img');
        gsap.to(image, {
            yPercent: -35,
            ease: 'none',
            scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                scrub: true,
            }
        })
        
    })
}

function initPinSteps(){
    ScrollTrigger.create({
        trigger: '.pinned-nav',
        start: 'top center',
        endTrigger: '#sample4',
        end: 'center center+=30%',
        pin: true,
        pinReparent: true
    })

    gsap.utils.toArray('.sample').forEach((sample, index) => {
        
        const pinLinks = gsap.utils.toArray('.pinned-nav a');

        ScrollTrigger.create({
            trigger: sample,
            start: 'top center',
            end: () => `+=${sample.clientHeight}`,
            toggleClass: {
                targets: pinLinks[index],
                className: 'active'
            },
        })
    })
}

function initScrollTo(){
    gsap.utils.toArray('.pinned-nav a').forEach(link => {

        const targetLink = link.getAttribute('href');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            // gsap.to(window, {
            //     duration: 1.5, 
            //     scrollTo: targetLink,
            //     ease: 'Power2.out'
            // })
            bodyScrollBar.scrollIntoView(document.querySelector(targetLink), {
                damping: 0.07
            })
        })
    })
}

function initSmoothScrollbar(){

    bodyScrollBar = Scrollbar.init(document.querySelector('#viewport'));

    //remove horizontal scrollbar
    bodyScrollBar.track.xAxis.element.remove();

    //keep ScrollTrigger in sync with Smoth Scrollbar
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            bodyScrollBar.scrollTop = value; // setter
          }
          return bodyScrollBar.scrollTop;    // getter
        },
      });
      
      // when the smooth scroller updates, tell ScrollTrigger to update() too: 
      bodyScrollBar.addListener(ScrollTrigger.update);

}


function init(){
    // initSvgLogo()
    initSmoothScrollbar()
    initNavigation()
    initHeroParallax()
    initTlTextReveal()
    initTextRevealDark()
    initCircleMove()
    initPinSteps()
    initScrollTo()
    initHoverFlower()
    //first page load
    handleWidthChange(mq);
}



window.addEventListener('load', function(){
    init();
})


//define a breakpoint
const mq = window.matchMedia('(max-width: 650px)');



//add change listener to this breakpoint
mq.addEventListener('change', handleWidthChange);

//mediaquery change
function handleWidthChange(mq){
    //check if it is a right breakpiont
    if(mq.matches){
        //remove event listener for each field
        fields.forEach(field => {
            field.removeEventListener('mouseenter', createHoverFlower);
            field.removeEventListener('mouseleave', createHoverFlower);
        })
        console.log('mobile')
    }else{
        initHoverFlower()
        console.log('desktop')
    }
}

