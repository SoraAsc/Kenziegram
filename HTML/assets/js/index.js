/* IMPORTS */
import {CriarPublicacaoHome} from './modules/createComp.js'
import {ChangeScroolVisibility} from './modules/pagesFunctions.js'

/* VARIABLES */
//const maxBusca = 7
let xmlhttp = null
let xmlDoc = null

//#region Requisitando o arquivo XML
if (window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onload = function(){
    xmlDoc = xmlhttp.responseXML;
    PopularPublicacoes(xmlDoc.getElementsByTagName('Details'))
}
xmlhttp.onerror = function() {
    alert("Ocorreu um erro ao obter o XML.")
}

xmlhttp.open("GET", "./Python/data.xml");
xmlhttp.responseType = "document";
xmlhttp.send();
//#endregion

//#region Criação da Publicação
const PopularPublicacoes = function(details){
    let numPublicacoes = document.querySelector('main article .secaoSobreUsuario .sobreUsuario__seguidores ul li a strong');
    numPublicacoes.innerHTML = details.length;

    for (let i=0;i<details.length;i++){
        let name = details[i].getElementsByTagName('title')[0].childNodes[0].nodeValue

        let link = details[i].getElementsByTagName('link')[0].childNodes[0].nodeValue
    
        let imgUrl = details[i].getElementsByTagName('img')[0].childNodes[0].nodeValue
        let likeNum = details[i].getElementsByTagName('likes')[0].childNodes[0].nodeValue
        let messageNum = details[i].getElementsByTagName('messagesNum')[0].childNodes[0].nodeValue

        CriarPublicacao(name,link,imgUrl,likeNum,messageNum)
    }
}

const CriarPublicacao = function(name,link,imgUrl,likeCont,messageCont){
    const target = document.querySelector('main article .publicacoesUsuario');
    
    target.appendChild(
        CriarPublicacaoHome(name,link,imgUrl,likeCont,messageCont)
    )
}
//#endregion


/* BUTTONS FUNCTION */

const opcoesPaginaUser = document.querySelector('.opcoesPaginaUsuario') != null ? document.querySelector('.opcoesPaginaUsuario') : document.querySelector('.opcoesPaginaUsuario_hidden');
const opcoesNotificacoes = document.querySelector('header ul li .containerNotificacoes') != null ? document.querySelector('header ul li .containerNotificacoes') : document.querySelector('header ul li .containerNotificacoes_hidden');

const ChangeDisplay = function(e){

    if (e.target!==this&&e.currentTarget.changeTo=='paginaUser')
        return;
    else if(e.currentTarget.changeTo=='paginaUser'){
        opcoesPaginaUser.className = e.currentTarget.newClass
        ChangeScroolVisibility(opcoesPaginaUser);
    }
    else{
        if(e.currentTarget.changeTo!='notificacaoEsconder') e.currentTarget.newClass = opcoesNotificacoes.className == 'containerNotificacoes' ? 'containerNotificacoes_hidden' : 'containerNotificacoes';
        opcoesNotificacoes.className = e.currentTarget.newClass
    }
}

/* BUTTONS */
opcoesPaginaUser.addEventListener("click",ChangeDisplay);
opcoesPaginaUser.newClass = 'opcoesPaginaUsuario_hidden'
opcoesPaginaUser.changeTo = 'paginaUser'

const cancelarMenuUserBtn = document.querySelector('#cancelarMenuUsuarioBtn')
cancelarMenuUserBtn.addEventListener("click",ChangeDisplay)
cancelarMenuUserBtn.newClass = 'opcoesPaginaUsuario_hidden'
cancelarMenuUserBtn.changeTo = 'paginaUser'

const abrirMenuOpcoesUsuarioBtn = document.querySelector('#transparentBackgroundButton img')
abrirMenuOpcoesUsuarioBtn.addEventListener('click',ChangeDisplay)
abrirMenuOpcoesUsuarioBtn.newClass = 'opcoesPaginaUsuario'
abrirMenuOpcoesUsuarioBtn.changeTo = 'paginaUser'

const menuPublicacoesAbrirFechar = document.querySelector('header ul li a img[src="./HTML/assets/img/notification.svg"]')
menuPublicacoesAbrirFechar.addEventListener("click",ChangeDisplay)
menuPublicacoesAbrirFechar.newClass = 'containerNotificacoes'
menuPublicacoesAbrirFechar.changeTo = 'notificacao'

const mainContent = document.querySelector('main');
mainContent.addEventListener("click",ChangeDisplay)
mainContent.newClass = 'containerNotificacoes_hidden'
mainContent.changeTo = 'notificacaoEsconder'


