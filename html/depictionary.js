$("#playff").live("pageinit", function() {
    timer = 6000;

    $("#guess-words li").each(function(i,w){
        set_word(i,w);
    });

    $("#guess-words li").click(function(){
        set_word(2,this);
    });

    game_time = 599;
    $("#game-time").html( Math.floor(game_time/10)+"."+(game_time%10) );

    $("#guess-words li").swipe(function(){
        $(this).hide();
    });

    setTimeout(countdown, 100);
});


var DPManager = {
    _words : [],
    _time : 0,

    next_word : function(){
        return(word_list[Math.floor(Math.random()*word_list.length)]);
    },

    set_word : function(t,w){
        $("h3", w)
            .hide()
            .html(next_word)
            .fadeIn(200*t);
    },

    countdown : function(){
        timer -= 100;
        $("#game-time").html( (timer/1000).toFixed(1) );
        if( timer > 0 ){
            setTimeout(countdown, 100);
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
        DPManager._time = 6000;
        $.mobile.changePage('/#countdown');
    },
    pauseGame : function(){},

    initCountdownPage : function(){
        $.get(
            '/ajax/load-words',
            {},
            DPManager.setWords,
            'json'
        );
    },

    initPlayPage : function(){
        setTimeout(DPManager.countdown, 100);
        console.log("Here we are");
        console.log(DPManager._words);
    }
};

$(function(){
    //Button events
    $('#start-game').click(DPManager.startGame);

    //Page init events
    $('#countdown').live('pageshow', DPManager.initCountdownPage);
    $('#play').live('pagebeforeshow', DPManager.initPlayPage);
});
