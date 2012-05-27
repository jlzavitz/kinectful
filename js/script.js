var kinect = {
    left:   0,
    top:    0,
    tilt:   -5,
    zoom:   .5,
    yAngle:     0,
    keyL:   false,
    keyR:   false,
    keyU:   false,
    keyD:   false,
    last: 0
};
var legs = {
    direction: false,
    xAngle: 0
}

$(document).ready( function() {

    document.addEventListener("keydown", function(e)
    {
        switch(e.keyCode)
        {
            case 37: // left
            rotate (1, kinect.last);
            kinect.last = 1;
            kinect.left -= 30;
            if(kinect.left <= -300){
                $("#kinect").hide();   
                kinect.left = screen.width;
            }
            legs.xAngle += legs.direction ? 60 : -60;
            break;

            case 39: // right
            rotate (3, kinect.last);
            kinect.last = 3;
            kinect.left += 30;
            if(kinect.left >= screen.width){
                $("#kinect").hide();
                kinect.left = -300;   
            }
            legs.xAngle += legs.direction ? 60 : -60;
            break;
                    
            case 38: // up
            rotate (2, kinect.last);
            kinect.last = 2;
            if (kinect.zoom >= .5 && kinect.zoom <= 1.6){
                kinect.top -= 10;
                kinect.tilt -= 1;
            }
            if( kinect.zoom > 0.1 )
                kinect.zoom -= .05;
            legs.xAngle += legs.direction ? 60 : -60;
            break;
            
            case 40: // down
            rotate (0, kinect.last);
            kinect.last = 0;
            if (kinect.zoom <= 1.6 && kinect.zoom >=.1){
                kinect.top += 10;
                kinect.tilt += 1
            }
            if (kinect.zoom <= 1.6)
                kinect.zoom += .05;
            legs.xAngle += legs.direction ? 60 : -60;
            break;
        }
        if (Math.abs(legs.xAngle) >= 60){
            legs.xAngle = legs.xAngle > 0 ? 60 : -60;
            legs.direction = !legs.direction;
        }
        transformKinect(kinect);
        transformLegs(legs);
    }, false); 
});

/*
** transform properties that are specified in css3 transitions after keys change the values
*/
function transformKinect(kinect){
    $('#kinect').css( "margin-left", kinect.left + "px").css("margin-top", kinect.top + "px" )
        .css( "-webkit-transform", "rotateX("+kinect.tilt+"deg) scale3d("+kinect.zoom+","+kinect.zoom+","+kinect.zoom+" ) "+
        "rotateY("+kinect.yAngle+"deg)");
    if(!$('#kinect').is(":visible"))
        $('#kinect').show();
}
function transformLegs(legs){
    $("#legs > div:nth-child(1)").css( "-webkit-transform", "translateZ(1em) rotateX("+legs.xAngle+"deg) translateZ(-1em)" );
    $("#legs > div:nth-child(2)").css( "-webkit-transform", "translateZ(1em) rotateX("+(-legs.xAngle)+"deg) translateZ(-1em)" );
}

function rotate(cur, last){
    switch(last){
        case cur:
        break;
        case (cur+1)%4:
        kinect.yAngle += 90;
        break;
        case (cur+2)%4:
        kinect.yAngle += 180;
        break;
        case (cur+3)%4:
        kinect.yAngle -= 90;
        break;
    }
    kinect.last = cur;
}







