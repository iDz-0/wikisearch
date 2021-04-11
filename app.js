(function() {
  "use strict";

  let token;
  $('.logout').hide();
  $('.histoBtn').hide();

  let printHisto = function(json) {

    $('.left').html('');


    for(let i = 0; i < json.length; i++) {

      let $leftPage = $('.left');

      let $container = $('<div class="container"></div>');

      let $title = $('<span class="title">'+json[i]["title"]+'</span>');
      let $link = $('<span class="link">'+json[i]["link"]+'</span>');

      $container.append($title);
      $container.append($link);

      $leftPage.append($container);

      setLinkClickable();

    }

  }

  let getHistory = function(callback) {

    $.ajax({
      url: "history.php?token="+token,
      dataType: "json",

    }).done(function(json) {
      callback(json);
    });

  }

  let addToHistory = function(title) {
    if(token) {
      $.ajax({
        url: "history.php?title="+title+"&token="+token,
        dataType: "json"

      }).done(function(json) {
        //console.log(json);
      });
    }

  }

  let setLinkClickable = function() {

    $('.title').unbind().click(function() {

      setRightPage($(this).text());

      if(token) {
        addToHistory($(this).text());
      }

    });
  }

  //Affiches les différents résultat proposé par l'API Wikipedia
  let setLeftPage = function(search) {

    $.ajax({
      url: "https://fr.wikipedia.org/w/api.php?action=opensearch&search="+search+"&format=json&limit=8",
      dataType: "jsonp",

    }).done(function(json) {

      if(json[1]) {

        for(let i = 0; i < json[1].length; i++) {

          let $leftPage = $('.left');

          let $container = $('<div class="container"></div>');

          let $title = $('<span class="title">'+json[1][i]+'</span>');
          let $link = $('<span class="link">'+json[3][i]+'</span>');

          $container.append($title);
          $container.append($link);

          $leftPage.append($container);

          setLinkClickable();

        }

      }

    });

  }


  let setRightPage = function(search) {

    $.ajax({
      url: "https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="+search,
      dataType: "jsonp",

    }).done(function(json) {

      var arr = Object.keys(json["query"]["pages"]).map((key) => [key, json["query"]["pages"][key]]);
      arr = arr[0][1]['extract'];

      let $desc = $('<p>'+arr+'</p>');
      $('.right').html($desc);

    });

  }

  //Relance une nouvelle recherche lors de la mise a jour du mot clef
  $('.search_bar').keyup(function(){

    $('.left').html('');
    setLeftPage($('.search_bar').val());

  });

  $('.histoBtn').click(function(){

    if(token) {
      getHistory(printHisto);
    }

  });

  $('.connectBtn').click(function() {
    let username = $('.username').val();
    let password = $('.password').val();

    $.ajax({
      url: "connect.php?username="+username+"&password="+password,
      dataType: "json"

    }).done(function(json) {

      token = json['token'];

      if(token) {
        $('.formConnect').fadeOut(1000, function() {
          $('.logout').fadeIn(2000);
          $('.histoBtn').fadeIn(2000);
        });

      }

    });
  });

  $('.logoutBtn').click(function() {
    token = "";

    $('.logout').fadeOut(1000, function() {
      $('.formConnect').fadeIn(2000);
      $('.histoBtn').fadeOut(2000);
    });
  });


}) ();
