$(document).ready(function () {

  // Click-to-scroll for animated arrow
  $('#about-us').click(function () {
      $('html,body').animate({
          scrollTop: $(".meet-us--tiles").offset().top},
          'slow');
  });

function checkWhitespace(name) {
  var counter = 0;
  var name = name.split('');
  name.forEach(function(char){
    if (char === " ") {
    counter = counter + 1;
    }
  })
  return counter;
}
  // XHR to load class info from json file
  function getClassFromJson() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "classinfo.json",
      }).done(function(response) {
        resolve(response);
      }).fail(function(error) {
        reject(error);
      })
    });
  }

  // Load the class info, load the DOM with cards
  function loadPage() {
    getClassFromJson()
    .then(function (response) {
      var propertyName = Object.keys(response)[0];
      var infoArr = response[propertyName];
      var cardString = generateCards(infoArr);

      attachCardsToDOM(cardString);
      // Auto-fix the bio div size
      shrinkPersonBioDiv();
      // Also resize them if the size of the browser changes
      window.addEventListener('resize', shrinkPersonBioDiv, true);
    });
  }

  function shrinkPersonBioDiv() {
    // This will literally wait until the first image is loaded.
    // Guys, this is crazy.
    // Javascript 😍
    var img = new Image();
    var firstImage = document.querySelector('.person-image');

    img.onload = function(){
      var allPersonBios = document.querySelectorAll('.person-bio');
      var firstImage = document.querySelector('.person-image');
      var imageWidth = firstImage.offsetWidth;
      var marginValue = firstImage.offsetLeft;
      allPersonBios.forEach(function (bio) {
        bio.style.width = imageWidth + 'px';
        bio.style.margin = '0 ' + marginValue + 'px';
      });
    }

    img.src = firstImage.src;
  }

  function generateCards(peopleArr) {
    let cohort = "";
    $.each(peopleArr, (index, person)=>{
      cohort += 
      `<div>
        <div class="card col s6 col m4 col l3">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator person-image" src="${person.professionalPic}" alt="${person.name}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${person.name}<i class="material-icons right">more_vert</i></span>
            <p><a href="${person.githubLink}"><i class="fa-github"></i></a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${person.name}<i class="material-icons right">close</i></span>
            <p class="person-bio">${person.aboutMe}</p>
          </div>
        </div>
      </div>`
    });
    console.log(cohort);
    return cohort
  }

  function attachCardsToDOM(cardString) {
    document.getElementById('meet-us--row').innerHTML = cardString;
  }

  loadPage();
});

var guy = [
  "                                               `                  `",
  "                                                   `              `   `",
  "                                              ``.```    . ``      `  `. `",
  "                                              ``````` ` ` `   ` . .  ``",
  "                                              ```. `.```.   ... ``..```` `",
  "                                      `  `   `` .`.`` ..`.``....`.`.`....` .",
  "                                      ` ..`  `. ..``.`....``....```.....``` `",
  "                                `    `.  ``.``.`.````.`.```...`.....``...````",
  "                                    ` .  ...`,..`..```...``.````. `.```.`` .`",
  "                                 .`  .````....`.````````````````````.````` ``",
  "                                . .` ``.`.`.``````````````````.``````````  `   `",
  "                               `.`` .```..`.````````````````````````````` `````",
  "                                `.` ...```.`````````````````````````````.``.`...",
  "                             ` ``..``````````````````````````````````````.`.``.`   `",
  "                              ``````.`````````````````````````````````` ``..```  `.",
  "                               ``..``````````````` .````````````````````.`..``` . `",
  "                         .`  `` .`.``.```.``````````.```````````````````.``...`.  `",
  "                          .``` .`.```````````````````````````````````````````.`. ``",
  "                         ` ```` ....````````````..````` ```````````````````````.`.  `",
  "                         ` ````..``````` ```````.`````` ````````` `````````..`..`.",
  "                        . ` `.  ``.```````````````````` ```.````` `````.```.``..`. .",
  "                         ` ``` `````` ``````````.``````````.````````.``.```.``..`.```",
  "                        `` ``.   ````````` ``````````````..`````````.```. `````.`..``",
  "                       `````.` ` ``````````.` ` ````````````````.` `.``.`````````. `.",
  "                       `   `.`  `````` ````.```````````````.`.```````````````````.``.`",
  "                     ```   `.````````` ``` ``````````````````````````````````````...``",
  "                      ```    `.`````` `````````.``````.````.``````````````````````.``.",
  "                      `.` `.`  ````````````.````````.`````````````````````` ````````.`",
  "                       ` ` ```   ``` ```  `.``````````.```.`..``..``.``````  `````.`..",
  "                        ``````. `````` `` ``````.``.``.`````..``````.````.`` ``````... `",
  "                        ```````..```````` ````.`.```````````..````````.```````````..``",
  "                        `.````` ` ````` `  `````.``.``````....``````.`.`..````````.```..",
  "                        `````.````  ``` ``  ````````.````.``..`.` ````.`.``.`````````.``",
  "                     ` `` `.`.`` `     ` ` ```.`````````````.``.``.`.`...``....``````.` `",
  "                       ``..```````` ` `. ``````...`````````````.`.`.`.....,,....````..`",
  "                      `.`,``````.```   `` ` .```..`````````.```````..,,...,,,,...```````",
  "                      `.`.`` ```````   ``````.`````````````````..`........,,,,...`````.````",
  "                       `.``.```````` ` ``.`..``.`....````````............,,,,,,..`````.",
  "                     ` ...`````````` `````.`.......`````````..`..`.......,,,,,,.`..`.`. `",
  "                      ``..`````````````.`..........`````````````........,.,,,,,........`",
  "                      ``````````````````.............````````````........,,,,,,.`.......",
  "                      .````. ``` `` `.....``.......`.````````````........,,,,,,,.....`.`",
  "                      `` `` ```` `````.............``````````````.......,,,,,,:,.......``",
  "                       ``.``  ``` ````................``````````.......,,,,,:,,,...`...`",
  "                     ` .`````  ``.````................`````````........,,.,,:,::,......`",
  "                     ``````````` `````.................```````.........,,,,,:,,:..`..,.`",
  "                      ```.``````` ```....................```..........,,,,,,,,::,.`.....`",
  "                      . `.``````..````.......,............``.........,,,,,,,,,,:,...,...",
  "                      `.  ``````.`.````.,.............................,,,,,,,:,:,....,..`",
  "                       `. `````..`.````.,...,........................,,,,,,,,,,::,...,..",
  "                      ``.``````....```..,,.,,,,......................,,,,,,,,,:::,,.,,.`",
  "                      `````````.``.```...,.,,,,,....................,,,,,,,,,,,::,,,.,,`",
  "                       `.``.`.``..``.....,.,..,,,....................,,,,,,,,,,:::,.,.,,",
  "                       .```.`..``.```.``.,.,,.,,,,,..................,,,,,,,,,,:::,,.,,`",
  "                      ` .```.........``..,,,,,,,.....................,,,,,,,,,,:::,,..,`",
  "                      `` `.````,`,`.```..,,,..,,,.......................,,,,,,,,:::,..,",
  "                       `````````.`..``...,,,.,,,........................,.,,,,,,:::;,.,.",
  "                       .`....````,..`.`.,,,,,,,,,........................,,,,,,::::',.,.",
  "                       ```.... ``.`..`.`,,,,,,,,.,.......................,,,,,,::::;:,,.",
  "                       ```.,..` ```.. `..,,,,,,,,.,......................,,,,,,,:::;;,:;.",
  "                       ``...,,,..``.`.`..,,,,,,,,.......................,,,,,,,:::::;,.;`",
  "                        ````,,.,,..`.`...,,,,,,,,..........`..........,,,,,,,,,,::::;,.:`",
  "                         `.``...`..```.`.,,,,,,,,....................,,,,,,,,,::::::;:,;.",
  "                         `.``.`.,``...`.,,,,,,,,,...................,,,,,,::;;;';;::::,;,",
  "                         ......`````...,:,,,,,,,,,..............,,,,,,:::'''''''''::::,:,",
  "                         `.....,.......,,,,,,,,,.,,......,,...,,,,,,::;;'++++++''';:::,,,",
  "                        `..````.......,:,,,,,,,,..,..,...,,,,,,,,,,,:;'++##++''';;;:::,,.",
  "                          ..``..`..,,:,,,,,,,,,,...,,,..,,:,,,,,,,,,:;'+++'';;;;::;::::.`",
  "                         `..,.`..,..,,:,,,,,,,,,,,.,,,::::::::,::,,:;'''';;;;;;;:::::::,`",
  "                         `.,,..,,,...:,,,,,,,,:,::::;;''';;::::,::::;;'''+####++;::::::,`",
  "                         ``.,:,,,.`..,,,,,,,,,::;;;''+++''';;::,,,,:;''++#@@@####;:::::,.`",
  "                          .,:;,,,,.:.:,,,,,,,:;''''++++++';;;::,,,:;'+'''@'@@#+++';::::,,",
  "                          ..';',,.:.,,,,,,,,:;;'''+''+';;;;;;;:,,,:;'+'###+';'';;'::,:::.",
  "                           `:::;:,,...,,,,,,;;'''';;:;;;;;;;;;:,..,;+##';;:;;;::::::,,::`",
  "                           ,::,,::....,.,,,,;;;;;;:::'#++;;;;;:...,;++';;:::::::;:,:,::;`",
  "                           ,;;:,,.....,,.,,:;;;;:;;+@@@'+'';;':.`.,:''';:::::::;:,,,,::;",
  "                           .;;':::....,,,,,:;;;;;+##@@#+###'';:.`..,;;;;;;;;;;;;:,,:,,:;",
  "                           `;;+':,....,,..,:;;;;###@+#+'';;:;::.`..,,;:::;;;;;:.,,:,:::;`",
  "                            ;;'';,,....,,,,,:;;+++';::;;::;;;,:....,,,::,,,:,,...,,::::;,",
  "                            :;;'',..,...,,,,:;;;,:,,:,::;;;::,,......,:,,,.......,,,::,;:",
  "                            :';;':....,,,,::::;:,,,,,,:;;;:::,.....,.,,,,........,,,::,;:",
  "                            .;:;;:.,,,,,,,,:,.,,:,,:::;;::,:,,......,,,,,........,,,,:,;:",
  "                             :;;;;,..,,,,,,...,.,:::;;;;:,,,,...``..,..,,........,,,,:,;:",
  "                             :;;::,,,,,,,,,..,.,,::;;::,.,,,,...```..,,:,,........,,,,,:;",
  "                             .:::;:.:,,,,,,,,.,,............,..`.``.,,:;:,,.......,,,,,:;",
  "                              ,:::;:,:,,,,,,,.....``.`.........````..,;'';,......,,,,,,,:",
  "                              :;,:;::,,:,,,,......````.`....,,,.```..,;;'',,,,,,.,,,,,,,'",
  "                              ,:.:;:::,,,,,,.....````````...,:,,````.,;,,#':,,,,,,,,,,,,.,",
  "                               ,,:;:;:::,,,,,....`````````.,:::,.```.,,.,:+;:,,,,,,,,,,,.,",
  "                               ,:,,::::,:,,,.....````````.,:,,:,..``..,..,'';:,,,,:::,,:,`",
  "                               ,,:,:::::,,,,......``````..::...,..``..,,,,'';;,,:,:::,::,`",
  "                               ,.:,,::::,,,,.............,;:......```.,,,,''';:,::::::::,,",
  "                                ,.,,::::,,,,............,:;:......``..,,,,''';::::::;::::'",
  "                                ,..,::::,,,,,..........,:;::.........,,.:#''';;:::;;;;;;;`",
  "                                ,.,,:::,,,,,..........,:;;::,,,,,...,,:;##';'+;:::;;;;;;:",
  "                                `..,::::,,,,,,,.......::;;:::::::,,,,:;###':;+':::;;;;;;:",
  "                                 ..,::::,,,,,,,,,....,:;';::''';:::::;'##+;';'+;::;;;;;;:",
  "                                 :,,:::,,:,,,,,,,,...,:;;:::;'++';;;;;##+#''+++;;;;;;;;;,",
  "                                  ,,:::,,,:,,,,,,,,,,:;';;:;;+##++'''###++++'++';;;;;;;;.",
  "                                 `.:::::,:,:,::,,,,,::;';;;;;'+#+##++###++''++++;:;;;';;`",
  "                                 . `,:::::::::::::,,::;'';;;;'++++#+'+#+++':'+++;::;;;;;",
  "                                 ,  '::::::::::::::::;'''';;;''+++##'++'+';;++++;::;;;;'",
  "                                 :  +:::::::::;::::::;'+';;';'+++++++++''''#+'++;:;;;;;'",
  "                                 .  +:;::::::;:::;::;'+++''';'''+'++';;'';@#++++::;;';;:",
  "                                  :.+;;;:::::::;;:::;'+++''':;;;'';;;'';,;@#++++;:';;;'`",
  "                                  ,::;;;::;:::::;:::;++++''';;;;;;''';;::@##+'++;:;';;'",
  "                                   ':;;;;;;:;:;;;:::;+++#@;,,:,,,,.:.,::@@#+';'+:;;;;;'",
  "                                   #@';;;;:::::::;:::'+#+#@;,,.,.,`:,,'#@#+';;'+;;;;;',",
  "                                   +#:;;;;;;::::;::::;++'##@@#+#::.,'#####+';;'+'';;;'",
  "                                   ;@,;;;;;;;::;;:::::++';+#####++######++';;;;+''';;'",
  "                                   #@;';;;;;;::::::,,:;+;::'+##++++#+'#+'';;;:;++';;;,",
  "                                  `##@+;;;;;;::::;::,,;+::::;;'++''+++'';;;;;;;++'';;#@+",
  "                                  .;@#:';;';;:::::::,,;+;::,:::;;;'';;::;:;;:;;++';''@@@@@@@:`",
  "                                  ,+@@,';;;;;;::::;:,,;+;,,,,::,.,::,,:;;::::;;++';;'@@@@@@####@#;,;,`",
  "                                  ,+#@+';;'';;;:::::::;+;:,::,::,,..,::;;::::;'++';;'@@@@@@@@@@#######@@@:`",
  "                                  ,+###,';;'';;::::::,:+::,,::,::,,,,::;::::::;++';;'#@@@@@@##@##@@@@######@:`",
  "                                  .+;##:';;'';;;::::::;+',,,:::,,,,,:::;,:::::'++';''@@@@@@@@###@#############@;  `",
  "                                  .'+#@#;;;;;;;;::::;::+':,,,,::,,,:,::,:,,:::'+#;;;'@@@@@@@@#####################@@",
  "                                  .':;@#,';;'';;:::;:::+'::,,,:::,,::,,...,,::'+#;;;'@@@@@@@@#######################@",
  "                                  `+@;+##'';;;;;:::::;;+'::.,,,,..,,,...,,,:::'+#';;'@#@@@@@#@#######################@",
  "                                  ;#@#'#@:';;;;;;;::::'+':,,,,,,....,....,,,::'+#';;'@#@@@@@#@########################+",
  "                                 ',+##+'@#:';;;;;:::::;++:,,,,,..,....,...,:,;'+++;;'@+#@@@@@@@########################'",
  "                                `#;+#+#++#++;;;;;::::,;#'',...,...,,,..,`.,,:;++#+;;'@##@@@@###@########################'",
  "                                ###:#'#+;@':+;;;;;::::;++':,.............,,,,;'###;;'@##@@@@@##@#########################'",
  "                               #### #'##+@@',';;;;:::::#+;:,,.......`....:,.:;+##+';'@#@@@@@@###@#########################+",
  "                              :####+:+@#+###+:;;;;;::,;+++;,,.,`,....`...,:,:'+#++;;+##+@@@@@##############################+",
  "                              ###### ##'###@##;;;;;:::'##+':,,...`....,,.,:,;;###+';#:@##@@@@###############################+",
  "                             +#######,#@###@@+#;;;;;:::+#+'::,..,,...,..,:::;'#+++';+:##+#@@@#################################",
  "                            .########.#@###@@#'@;;;;;;;+##+;::,.,,.,..,,.,:;;+#+##+'+#+@'#@@@##################################",
  "                            ########## @#@#@@##'@;;;;'++#++';;:,,,,,,,,,:,:'+##+#+''##,@;@@@@##################################.",
  "                           ############,@###@@#++#;;;;'####''';:,,,,.,.,,:;'++###'';#@,#'@@@@@##################################",
  "                          .###########'.#####@##+##;'+######++';;,,.,,.,.;;'+#++''';#@;+@@@@@###################################.",
  "                          @##########';;`#@##@@##'@#'+#####+##+';;,,,,,,.;+++++'''';#@@;+##@@####################################;",
  "                         ###########+;;;;;####@#''#@##########+#+':,.,:,,;++#+''''''+@@,#+#@@####################################@.",
  "                        +##########+;;;;;;#@###@+''##############;;:,.::::+#''''''''+##:#;#@@####################################@#",
  "                       :###########;;;;;;;;@###@@+'@@###+#+######'',,.:,;:++';'''';++@#+;:@@@@###################################@#,",
  "                       ###########;;;;;;;;;;##@#@#'###@@#+++###+++'::,,,'';''''''''++#++.:#@@#######################################",
  "                      +##########+;;;;;;;;;;:#@#@@++##@@@#@++####+';,,,,,;''''''''++'#;;@;@@########################################",
  "                     `########+##;;;;;;;;;;;';###@#+##@@@@@;+';'+++;:,.,,;'''''''+++'##;#'@#@####################################@##",
  "                    `###########+;;;;;;;;;;;;:'#@#@#+#@@@@@:#';;;;';:,,,:''''''''++''+#:####@####################################@##",
  "                   .############;;;;;;;;;;;;;;,+#@###+@@@@@;#+';''';;;:,:''+''+'+++'++@@'###@#######################################,",
  "                  `###########+';;;;;;;;;;;;;;;,'##@###@@@@#++'''''';,:,;'++++++++'''+#;;@##@@######################################@",
  "                  ##########++#;;;;;;;;'';;;;;;','#@@###@@@@'#+''''';:::++++++++++'+'+;:,@##@########################################,",
  "                 +############;;;;;;;;;''';;;;;;'.:#@###@@@@:#++''''';:+'####++++++'''#+.###@@######################################++",
  "                 #########@###;;;;;;;;;;''';;;;;'',,#@###@@@:#++++++++##########+++'';+':#@#########################################+'.",
  "                '##+######@@@#;;;;;;;;;;;''';;;;;';,`#####@@'##+++++###########+++''';+:;@##@########################################''",
  "                ####+#######@#';;;;;;';;;;''';;;;;'':`##+#@@#+#################+++'';;#'########################################@#####'",
  "               :##############'';;;;;;;';;'''';;;;''';`:#+##@;#################++''';;+'###############################################:",
  "               ###########+###;'';;;';+;::,;''';;;;''''.`@##@,@##@@@@@@#########++';;;;,@######################################@#######:",
  "              #########+#+##++;'';;';;;''';;;''';;;;'''';`.@+.@@#@@@@@@@#######++''';;',###############################################+.",
  "             `#########++####;;;'+';;'';:;';'##+';;;'''''';`.,@@@@@@@@@@######+++'';;;+;################################################.",
  "             ###########+++#';;;;'';;;#':+,';+#'+';;;''''''';.`#@###@@@@######+++';;;;'#################################@###############'.",
  "            ;#############'';;;;;;;;;'+++;:+;,+#'';;;;''''''''+:`:+@##########++''';;;,@################################################+.",
  "            #############;;;;;;;;;;;;:'#+++;',,:#''';;'''''''''''+':,:+#@#####++'''';;.@###############################################'+'`",
  "           #############;;;;;;;;;;;;;;;+#;+++';;;++';;;''''''''''''++++;,;@##++''''';;:@################################################''`",
  "          .##########+#;;;;;;;;;;;;;;;;;#;+'#+';'#'+';;;''''''''''''''++++'.'++''''';;'@################################################;'`,",
  "          ###########++;;;;;;;;;;;;;';;;'+'++';,;'#''';;;'''''''''''''''+++++::'''';';#@##################################@####@########''`;:",
  "         ;#########@##;;;;;;;;;;;;;;;';;'+#+###'::;'+';;;''''''''''''''''++'''+::'';;,@##################################@##############+''. `",
  "         #####@@###+#;;;;;;;;;;;;;;+:+++''#####++::''+';;;''''''''''''''''''''''':;;;.###################################@@##############'''.",
  "        '###@@######';;;;;;;;;;;;;;#+##+''######'+;'++'';;;;''''''''''''''''''''''':'.#@@################################@@##############'''+@.",
  "        ###@@#######;;;;;;;;;;;;;;;;+##+''#######+':''+';;;;'''''''''''''''''''''''+:,##@################################@@##############+''+;,",
  "       '#@@####@@@@@;;;;;;;;;;;;;;;+++''+++###+;;#++:;''';;;;;''''''''''''''''''''''+;#@@################################@@###############''';'",
  "       #@########@@@#;;;;;;;;;;;;;;'''''#++++#++@;+++;:+';;;;;''''''''''''''''''''''+'@@#################################@@################'#+#`",
  "      ,@@###########@+;;;;;;;;;;;;;;;;;++'+++;:#'#;'++;'+';;;;;;'''''''''''''''''''''##@#################################@@#################++#:",
  "      #@#############+';;;;;;;;;;;;::::;+'+++;,#+#'++';''';;;;;;;''''''''''''''''''+;##@#################################@@##################'''",
  "      @#############;;;';;;;;;;;;;;:::;+##'+';;+#@+@+#:;''';;;;''''''''';''''''''''':##@##################################@###################''",
  "     +##############;;;;';;;;;;;;;;:::,'###'+;''++@#+##;''';;;;''''''''';;''''''''''.##@##################################@#################@#+'.",
  "     @##############;;;;;';;;;;;;;;:,::;###++;':'+';++##;''';;;''''';;''';';''''''''`##@##################################@################@###';",
  "    ;##############+;;;;;;;;;;;;;;;::,,;+####'',''+##+#';;'';;;;''''';''';;;''''''''`##@##################################@#############@##@####'",
  "    @#############++;;;;;;'';;;;;;;:,,,:'##+#'+''''+#+#+;;;+';;;''''';;'';;;''''''''.##@@#################################@###############@#####+,",
  "    ###############';;;;;;;';;;;;;;:,:,,;++'###+:'''#;###;;'+;;;;;'''';;;;;;'''''''',#####################################@@##@##########@@######'",
  "   :##############+;;;;;;;;;';;;;;;:,,,::+#@####;'''';##+;;'+';;;'''''';;;;;'''''''''###@##################################@##@##########@########",
  "   @###############;;;;;;;;;;';;;;;;;::,,;+###'#+,'';'##+;;;'+;;;;;'''''';;;''''''';+###@##################################@##@#########@@########:",
  "   ################;;;;;;;;;;;;;;;;;#;:,,:+##+@##;'+:''#;';;''';;;''''''''''''''''',####@##################################@##@########@@##########",
  "  `###############+;;;;;;;;;;;';;;;;;;':,,;+##+;##';+'',#;;;;'+;;;;''''''''''''''''.####@##################################@##@########@###########",
  "  ,#############+#+;;;;;;;;;;;;';;;;'#:;,,:;##;####+'+''++:;;''';;;;;'''''''''''''' #######################################@##@#######@@###########,",
  "  ###############';;;;;;;;;;;;;;';;;;'#'';;#':'#;##+++'',+;;;;'+;;;;;''''''''''''''`#######################################@##@#######@############'",
  "  @##########@;;;;;;;;;;;;;;;;;;;';;;''+':::'+#:@###++;+;'';;;''';;';'''''''''''''':#####@#################################@#@#######@############+;",
  "  ##########+;;;;;;;;;;;;;;;;;;;;';;;';,:',;#+#++'###+:'';;';;###;;;;';''''''''''';'#######################################@@@####################+',",
  " `########@'';;;;;;;;;;;;;;;;;;;;;';;:';;;:#+;';'@+@#++;+::;;;@##';;;;;''''''''''':######@#################################@#@######@##############'+",
  " ;#######@;;;;;;;;;;;;;;;;;;;;;;;;;';;:'''''##'#+,#'';+:'+':;;+##+;;;;;'''''''';''`######@#################################@@@@####################'+",
  " @#######;'';;;;;;;;;;';';;;;;;;;;;';;',;,+,;###;+;####+'+':;'+##+';;;''''''''''''`######@#################################@@@#####################';`",
  " #######;;'';;;;;;;;;;;'''';;;;;;;;'';',,'':'+###;@:##;;++::;+###++;;;''''''''''''.#######@################################@@@######################;:",
].join("\n");