var DPManager = {
    _words : [],
    _timer : 0,

    showWord : function(t,w){
        $("h3", w)
            .hide()
            .html(DPManager._words[t])
            .fadeIn(200*t);
    },

    countdown : function(){
        DPManager._timer -= 100;
        $("#game-time").html( (DPManager._timer/1000).toFixed(1) );
        if( DPManager._timer > 0 ){
            setTimeout(DPManager.countdown, 100);
        }
        else{
            //The game is now over
        }
    },

    setWords : function(data){
        console.log(data);
        DPManager._words = data.words;
    },

    startGame : function(){
        $.mobile.changePage('/#countdown');
    },

    initCountdownPage : function(){
        DPManager._timer = 60000;
        $.get(
            '/ajax/load-words',
            {},
            DPManager.setWords,
            'json'
        );
    },

    beforeShowPlay : function(){

        $("#guess-words li")
//            .swipe(function(){ $(this).hide(); })
            .swipe(function(){
                $(this).removeClass('ui-body-c')
                $(this).addClass('ui-body-a')
//                $("#guess-words").listview();
            })
//('ui-bar ui-bar-c') })
            .each(function(i,w){ DPManager.showWord(i,w); });


        setTimeout(DPManager.countdown, 100);
    }

};

$(function(){
    //Button events
    $('#start-game').click(DPManager.startGame);

    //Page init events
    $('#countdown').live('pageshow', DPManager.initCountdownPage);
    $('#play').live('pagebeforeshow', DPManager.beforeShowPlay);
});
