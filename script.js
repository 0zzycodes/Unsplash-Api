let query = $('#query');
let searchButton = $('#searchButton');
const form = $('form');
const loader = document.querySelector('.loader');
// Photos Data
let altDescription, id, links, urls, user;

// Would append the child elements with images onto this element.
let resultPage = $('.results');

// Hiding the results page at first then show it when the search is initiated
resultPage.hide();

let ApiKey = 'YourAPIKEY';

form.on('submit', e => {
  e.preventDefault();
  if (query.val() !== ' ') {
    fetch(
      `https://api.unsplash.com/search/photos?query=${query.val()}&page=1&client_id=${ApiKey}`
    )
      .then(Response => {
        console.log(Response);
      loader.style.display = "block";
        return Response.json();
            })
      .then(data => {
        $(resultPage).empty();

        let resultArray = data.results;
        resultPage.show(400);
        resultArray.map((item, index) => {
          altDescription = item.alt_description;
          id = item.id;
          links = item.links;
          urls = item.urls;
          user = item.user.name;
          // console.log(item.user.profile_image.medium)
          $(`<div id="individualImg" class="resultTemplate">
                <img id="paraImg" src=${urls.regular} alt="">
                <h1 id="para">${altDescription}</h1>
                <p id="para"><a id="userId">By: ${user}<span class="photgraphers"></span></a></p>
                <div style="display: none">
                <img src= ${item.user.profile_image.medium} >
                <h6>${item.user.total_likes}</h6>
                </div>
              </div>`).appendTo(resultPage);
        });loader.style.display = "none";
      
      });
  }
});

$('body').on('click', e => {
  if (
    $(e.target).attr('id') === 'paraImg' ||
    $(e.target).attr('id') === 'userId' ||
    $(e.target).attr('id') === 'para'
  ) {
    // console.log($( $($(e.target).parent().children()[3]).children()[0]).attr("src")) ;

    $(resultPage).css('opacity', '0.2');
    $('.imgShowCase').show(300);

    $('.imgShowCase').empty();
    $(`
    <div class="img" style="background: url(${$(
      $(e.target)
        .parent()
        .children()[0]
    ).attr('src')}); background-size: cover; background-position: center">
        
      </div>

      <div class="imgInfo">
      <img src=${$(
        $(
          $(e.target)
            .parent()
            .children()[3]
        ).children()[0]
      ).attr('src')} alt=""> 
        <h4>${$(
          $(e.target)
            .parent()
            .children()[2]
        ).text()}</h4>
        <h3>${$(
          $(e.target)
            .parent()
            .children()[1]
        )
          .text()
          .toUpperCase()} </h3>
        <p>Total Likes: <span id="totalLikes">${$(
          $(
            $(e.target)
              .parent()
              .children()[3]
          ).children()[1]
        ).text()}</span></p>

        <b id="cancelShowcase" >X</b>
      </div>
    `).appendTo($('.imgShowCase'));

    $('#cancelShowcase').on('click', () => {
      $('.imgShowCase').hide(300);
      $(resultPage).css('opacity', 1);
    });
  }
});
