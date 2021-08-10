function CreateComponent(className,textHtml,fatherElement='div'){
    let divGeral = document.createElement(fatherElement);

    divGeral.className = className;
    divGeral.innerHTML = textHtml;

    return divGeral;
}

export function CriarPublicacaoHome(nomeDaPublicacao,link,imgUrl,likeCont,messageCont) {
    return (
        CreateComponent('publicacaoGeral',
            HtmlPublicacaoTextHome
            (
                nomeDaPublicacao,
                link,
                imgUrl,
                likeCont,
                messageCont
            )) 
    );
} 

export function CriarPublicacaoMainPage(imgUrl,likeCont,messageCont){
    return(
        CreateComponent('feed',
        HtmlPublicacaoTextMainPage
        (
            imgUrl,
            likeCont,
            messageCont
        ))
    );
}


/* HTML Text */

const HtmlPublicacaoTextHome = function(namePublicacao,link,imgUrl,likeCont,messageCont){
    return (`
    <figure class="publicacaoComponentes">
        <img src=${imgUrl} alt=${namePublicacao} image>
        <a href=${link} target="_blank"><figcaption class="nomeDaPublicacao">${namePublicacao}</figcaption></a>
    </figure>
    <div class="detalhesSobrePublicacao">
        <figure class="detalhesSobrePublicacaoLikes">
            <img class="imagemInternaPublicacao" src="HTML/assets/img/heart.png" alt="Likes">
            <figcaption>${likeCont}</figcaption>
        </figure>                            
        <figure class="detalhesSobrePublicacaoMenssagens">
            <img class="imagemInternaPublicacao" src="HTML/assets/img/messagepublicacao.png" alt="Mensagens">
            <figcaption>${messageCont}</figcaption>
        </figure>
    </div>   
    `);
} 

const HtmlPublicacaoTextMainPage = function(imgUrl,likeCont,messageCont){
    return (
        `
        <figure>
            <img src="../img/profile.svg" alt="Usuário">
            <figcaption>Usuário</figcaption>
            <button>
                <img src="../img/menu.svg" alt="Menu Publicação">
            </button>
        </figure>

        <div class="feedConteudo">
            <img class="feedConteudoImagemPrincipal" src=${imgUrl} alt="Imagem da publicação">
            <div class="feedConteudoImagensSecundarias">
                <a href="#"> <img class="feedConteudoImagemLikes" src="../img/heart.png" alt="Imagem Likes da publicação"> </a>
                <a href="#"> <img class="feedConteudoImagemMessage" src="../img/messagepublicacao.png" alt="Imagem Mensagens da publicação"> </a>
                <a href="#"> <img class="feedConteudoImagemMarcar" src="../img/bookmark.png" alt="Imagem Bookmark da publicação"> </a>

                <p>${likeCont} likes</p>
                <p>${messageCont} comentários</p>
            </div>
            <form action="#" class="feedConteudoForm">
            <img src="../img/emote.png" alt="emote icone">
            <input type="text" required name="comentario" placeholder="Adicione um comentário...">
            <input type="submit" value="Publicar">
            </form>
        </div>
    `
    )
}