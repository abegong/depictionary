//word_list : ["acres","adult","advice","arrangement","attempt","August","Autumn","border","breeze","brick","calm","canal","Casey","cast","chose","claws","coach","constantly","contrast","cookies","customs","damage","Danny","deeply","depth","discussion","doll","donkey","Egypt","Ellen","essential","exchange","exist","explanation","facing","film","finest","fireplace","floating","folks","fort","garage","grabbed","grandmother","habit","happily","Harry","heading","hunter","Illinois","image","independent","instant","January","kids","label","Lee","lungs","manufacturing","Martin","mathematics","melted","memory","mill","mission","monkey","Mount","mysterious","neighborhood","Norway","nuts","occasionally","official","ourselves","palace","Pennsylvania","Philadelphia","plates","poetry","policeman","positive","possibly","practical","pride","promised","recall","relationship","remarkable","require","rhyme","rocky","rubbed","rush","sale","satellites","satisfied","scared","selection","shake","shaking","shallow","shout","silly","simplest","slight","slip","slope","soap","solar","species","spin","stiff","swung","tales","thumb","tobacco","toy","trap","treated","tune","University","vapor","vessels","wealth","wolf","zoo"],


var DPManager = {
    _words : [],
    _create : {},

    next_word : function(){
        return(word_list[Math.floor(Math.random()*word_list.length)]);
    },

    set_word : function(t,w){
        $("h3", w)
            .hide()
            .html(next_word)
            .fadeIn(200*t);
    },

    setWords : function(data){
        console.log(data);
        DPManager._words = data.words;
    },

    startGame : function(){
//        location.hash = 'countdown';
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
