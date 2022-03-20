/* eslint-disable no-prototype-builtins */
'use strict';
//Ustawienia
//const optArticleSelector = '.post'; // przypisanie wszystkich elemntow klasy post??
//const optTitleSelector = '.post-title'; //??
//const optTitleListSelector = '.titles';
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  articleTag: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),
  articleAuthor: Handlebars.compile(
    document.querySelector('#template-author-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorCloudLink: Handlebars.compile(
    document.querySelector('#template-author-cloud-link').innerHTML
  ),
};
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.authors.list';
const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
};

function titleClickHandler(event) {
  console.log(event, 'Link was clicked!');
  event.preventDefault();
  const clickedElement = this;
  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active'); // skladnia - dzialanie selectora? do jakich typow mozemy uzywac

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [Done]add class 'active' to the clicked link */
  console.log('clicked element', clickedElement);
  clickedElement.classList.add('active');
  /*[Done] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [Done]get 'href' attribute from the clicked link */

  const link = clickedElement.getAttribute('href');
  console.log(link, 'Pobrany href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(link); // kazdy selector??

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log(targetArticle, 'Wybrany artykul to');
}

// Tytuly linki

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  let html = '';
  const articles = document.querySelectorAll(
    opts.articleSelector + customSelector
  );
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    //const linkHTML = `<li><a href=#${articleId}><span>${articleTitle}</span></a></li>`;
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);
    html += linkHTML;
    /* insert link into titleList */
    //const cw=titleList.insertAdjacentHTML("beforeend",linkHTML);
    console.log('HTML =' + html);
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log('Links wynosi  ' + links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
//tagsParams
function calculateTagParams(tags) {
  const params = { min: 999999, max: 0 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log('params', params);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}
//generowanie tagow
function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {}; //deklaracja obiektu zamiast tablicy
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  for (let article of articles) {
    /* START LOOP: for every article: */

    /* find tags wrapper */
    const articleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('Pobrane tagi :', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' '); //rozdzielacz elementow tablicy???
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      console.log(tag);
      /* add generated code to html variable */
      const linkHTMLData = { tag: tag };
      //const linkHTML = `<li><a href=#tag-${tag}><span>${tag}</span>  </a></li>`;
      const linkHTML = templates.articleTag(linkHTMLData);
      console.log('html tags: ', linkHTML);
      html += linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        // sprawdzanie czy tablica jest pusta?? Pierwszy element ma indeks 0?
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articleList.innerHTML = html;
  } /* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagParams(allTags);
  console.log('tagsParams', tagsParams);
  let allTagsData = { tags: [] };
  /* [NEW] create variable to generate HTMl tags link */
  let allTagsHTML = '';
  for (let tag in allTags) {
    allTagsHTML +=
      '<li><a class=' +
      calculateTagClass(allTags[tag], tagsParams) +
      '  href="#tag-' +
      tag +
      '"</a>' +
      tag +
      '</li>';
    console.log('HTML dla tagow z liczba wystpien', allTagsHTML);
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href wynosi ', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag ', tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    console.log('tag link ', tagLink);
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`); // ?? zawiera tag???
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linkstags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let linkstag of linkstags) {
    /* add tagClickHandler as event listener for that link */
    linkstag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

// authors
function generateAuthors() {
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  const authorListSel = document.querySelector(optAuthorsListSelector);

  for (let article of articles) {
    /* START LOOP: for every article: */

    /* find author wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';
    // let htmlAuthor = '';
    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('Autor :', articleAuthor);

    /* generate HTML of the link */
    /* add generated code to html variable */
    const linkHTMLData = { author: articleAuthor };
    const linkHTML = templates.articleAuthor(linkHTMLData);
    // const linkHTML = `<li><a href="#author${articleAuthor}"><span>${articleAuthor}</span></a></li>`;
    console.log('html tags: ', linkHTML);
    html += linkHTML;
    //htmlAuthor += linkHTML;
    /* END LOOP: for each article */

    /* insert HTML of all the links into the author wrapper */
    authorList.innerHTML = html;

    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    const allAuthorsData = { autors: [] };
    for (let autor in allAuthors) {
      // htmlAuthor += `<li><a href="#author${autor}"><span>${autor}  (${allAuthors[autor]})</span></li>`;

      allAuthorsData.autors.push({
        autor: autor,
        count: allAuthors[autor],
      });
    }
    authorListSel.innerHTML = templates.authorCloudLink(allAuthorsData);
  } /* END LOOP: for every article: */
  console.log('Autorzy : ', allAuthors);
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log('href wynosi ', href);
  const author = href.replace('#author', '');
  console.log('Autor: ', author);
  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
    console.log('Autor link ', authorLink);
  }
  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const linksauthors = document.querySelectorAll('a[href^="#author"]');

  /* START LOOP: for each link */
  for (let linkauthor of linksauthors) {
    /* add tauthorClickHandler as event listener for that link */
    linkauthor.addEventListener('click', authorClickHandler);
    console.log('link autor: ', linkauthor);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
