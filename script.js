$(document).ready(function(){
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
     $('.scroll-up-btn').click(function(){
         $('html').animate({scrollTop: 0});
     });

     var typed = new Typed(".typing", {
         strings:["Páginas web completas", "Modificações em sites", "Correção de bugs", "Integração de API's", "Otimizações em e-comerce"," e muito mais..."],
         typeSpeed:100,                 
         backSpeed:60,
         loop:true
     });
     var typed = new Typed(".typing-2", {
        strings:[""],
        typeSpeed:100,
        backSpeed:60,
        loop:true
    });

    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
    $('.carousel').owlCarousel({
        margin:20,
        loop:true,
        autoplayTimeOut:2000,
        autoplayHoverPauser:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:3,
                nav:false
            }
        }
    });























});

document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();
  
    //INGRESE UN NUMERO DE WHATSAPP VALIDO AQUI:
    const telefono = 5571999941690;
  
    const cliente = document.querySelector("#cliente").value;
    const mensagem = document.querySelector("#mensagem").value;
    const resp = document.querySelector("#respuesta");
  
    resp.classList.remove("fail");
    resp.classList.remove("send");
  
    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=
        Code To You!%0A
        Seu nome:%0A
          ${cliente}%0A
        Mensagem:%0A
          ${mensagem}%0A
      `;
  
    
    resp.classList.remove("fail");
    resp.classList.add("send");
    resp.innerHTML = `Mensagem enviada! Te responderemos em breve`;
  
    window.open(url);
  });
  