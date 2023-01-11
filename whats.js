document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();
  
    //INGRESE UN NUMERO DE WHATSAPP VALIDO AQUI:
    const telefono = "5571991391299";
  
    const cliente = document.querySelector("#cliente").value;
    const mensagem = document.querySelector("#mensagem").value;
    const resp = document.querySelector("#respuesta");
  
    resp.classList.remove("fail");
    resp.classList.remove("send");
  
    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=
          *_MI NEGOCIO_*%0A
          *Reservas*%0A%0A
          *Qual seu nome?*%0A
          ${cliente}%0A
          *Envie sua mensagem*%0A
          ${mensagem}%0A
      `;
  
    if ( fecha === "" ) {
      resp.classList.add("fail");
      resp.innerHTML = `Escreva sua mensagem!`;
      return false;
    }
    resp.classList.remove("fail");
    resp.classList.add("send");
    resp.innerHTML = `Mensagem enviada! Te responderemos em breve`;
  
    window.open(url);
  });
  
