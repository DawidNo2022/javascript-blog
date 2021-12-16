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
  
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log(targetArticle,'Wybrany artykul to');
}



// Tytuly linki 
//Ustawienia
const optArticleSelector = '.post', // przypisanie wszystkich elemntow klasy post??
  optTitleSelector = '.post-title', //??
  optTitleListSelector = '.titles',
  optArticleTagsSelector ='.post-tags .list',
  optArticleAuthorSelector ='.post-author';

function generateTitleLinks(customSelector=''){

  /* remove contents of titleList */
  const titleList=document.querySelector(optTitleListSelector); 
  titleList.innerHTML='';
  /* for each article */
  let html='';
  const articles=document.querySelectorAll(optArticleSelector + customSelector);
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

//generowanie tagow
function generateTags(){
  /* find all articles */
  const articles=document.querySelectorAll(optArticleSelector);
  for(let article of articles) {

    /* START LOOP: for every article: */
    
    /* find tags wrapper */
    const articleList=article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html='';
    /* get tags from data-tags attribute */
    const articleTags=article.getAttribute('data-tags');
    console.log('Pobrane tagi :', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');//rozdzielacz elementow tablicy???
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
    /* generate HTML of the link */
      console.log(tag);
      /* add generated code to html variable */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('html tags: ',linkHTML);
      html=html + linkHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articleList.innerHTML=html;
  }  /* END LOOP: for every article: */
}
  
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement=this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href=clickedElement.getAttribute('href');
  console.log('href wynosi ',href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag ',tag);
  /* find all tag links with class active */
  const activeTags=document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
  /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks=document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
  /* add class active */
    tagLink.classList.add('active');
    console.log('tag link ',tagLink);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
  
function addClickListenersToTags(){
  /* find all links to tags */
  const linkstags=document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let linkstag of linkstags) {
  /* add tagClickHandler as event listener for that link */
    linkstag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
  
addClickListenersToTags();

// authors
function generateAuthors(){
  /* find all articles */
  const articles=document.querySelectorAll(optArticleSelector);
  for(let article of articles) {
  
    /* START LOOP: for every article: */
      
    /* find tags wrapper */
    const authorList=article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html='';
    /* get authors from data-author attribute */
    const articleAuthor=article.getAttribute('data-author');
    console.log('Autor :', articleAuthor);
     
    /* generate HTML of the link */
    /* add generated code to html variable */
    const linkHTML = '<li><a href="#author' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
    console.log('html tags: ',linkHTML);
    html=html + linkHTML;
    /* END LOOP: for each tag */
      
    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML=html;
  }  /* END LOOP: for every article: */
  
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement=this;
  const href=clickedElement.getAttribute('href');
  console.log('href wynosi ',href);
  const author = href.replace('#author', '');
  console.log('AUtor: ',author);
  const authorLinks=document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
    console.log('Autor link ',authorLink);
  }
  generateTitleLinks('[data-author="' + author + '"]');    
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const linksauthors=document.querySelectorAll('a[href^="#author"]');
  
  /* START LOOP: for each link */
  for (let linkauthor of linksauthors) {
    /* add tauthorClickHandler as event listener for that link */
    linkauthor.addEventListener('click', authorClickHandler);
    console.log('link autor: ',linkauthor);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();



