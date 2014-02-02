game.PlayScreen = me.ScreenObject.extend({
    /** 
     *  action to perform on state change
     */
    onResetEvent: function() {  
        // clear the background
        me.game.world.addChild(new me.ColorLayer("background", "#000000", 0), 0);
        // add a few squares
        me.game.world.addChild(new game.square(50, 100, {width: 100, height: 100}), 1);
        me.game.world.addChild(new game.circle(400, 300, {width: 150, height: 100}), 2);

        me.input.registerPointerEvent("mousemove", me.game.viewport, function (event) {
            me.event.publish("mousemove", [ event ]);
        });
    }
});
