var verBaseMid = $('#computer').position().top + ( $('#computer').height()/2 );
var horBaseMid = $('#computer').position().left + ( $('#computer').width()/2 );


function getInitialPosition(item) {
    var left = $(item).position().left;
    var top = $(item).position().top;
    return [left, top];
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function generateTrajectory(initialPos) {
    var nextLeft = randomIntFromInterval(initialPos[0]-50, initialPos[0]+50);
    var nextTop = randomIntFromInterval(initialPos[1]-25, initialPos[1]+25);
    return [nextLeft, nextTop];
}

function cycleMoves(item) {
    var initialPos = getInitialPosition(item);
    moves(item, initialPos);
}

function moves(item, initialPos) {

    var trajectory = generateTrajectory(initialPos);

    var duration = Math.floor(Math.random()* (3000-2500)+2500);
    $(item).animate({
        left: trajectory[0]+"px",
        top: trajectory[1]+"px"
    }, {
            duration: duration,

            queue: false,

            step: function () {
                $('.'+$(this).attr('id')+':first').remove();
                var verMid = $(this).position().top + ( $(this).height() / 2 );
                var horMid =$(this).position().left + ( $(this).width() / 2 );
                $('#tools').line(horBaseMid, verBaseMid, horMid, verMid, {zindex:0, stroke: '1', class:$(this).attr('id')});
            },

            done: function () {
                moves(item, initialPos);
            }
        }
    );
}



$(document).ready(function(){

    cycleMoves('#kappa');
    cycleMoves('#pika');
    cycleMoves('#pinky');

});