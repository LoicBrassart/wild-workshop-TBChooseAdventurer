
$(function() {

    //-----------------------------Variables

    var imgs = ['mutoh','marcus','gego','senala'];
    var connectToken = 34;      //Bon token : 42

    //-----------------------------Algorithme

    init(imgs);

    $('.thumb img').mouseover(function() {
        swapFocus(this);
    });

    $('#search').keyup(function() {
        filterThumbs($(this).val());
    });
    var formAuthNewKey = $('#formAuthNewKey');
    $('#formAuthChangeKey').click(function() {
        majAuthKey(formAuthNewKey.val());
        formAuthNewKey.val('');
    });


    //-----------------------------Fonctions
    function init(imgs) {
        var tiltAmplitude=60;
        var tilt;
        var gallery=$('#gallery');

        $('#focus').addClass('hidden');
        $.each(imgs,function(key,value) {
            gallery.append($('<figure class="polaroid thumb"><div class="imgBgnd"><img src="img/thumbs/'+value+'.png" alt="'+value+'"></div><figcaption>'+value+'</figcaption></figure>'));
        });
        gallery.find('.polaroid').each(function() {
            tilt = Math.floor((Math.random() * tiltAmplitude) + 1 -(tiltAmplitude/2));
            $(this).css('transform', 'rotate('+tilt+'deg)');
        });
    }

    function swapFocus(newImg) {
        var tiltAmplitude=20;
        var tilt = Math.floor((Math.random() * tiltAmplitude) + 1 -(tiltAmplitude/2));
        var focus = $('#focus');
        focus.removeClass('hidden');
        focus.find('.polaroid')
            .css('transform', 'rotate('+tilt+'deg)');
        focus.find('img').attr('src', 'img/' + $(newImg).attr('alt') + '.png');
        focus.find('figcaption').html($(newImg).attr('alt'));
        majFocus(connectToken, $(newImg).attr('alt'));

    }

    function filterThumbs(newSearch) {
        var name;
        var gallery=$('#gallery');
        gallery.find('.polaroid figcaption').each(function() {
            name=$(this).html();
            if(name.indexOf(newSearch) === -1) {
                $(this).parent().addClass('hidden');
            } else {
                $(this).parent().removeClass('hidden');
            }
        });
    }

    function majFocus(connectToken, targetName) {
        $.post('PHPServer/server.php',
            {
                connectToken:connectToken,
                targetName:targetName
            },
            function(data) {
                var infoBox = $('#infoBox');
                var answer = JSON.parse(data);

                if(!answer.statusConnection) {
                    infoBox.find('h1').html('Erreur');
                    infoBox.find('p').html('Connexion avec le serveur non établie...');
                    infoBox.find('p').append('<p>Reconnexion : Entrer la clé d\'authentification correcte (42) et valider, choisir ensuite une nouvelle cible :</p>');
                } else if(!answer.foundTarget) {
                    infoBox.find('h1').html('Erreur');
                    infoBox.find('p').html('Personnage inconnu');
                } else {
                    infoBox.find('h1').html(answer.targetInfo.name);
                    infoBox.find('p').html(answer.targetInfo.desc);
                }
            });
    }

    function majAuthKey(newVal) {
        connectToken = newVal;
    }
});
