// let doges = new Audio("/img/logo/who_let_the_dogs_out.mp3");
let partyFlag = false; //Set initial settings
$('#party-logo').hide();

$(window).on('load', ()=>{
  $(".button-collapse").sideNav(); //Initializes side nav
  var list;
  $('#cohort-bios').hide();
  changeFont("Roboto"); //Initializes font
  loadItems(partyFlag); //load images

  // Click-to-scroll for animated arrow
  $('#about-us').click(function () {
      $('html,body').animate({
          scrollTop: $("#search-bios").offset().top},
          'slow');
  });

  function partyMode(target){
    
    if (target == false){
      // $('.top-content--header').toggleClass('grayscale');
      $('.top-content--header').css('background-image', "url('img/pic/16Pro.jpg')");
      $('#party-logo').hide();
      $('#main-logo').show();
      $('.tooltipped').tooltip('remove');
      $('#party-fab').html('')
      $('#party-fab').html(`<a id="party-on" class="btn-floating btn-large indigo accent-1 tooltipped"  data-position="top" data-delay="50" data-tooltip="Time to party?"><i class="large material-icons">cake</i>
        </a>`)
      $(".tooltipped").each(function(event) {
          // console.log(event);
          $(this).tooltip();
      });
    }
    else {
      // $('.top-content--header').toggleClass('grayscale');
      $('.top-content--header').css('background-image', "url('img/pic/16Party.jpg')");
      $('#main-logo').hide();
      $('#party-logo').show();
      $('#party-logo').removeClass('hidden');
      $('.tooltipped').tooltip('remove');
      $('#party-fab').html('')
      $('#party-fab').html(`<a id="party-off" class="btn-floating btn-large pink accent-1 tooltipped"  data-position="left" data-delay="50" data-tooltip="Too much party?"><i class="large material-icons">school</i>
        </a>`)
      $(".tooltipped").each(function(event) {
          // console.log(event);
          $(this).tooltip();
      });
    }
  }

  // XHR to load class info from json file
  function loadItems(partyFlag){
    getItems().then( (response)=>{
      list = response;
      partyMode(partyFlag);
      let $items = getItem(list, partyFlag);
      $('#cohort-bios').html( $items );
      $('#cohort-bios').show();
      cardHover();
    });
  }

  function getItem(items, partyFlag) {
    var list_of_people = '';
    $.each(items, (index, person)=>{
        let pictureChoice = '';
        if (partyFlag) {
          pictureChoice = person.personalityPic;
        } else {
          pictureChoice = person.professionalPic;
        }
        list_of_people += `
          <div id="card_person" class="col s10 offset-s1 col m4 offset-m1 col l3">
            <div class="card sticky-action hoverable">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator person-image" src="${pictureChoice}" alt="${person.name}">
               <span class="card-title activator">${person.name}</i></span>
            </div>
            <div class="card-action valign-wrapper center-align">
              <span class="card-title activator grey-text text-darken-4 valign"></span>
              <p class=""><a class="col s2 valign" href="${person.githubLink}"><i class="fa fa-github fa-lg"></i></a>
                <a class="col s2 valign" href="${person.portfolioLink}"><i class="fa fa-globe fa-lg"></i></a>
                <a class="col s2 valign" href="${person.linkedInLink}"><i class="fa fa-linkedin fa-lg"></i></a>
              </p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${person.name}<i class="material-icons right">close</i></span>
              <p>${person.aboutMe}</p>
            </div>
            </div>
          </div>`;
    });
    return $( list_of_people);
  }

  function getItems() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "classinfo.json",
      }).done(function(response) {
        console.log(response);
        let users = [];
        Object.keys(response).forEach( (key)=>{
          users.push(response[key]);
        });
        resolve(users[0]);
      }).fail(function(error) {
        console.log(error);
        reject(error);
      });
    });
  }

  $('#search').keypress( (event)=>{
    if (event.which == 13){
      let search = $("#search").val();
      searchBios(search);
      $("#search").val("");
    }
  });
  $('#search-button').on("click", (event)=>{
    let search = $("#search").val();
    searchBios(search);
    $("#search").val("");
  });

  function searchBios(search_query){
    var found_bios = $.grep(list, (bio, index)=> {
          name = bio.name.toLowerCase();
          aboutMe = bio.aboutMe.toLowerCase();
          search_query = search_query.toLowerCase();
          if (name.includes(search_query)){
            return bio;
          }
          if (aboutMe.includes(search_query)){
            return bio;
          }
    });
    let $items = getItem(found_bios, partyFlag);
    $('#cohort-bios').html('');
    $('#cohort-bios').html( $items );
    cardHover();
  }

  function cardHover(){
      $('.card').hover(
        function() {
            $(this).find('> .card-image > img.activator').click();
        }, function() {
            $(this).find('> .card-reveal > .card-title').click();
        }
      );
  }

  function changeFont(FontName) {
    if (FontName == 'Roboto'){
      $('html').removeClass("funfont");
      $('html').addClass("profont");
    }
    else {
      $('html').removeClass("profont");
      $('html').addClass("funfont");
    }
  }

  $(document).ready( ()=>{
    cardHover();
    $('#party-fab').click((event) => {
      let target = $(event.target);
      if (partyFlag == false) {
        partyFlag = true;
        make_it_rain();
        loadItems(partyFlag);
        changeFont("Spicy+Rice");
      } else {
        partyFlag = false;
        stop_the_madness();
        loadItems(partyFlag);
        changeFont("Roboto"); 
      }
    });
  });
});

function Sound(source,volume,loop){
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    let son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    };
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    };
}

make_it_rain = () => {
  let insertPoint = $('#stars');
  for (let i = 0; i < 80; i++){
    let rotateDeg = Math.random() * 45 + 5;
    let sizeShape = Math.random() * 20 + 5;
    let durationTime = Math.random() * 10 + 5;
    rotateDeg = rotateDeg + 'deg';
    let placeMent = Math.random() * 100;
    placeMent = placeMent + 'vw';
    let redColor = Math.floor(Math.random() * 255);
    let greenColor = Math.floor(Math.random() * 255);
    let blueColor = Math.floor(Math.random() * 255);
    let newStar = document.createElement('div');
    // newStar.innerText = "a";
    Object.assign(newStar.style, {
      'position': 'fixed',
      'left': `${placeMent}`,
      'background-color': `rgb(${redColor}, ${greenColor}, ${blueColor})`,
      'width': `${sizeShape}px`,
      'height': `${sizeShape}px`,
      '-moz-transform': `rotate(${rotateDeg})`,
      '-webkit-transform': `rotate(${rotateDeg})`,
      '-ms-transform': `rotate(${rotateDeg})`,
      '-o-transform': `rotate(${rotateDeg})`,
      'transform': `rotate(${rotateDeg})`,
      '-webkit-animation': `moveStars ${durationTime}s linear infinite`,
      '-moz-animation': `moveStars ${durationTime}s linear infinite`,
      '-o-animation': `moveStars ${durationTime}s linear infinite`
    });
    insertPoint.append(newStar);
  }
};

stop_the_madness = () => {
  $('#stars').html('');
}
