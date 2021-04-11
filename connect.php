<?php

if(isset($_GET['username']) && isset($_GET['username'])) {
  if(!empty($_GET['username']) && !empty($_GET['password'])) {

    if($_GET['username'] == "Bob" && $_GET['password'] == "monsupermdp") {
      $json = json_encode(array(
        "token" => sha1("azerty123")
      ));
    }

  }
}

header('Content-Type: application/json');
echo $json;
