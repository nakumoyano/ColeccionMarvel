$(document).ready(function()
{
    $(window).scroll(function()
    {
        
        if(this.scrollY > 500)
        {
            $('.scroll-up-btn').addClass("show");
        }

        else
        {
            $('.scroll-up-btn').removeClass("show");
        } 
    });
    
    //slide-up script

    $('.scroll-up-btn').click(function()
    {
        $('html').animate({scrollTop: 0});
    }); 
});
// const privateKey = '0e3a61991d39296e0a077cc5d72cfb52017aa85d',
//     publicKey = 'eb21a48643b2901fea305523c0c44e18';

const content = document.getElementById('content');
const search = document.getElementById('search');

const atr = document.querySelector(".left");
const sig = document.querySelector(".right");

const d = document;
var bandera = 0;

const getConnection = (n) =>{
    const URL = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=eb21a48643b2901fea305523c0c44e18&hash=a0b7380879d2c74103055e0d057338f0';
    fetch(URL)/*aca hacemos la peticion*/
    .then(response => response.json())
    .then(response => {
            let cantidad = 5;
            bandera = bandera + n;
            console.log(bandera)
            if (bandera < 0) {
                 bandera = 0;
            }
             if (bandera > response.data.results.length - cantidad) {
                 bandera = response.data.results.length - cantidad;
                
             }
            console.log(bandera)
            
            eliminarElementos(); 
            for(let i = 0; i < cantidad; i++){
                drawHero(response.data.results[bandera])
                bandera++;
            }
        })
        .catch(e => console.log(e));//muestra el error cuando aparece
}

function eliminarElementos(){
    var items = Array.prototype.slice.call(document.getElementsByClassName("hero-ed-item"))
    /*lista "viva" */
    for(element of items){
        element.remove();
        console.log(element);
    }
}

const drawHero = (e) =>{
    let urlHero = e.urls[0].url;
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `
    <div class="hero-ed-item l-1-3">        
        <h3>${e.name}</h3>        
        <a href="${urlHero}" target="_blank">
            <div class="hero-img">
                <img class="thumbnail" src="${image}">
                <p class="description">${e.description}</p>
            </div> 
        </a>       
    </div>
        `;
    content.insertAdjacentHTML('beforeEnd', hero);    
}

const searchHero = name => {
    const hero = encodeURIComponent(name);
    const URL = `https://gateway.marvel.com:443/v1/public/characters?name=${hero}&ts=1&apikey=eb21a48643b2901fea305523c0c44e18&hash=a0b7380879d2c74103055e0d057338f0`;
    fetch(URL)/*aca hacemos la peticion*/
    .then(response => response.json())
    .then(response => {
        response.data.results.forEach(e => {
            drawHero(e);
        })
    })
    .catch(e => console.log(e));
};

search.addEventListener('keyup', e =>{
    if(e.keyCode === 13){
        content.innerHTML = '';
        searchHero(e.target.value.trim())/*trim apra ignorar espacios atras y adelante */
    }

}); 

getConnection(0);

atr.addEventListener("click", e => getConnection( -10));
sig.addEventListener("click", e => getConnection(0));