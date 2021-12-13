'use strict';

function titleClickHandler(event){
  console.log(event ,'Link was clicked!');
  event.preventDefault();
  const clickedElement=this;
  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

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

  /* get 'href' attribute from the clicked link */

let link=clickedElement.getAttribute('href');
console.log(link,'Pobrany href');
  /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle=document.querySelector(link);
    console.log(targetArticle,'Wybrany artykul to');
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}