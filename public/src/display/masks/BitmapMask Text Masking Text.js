var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 640,
    height: 480,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {

    this.load.image('bunny', 'assets/sprites/bunny.png');
    this.load.image('phaser2', 'assets/sprites/phaser2.png');
    this.load.image('checker', 'assets/pics/checker.png');
    this.load.bitmapFont('desyrel', 'assets/fonts/bitmap/desyrel.png', 'assets/fonts/bitmap/desyrel.xml');

}

function create() {

    var checker = this.make.image({
        x: game.config.width / 2,
        y: game.config.height / 2,
        key: 'checker',
        add: true
    });

    var phaser2 = this.add.text(100, 300, 'PHASER').setFont('128px Arial').setFill('#ffff00').setAlign('center');
    var text = this.add.text(100, 300, 'PHASER').setFont('128px Impact').setFill('#ff0000').setAlign('center');
    phaser2.setOrigin(0.5);

    text.mask = new Phaser.Display.Masks.BitmapMask(this, phaser2);

    this.input.events.on('POINTER_MOVE_EVENT', function (event) {

        phaser2.x = event.x;
        phaser2.y = event.y;

        phaser2.setText('PHASER\nX: ' + phaser2.x + '\nY: ' + phaser2.y);
        text.setText('PHASER\nX: ' + phaser2.x + '\nY: ' + phaser2.y);

    });

    var bmtext = this.add.dynamicBitmapText(60, 200, 'desyrel', 'PHASER', 72);

    bmtext.setDisplayCallback(textCallback);

    TweenMax.to(bmtext, 2, {
        delay: 2,
        scaleX: 2,
        scaleY: 2,
        ease: Sine.easeInOut,
        repeat: -1,
        yoyo: true
    });

    bmtext.mask = new Phaser.Display.Masks.BitmapMask(this, phaser2);
}

function textCallback (data)
{
    data.x = Phaser.Math.Between(data.x - 2, data.x + 2);
    data.y = Phaser.Math.Between(data.y - 4, data.y + 4);

    return data;
}