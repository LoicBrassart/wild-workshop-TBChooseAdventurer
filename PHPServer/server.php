<?php
/*Structure d'une réponse positive
{
    "statusConnection":boolean,
    "foundTarget":boolean,
    "targetInfo":{
        "name":string,
        "desc":string
    }
} */

//-----------------------------Variables
$connectToken = $_POST['connectToken'];
$targetName = $_POST['targetName'];
$badConnectionAnswer = array(
    'statusConnection'=>false
);

//-----------------------------Algorithme
if(testConnection($connectToken)) {     //User authentifié
    echo json_encode(searchTarget($targetName));
} else {                                //Erreur authentification
    echo json_encode($badConnectionAnswer);
}

//-----------------------------Fonctions
function testConnection($connectToken) {
    $trueToken = '42';
    return $connectToken===$trueToken;
}

function searchTarget($targetName) {

    $result = array(
        'statusConnection'=>true,
        'foundTarget'=>false,
        'targetInfo'=>null,
        );

    $unitsInfo = array(
        'gego' => array('name'=>'Gegonago ^','desc'=>'Timemaster extraordinaire'),
        'marcus' => array('name'=>'Marcus','desc'=>'Loony genius'),
        'mutoh' => array('name'=>'Mutoh ^','desc'=>'Otherwordly motherfucker'),
        'senala' => array('name'=>'Senala','desc'=>'Very Photongenic grrl'),
    );


    if(in_array($targetName,array_keys($unitsInfo))) {
        $result['foundTarget']=true;
        $result['targetInfo']=$unitsInfo[$targetName];
    }
    return $result;
}

