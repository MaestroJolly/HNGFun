<!DOCTYPE html>


<?php 
try {
     $profile = 'SELECT * FROM interns_data_ WHERE username="boldtechs"';
    $select = 'SELECT * FROM secret_word';

    $query = $conn->query($select);
    $profile_query = $conn->query($profile);

    $query->setFetchMode(PDO::FETCH_ASSOC);
    $profile_query->setFetchMode(PDO::FETCH_ASSOC);

    $get = $query->fetch();
    $user = $profile_query->fetch();
    $secret_word = $get['secret_word'];
  } catch (PDOException $e) {
      throw $e;
  }
 ?>
<head>
	<title> Boldtechs | Profile</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed|Roboto+Mono" rel="stylesheet"> 


    <style type="text/css">
    	
body,html{
    
    margin: 0px;
    padding: 0px;
     font-family: Roboto Mono;
     background: #62D7FC;
}

#wrapper, #content{
    
width: 100%;

}

#nav{

	width: 80%;
	height: 120px;
	margin: 20px auto;
}

#nav p{

	float: right;
	color: #fff;
}

#nav h2{

	float: left;
	color: #fff;
}

#oval{

	width: 191px;
	height: 199px;
	border-radius: 100%;
	margin: 10px auto;
	background: url("http://res.cloudinary.com/boldtechs/image/upload/v1523952242/1.jpg") ;
}

#content h3{

margin: 10px auto;
width: 11%;
color: #fff;
 font-family: Roboto Mono;
}

#square{

width: 678px;
height: 90px;
margin: 10px auto;
text-align: center;
background-color: #fff;
opacity: 0.6;
filter: alpha(opacity=60);
padding: 10px;
    font-family: 'Roboto Mono', monospace;
   border-radius: 4px;

}


#square p{

margin-bottom: 30px;


}


    </style>
</head>
<body>
    <div  id="wrapper">
        
        <div  id="content"> 
        
	            <div id="nav">	


	            	<h2>HGN INTERNSHIP 4</h2>
	            	<p>HOME | PORTFOLIO</p>

	            </div>

	            <div id="oval"> </div>
	            <h3> WEB | MOBILE</h3>
	            <p>Tel: +2348063332676</p>
	            <p>Slack : @boldtechs</p>
	            <div id="square">
	            	
	            	<p>
	            		"Every great developer you know got there by solving problems they were unqualified to solve until they actually did it." - Patrick McKenzie 
	            	</p>



	            </div>
        
        </div>
    
    
    </div>
    
</body>
</html>