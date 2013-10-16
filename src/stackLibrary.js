(function () {
    var imageStack = function (imageArray, stage, object) {
        var container = new createjs.Container();
        stage.addChild(container);
        var top = (object.top === undefined) ? 100 : object.top;
        var length = imageArray.length,previousArray = [];
        for (var i = 0; i < length; i++) {
            container.addChildAt(imageArray[i],0);
            imageArray[i].rotation = Math.random() * 20 - 10;
            imageArray[i].name = i;
            imageArray[i].regX=imageArray[i].image.width/2;
            imageArray[i].regY=imageArray[i].image.height/2;
            imageArray[i].x = (object.x == undefined) ?((object.width===undefined)?0:(object.width)) : object.x;
            imageArray[i].y = (object.y == undefined) ?((object.height===undefined)?0:(object.height)): object.y;
            previousArray[i] = imageArray[i].y;
            new createjs.Tween.get(imageArray[i]).to({rotation:Math.random() * 20 - 10}, 300);
        }
        imageArray[0].addEventListener("click", mouseEventClicked);
        function mouseEventClicked(evt) {
            evt.target.removeEventListener("click", mouseEventClicked);
            new createjs.Tween.get(imageArray[evt.target.name]).to({y:-top,rotation:45}, 300).call(tweenCompleted, [evt.target.name]);
        }

        function tweenCompleted(name) {
            container.setChildIndex(imageArray[name], 0);

            new createjs.Tween.get(imageArray[name]).to({y:previousArray[name],rotation: Math.random() * 20 - 10}, 300);
            var topChild=container.getChildAt(container.getNumChildren()-1);
            topChild.rotation=0;
            topChild.addEventListener("click", mouseEventClicked);
        }

    };

    window.imageStack = imageStack;
}());
