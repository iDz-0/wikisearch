<?php

if(isset($_GET['token'])) {
  if($_GET['token'] == sha1("azerty123")) {

    $history = file_get_contents("histo.json");

    if(isset($_GET['title']) && !empty($_GET['title'])) {

      $tabHistory = json_decode($history);
      array_unshift($tabHistory, array(
        "title" => $_GET['title'],
        "link" => "https://fr.wikipedia.org/wiki/".$_GET['title'],
        "date" => "ajd"
      ));

      $history = json_encode($tabHistory);
      file_put_contents("histo.json", $history);
    }

    header('content-Type: application/json');
    echo $history;

  }
}
