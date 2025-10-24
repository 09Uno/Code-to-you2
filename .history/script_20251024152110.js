$(document).ready(function(){
    // Função Sticky Navbar e Scroll-Up Button
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Animação de Scroll ao clicar no botão
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto"); 
    });

    // Efeito de Digitação (Typing Effect)
    var typedHome = new Typed(".typing", {     
        strings:["Inteligência Artificial", "Sistemas C#/.NET", "Automação", "Software Robusto"],
        typeSpeed:100,                 
        backSpeed:60,
        loop:true
    });

    // Toggle Menu/Navbar Script (para mobile)
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Inicialização do Owl Carousel para a seção de Portfólio
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 3000, 
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});