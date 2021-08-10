/* IMPORTS */
import { CriarPublicacaoMainPage } from "./modules/createComp.js";
import { ChangeScroolVisibility } from './modules/pagesFunctions.js'

/* VARIABLES */
//const maxBusca = 7
let xmlhttp = null;
let xmlDoc = null;

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

xmlhttp.open("GET", "../../../Python/data.xml");
xmlhttp.responseType = "document";
xmlhttp.send();
//#endregion

//#region Criação da Publicação
const PopularPublicacoes = function(details){
    for (let i=0;i<details.length;i++){
        let imgUrl = details[i].getElementsByTagName('img')[0].childNodes[0].nodeValue
        let likeNum = details[i].getElementsByTagName('likes')[0].childNodes[0].nodeValue
        let messageNum = details[i].getElementsByTagName('messagesNum')[0].childNodes[0].nodeValue

        CriarPublicacao(imgUrl,likeNum,messageNum)
    }
    /* BUTTONS */
    InserirFunçãoNosBotoesPublicacao()
}

const CriarPublicacao = function(imgUrl,likeCont,messageCont){
    const target = document.querySelector('main .container .feedContainer');
    target.appendChild(CriarPublicacaoMainPage(imgUrl,likeCont,messageCont));
}
//#endregion


/* BUTTONS FUNCTION */
function InserirFunçãoNosBotoesPublicacao() {
    document.querySelectorAll('.container .colunaEsquerda .feedContainer .feed figure button img')
    .forEach(item => {
        item.addEventListener('click',ChangeDisplay)
        item.newClass = 'opcoesPublicacao'
        item.changeTo = 'publicacao'
    });   
    let conteudoForm = document.querySelectorAll('.container .colunaEsquerda .feedContainer .feed .feedConteudo .feedConteudoForm')
    
    for(let i=0;i<conteudoForm.length;i++){
        conteudoForm[i].childNodes[3].addEventListener('input',e =>{            
            if(e.currentTarget.value != '')
                conteudoForm[i].childNodes[5].style.color = 'rgba(var(--d69,0,149,246),1)'
            else
                conteudoForm[i].childNodes[5].style.color = 'rgba(var(--d69,0,149,246),0.3)'

            //conteudoForm[i].childNodes[5].addEventListener('click', function(e){
                //e.preventDefault();
            //})
        })
    }
}

const opcoesPublicacao = document.querySelector('.opcoesPublicacao') != null ? document.querySelector('.opcoesPublicacao') : document.querySelector('.opcoesPublicacao_hidden');
const opcoesNotificacoes = document.querySelector('header ul li .containerNotificacoes') != null ? document.querySelector('header ul li .containerNotificacoes') : document.querySelector('header ul li .containerNotificacoes_hidden');

const ChangeDisplay = function(e){
    if (e.target!==this&&e.currentTarget.changeTo=='publicacao')
        return;
    else if(e.currentTarget.changeTo=='publicacao'){
        opcoesPublicacao.className = e.currentTarget.newClass
        ChangeScroolVisibility(opcoesPublicacao);
    }
    else{
        if(e.currentTarget.changeTo!='notificacaoEsconder') e.currentTarget.newClass = opcoesNotificacoes.className == 'containerNotificacoes' ? 'containerNotificacoes_hidden' : 'containerNotificacoes';
        opcoesNotificacoes.className = e.currentTarget.newClass
    }

}


/* BUTTONS */
opcoesPublicacao.addEventListener("click",ChangeDisplay);
opcoesPublicacao.newClass = 'opcoesPublicacao_hidden'
opcoesPublicacao.changeTo = 'publicacao'

const cancelarMenuPublicacaaoBtn = document.querySelector('#cancelarmenuPublicacaoBtn')
cancelarMenuPublicacaaoBtn.addEventListener("click",ChangeDisplay)
cancelarMenuPublicacaaoBtn.newClass = 'opcoesPublicacao_hidden'
cancelarMenuPublicacaaoBtn.changeTo = 'publicacao'

const menuPublicacoesAbrirFechar = document.querySelector('header ul li a img[src="../img/notification.svg"]')
menuPublicacoesAbrirFechar.addEventListener("click",ChangeDisplay)
menuPublicacoesAbrirFechar.newClass = 'containerNotificacoes'
menuPublicacoesAbrirFechar.changeTo = 'notificacao'

const mainContent = document.querySelector('main');
mainContent.addEventListener("click",ChangeDisplay)
mainContent.newClass = 'containerNotificacoes_hidden'
mainContent.changeTo = 'notificacaoEsconder'
