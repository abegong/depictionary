word_list = ["acres","adult","advice","arrangement","attempt","August","Autumn","border","breeze","brick","calm","canal","Casey","cast","chose","claws","coach","constantly","contrast","cookies","customs","damage","Danny","deeply","depth","discussion","doll","donkey","Egypt","Ellen","essential","exchange","exist","explanation","facing","film","finest","fireplace","floating","folks","fort","garage","grabbed","grandmother","habit","happily","Harry","heading","hunter","Illinois","image","independent","instant","January","kids","label","Lee","lungs","manufacturing","Martin","mathematics","melted","memory","mill","mission","monkey","Mount","mysterious","neighborhood","Norway","nuts","occasionally","official","ourselves","palace","Pennsylvania","Philadelphia","plates","poetry","policeman","positive","possibly","practical","pride","promised","recall","relationship","remarkable","require","rhyme","rocky","rubbed","rush","sale","satellites","satisfied","scared","selection","shake","shaking","shallow","shout","silly","simplest","slight","slip","slope","soap","solar","species","spin","stiff","swung","tales","thumb","tobacco","toy","trap","treated","tune","University","vapor","vessels","wealth","wolf","zoo"];

function next_word(){
    return(word_list[Math.floor(Math.random()*word_list.length)]);
}

function set_word(t,w){
    $("h3", w)
        .hide()
        .html(next_word)
        .fadeIn(200*t);
}

$("#play").live("pageinit", function() {
    $("#guess-words li").each(function(i,w){
        set_word(i,w);
    });

    $("#guess-words li").click(function(){
        set_word(2,this);
    });

    game_time = 599;
    $("#game-time").html( Math.floor(game_time/10)+"."+(game_time%10) );

//    $("#guess-words li").swipe(function(){
//        $(this).hide();
//    });
});

