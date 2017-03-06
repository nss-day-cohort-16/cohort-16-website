let doges = new Audio("/img/logo/who_let_the_dogs_out.mp3");
let partyFlag = false;

$(window).on('load', ()=>{
  var list;
  $('#cohort-bios').hide();

  loadItems(partyFlag);
  // Click-to-scroll for animated arrow
  $('#about-us').click(function () {
      $('html,body').animate({
          scrollTop: $(".meet-us--tiles").offset().top},
          'slow');
  });

  // Party Mode Button

// function partyModeOn(target) {
//   target.attr("disabled", true);
//   partyFlag = true;
//   loadItems(partyFlag);
//   // doges.play();
//   target.text('DISABLE PARTY MODE');
//   target.attr("disabled", false);
// }

// function partyModeOff(target) {
//   target.attr("disabled", true);
//   partyFlag = false;
//   doges.pause();
//   loadItems(partyFlag);
//   target.text('ENABLE PARTY MODE');
//   target.attr("disabled", false);
// }
  function partyMode(target){
    if (target == false){
        $('.tooltipped').tooltip('remove');
        $('#party-fab').html('')
        $('#party-fab').html(`<a id="party-on" class="btn-floating btn-large indigo accent-1 tooltipped"  data-position="top" data-delay="50" data-tooltip="Time to party?"><i class="large material-icons">cake</i>
          </a>`)
        $(".tooltipped").each(function(event) {
            console.log(event);        
            $(this).tooltip();
        });
    }
    else {
        $('.tooltipped').tooltip('remove');
        $('#party-fab').html('')
        $('#party-fab').html(`<a id="party-off" class="btn-floating btn-large pink accent-1 tooltipped"  data-position="left" data-delay="50" data-tooltip="Too much party?"><i class="large material-icons">school</i>
          </a>`)
        $(".tooltipped").each(function(event) {
            console.log(event);        
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
          <div id="card_person" class="col s10 offset-s1 col m4 offset-m1 col l3 offset-l1">
            <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator person-image" src="${pictureChoice}" alt="${person.name}">
               <span class="card-title activator">${person.name}</i></span>
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>
              <p><a href="${person.githubLink}"><i class="fa fa-github fa-lg"></i></a></p>
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
        let users = [];
        Object.keys(response).forEach( (key)=>{
          users.push(response[key]);
        });
        resolve(users[0]);
      }).fail(function(error) {
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
  }
  $(document).ready( ()=>{
    $('.card').hover(
        function() {
            $(this).find('> .card-image > img.activator').click();
        }, function() {
            $(this).find('> .card-reveal > .card-title').click();
        }
    );
    $('#party-fab').click((event) => {
      let target = $(event.target);
      if (partyFlag == false) {
        partyFlag = true;
        loadItems(partyFlag);
      } else {
        partyFlag = false;
        loadItems(partyFlag);
      }
    });
   

  });
});



function Sound(source,volume,loop){
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
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