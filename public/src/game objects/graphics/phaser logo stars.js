var config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var fragSource = [
    'precision mediump float;',
    'varying vec2 v_tex_coord;',
    'uniform sampler2D u_sampler;',

    'void main(void) {',
        // The texture will be rendered with  a red tint
    '   gl_FragColor = texture2D(u_sampler, v_tex_coord) * vec4(1.0, 0.0, 0.0, 1.0);',
    
    '}'
].join('\n');

var graphics;
var s;
var r;
var colors;
var go;
var props;
var logos;

var effectLayer;
var layer;
var distance = 300;
var speed = 4;
var stars;

var max = 500;
var xx = [];
var yy = [];
var zz = [];

function preload ()
{
    this.load.image('star', 'assets/demoscene/star.png');
}

function create ()
{
    //  Starfield

    // layer = this.add.layer();

    layer = this.add.effectLayer(0, 0, 800, 600, 'starfield', fragSource);

    if (this.sys.game.renderType === 1)
    {
        max = 5000;
    }

    stars = [];

    for (var i = 0; i < max; i++)
    {
        xx[i] = Math.floor(Math.random() * 800) - 400;
        yy[i] = Math.floor(Math.random() * 600) - 300;
        zz[i] = Math.floor(Math.random() * 1700) - 100;

        // var star = layer.create(xx[i], yy[i], 'star');

        var star = this.add.image(xx[i], yy[i], 'star');

        star.z = zz[i];

        layer.add(star);

        stars.push(star);
    }

    //  Wireframe logo

    graphics = this.add.graphics();

    graphics.z = 10000;

    var hsv = Phaser.Graphics.Color.HSVColorWheel();

    colors = [];

    for (var i = 0; i < hsv.length; i += 4)
    {
        colors.push(hsv[i].color);
    }

    r = 0;
    s = [];
    go = false;
    logos = 13;

    props = {
        a: 0,
        thickness: 10,
        alpha: 1
    };

    for (var i = 0; i < logos; i++)
    {
        s.push(0);
    }

    TweenMax.delayedCall(5, function () {

        r = 0;
        go = true;

    });

    TweenMax.delayedCall(14, function () {

        TweenMax.to(props, 0.05, {

            a: 1,

            repeat: -1,

            onRepeat: function () {
                Phaser.Utils.Array.RotateRight(colors);
            }

        });

    });

    TweenMax.delayedCall(30, function () {

        TweenMax.to(props, 3, {

            alpha: 0.1,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            repeatDelay: 4

        });

    });

    TweenMax.delayedCall(22, function () {

        TweenMax.to(props, 6, {

            thickness: 2,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            repeatDelay: 16

        });

    });
}

function update ()
{
    drawStars();

    graphics.clear();

    r += 0.015;

    var scale = 0.9 - (logos * 0.01);

    for (var i = 0; i < logos; i++)
    {
        drawLogo(colors[i], -400 + ((i * 2) * Math.sin(r * 2)), -100 + ((i * 2) * Math.cos(r * 2)), scale, s[i]);

        if (go)
        {
            s[i] = Math.sin(r / 2);
        }

        scale += 0.01;
    }
}

function drawStars ()
{
    for (var i = 0; i < max; i++)
    {
        stars[i].perspective = distance / (distance - zz[i]);
        stars[i].x = 400 + xx[i] * stars[i].perspective;
        stars[i].y = 300 + yy[i] * stars[i].perspective;

        zz[i] += speed;

        if (zz[i] > 290)
        {
            zz[i] -= 600;
        }

        stars[i].z = zz[i];

        stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
        stars[i].setScale(stars[i].perspective / 2);
        stars[i].rotation += 0.1;
    }

}

function drawLogo (color, x, y, scale, rot)
{
    graphics.lineStyle(Math.round(props.thickness), color, props.alpha);

    var w = 100;
    var h = 200;
    var h2 = 100;
    var top = y + 0;
    var mid = y + 100;
    var bot = y + 200;
    var s = 30;

    graphics.save();
    graphics.translate(400, 300);
    graphics.scale(scale, scale);
    graphics.rotate(rot);

    graphics.beginPath();

    //  P

    graphics.moveTo(x, top);
    graphics.lineTo(x + w, top);
    graphics.lineTo(x + w, mid);
    graphics.lineTo(x, mid);
    graphics.lineTo(x, bot);

    //  H

    x += w + s;

    graphics.moveTo(x, top);
    graphics.lineTo(x, bot);
    graphics.moveTo(x, mid);
    graphics.lineTo(x + w, mid);
    graphics.moveTo(x + w, top);
    graphics.lineTo(x + w, bot);

    //  A

    x += w + s;

    graphics.moveTo(x, bot);
    graphics.lineTo(x + (w * 0.75), top);
    graphics.lineTo(x + (w * 0.75) + (w * 0.75), bot);

    //  S

    x += ((w * 0.75) * 2) + s;

    graphics.moveTo(x + w, top);
    graphics.lineTo(x, top);
    graphics.lineTo(x, mid);
    graphics.lineTo(x + w, mid);
    graphics.lineTo(x + w, bot);
    graphics.lineTo(x, bot);

    //  E

    x += w + s;

    graphics.moveTo(x + w, top);
    graphics.lineTo(x, top);
    graphics.lineTo(x, bot);
    graphics.lineTo(x + w, bot);
    graphics.moveTo(x, mid);
    graphics.lineTo(x + w, mid);

    //  R

    x += w + s;

    graphics.moveTo(x, top);
    graphics.lineTo(x + w, top);
    graphics.lineTo(x + w, mid);
    graphics.lineTo(x, mid);
    graphics.lineTo(x, bot);
    graphics.moveTo(x, mid);
    graphics.lineTo(x + w, bot);

    graphics.strokePath();

    graphics.restore();
}
