'use strict';

function titleClickHandler(event){
  console.log(event ,'Link was clicked!');
  event.preventDefault();
  const clickedElement=this;
  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');// skladnia selektora jak w CSS??

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [Done]add class 'active' to the clicked link */
  console.log('clicked element',clickedElement);
  clickedElement.classList.add('active');
  /*[Done] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [Done]get 'href' attribute from the clicked link */

  const link=clickedElement.getAttribute('href');
  console.log(link,'Pobrany href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle=document.querySelector(link); // kazdy selector??
  console.log(targetArticle,'Wybrany artykul to');
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}



// Tytuly linki
const optArticleSelector = '.post', // przypisanie wszystkich elemntow klasy post??
  optTitleSelector = '.post-title', //??
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList=document.querySelector(optTitleListSelector); 
  titleList.innerHTML='';
  /* for each article */
  let html='';
  const articles=document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    /* get the article id */
    const articleId=article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#'+articleId+'"><span>'+articleTitle+'</span></a></li>';
    console.log(linkHTML);
    html=html+linkHTML;
    /* insert link into titleList */
    //const cw=titleList.insertAdjacentHTML("beforeend",linkHTML);
    console.log('HTML ='+html);
    
  }
    
    
  titleList.innerHTML=html;
  const links = document.querySelectorAll('.titles a');
  console.log('Links wynosi  '+links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}


generateTitleLinks();