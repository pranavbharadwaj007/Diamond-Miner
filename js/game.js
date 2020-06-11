let config ={
    type:Phaser.AUTO,
    scale:{
        width:1540,
        height:850,
    },
    backgroundColor:"blue",

    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:9000,

            },
            debug:false,
        }
    },

    scene:{
        preload:preload,
        create:create,
        update:update,
    }
};

let game= new Phaser.Game(config);

let player_config={
    player_speed:550,
    player_jump:-2000,
}

function preload(){
this.load.image("ground","../assets/wall.png");
this.load.image("sky","../assets/back.jpg");
this.load.image("hero","../assets/hero64.png");
this.load.image("gem","../assets/gem.png");
}

function create(){
W=game.config.width;
H=game.config.height;

let ground =this.add.tileSprite(0,H-80,W,80,'ground');
ground.setOrigin(0,0);



let back =this.add.sprite(0,0,'sky');
back.setOrigin(0,0)
back.displayWidth=W;
back.displayHeight=H;
back.depth=-1;



this.player=this.physics.add.sprite(100,100,'hero').setScale(0.5,0.5);
this.physics.add.existing(ground);
this.player.setBounce(0.2);
this.player.setCollideWorldBounds(true);

//keyboard
this.cursors=this.input.keyboard.createCursorKeys();
let gem=this.physics.add.group({
    key:"gem",
    repeat:12,
    setScale:{x:0.1,y:0.1},
    setXY:{x:10,y:0,stepX:105},

});
gem.children.iterate(function(f){
f.setBounce(Phaser.Math.FloatBetween(0.4,0.7));

});
let platforms=this.physics.add.staticGroup();
platforms.create(750,620,'ground').setScale(1.5,0.5).refreshBody();
platforms.create(920,620,'ground').setScale(1.5,0.5).refreshBody();

platforms.create(165,340,'ground').setScale(1.5,0.5).refreshBody();
platforms.create(335,340,'ground').setScale(1.5,0.5).refreshBody();

platforms.create(1280,500,'ground').setScale(1.5,0.5).refreshBody();
platforms.create(1400,500,'ground').setScale(1.5,0.5).refreshBody();

platforms.create(1110,480,'ground').setScale(1.5,0.5).refreshBody();
platforms.create(750,400,'ground').setScale(1.5,0.5).refreshBody();




this.physics.add.collider(ground,this.player);
this.physics.add.collider(ground,gem);
this.physics.add.collider(platforms,gem);
this.physics.add.collider(platforms,this.player);

this.physics.add.overlap(this.player,gem,eatfruit,null,this);

this.cameras.main.setBounds(0,0,W,H);
this.physics.world.setBounds(0,0,W,H);


this.cameras.main.startFollow(this.player,true,true);
this.cameras.main.setZoom(1.9);


ground.body.allowGravity=false;
ground.body.immovable=true;


}
function update(){
if(this.cursors.left.isDown){
    this.player.setVelocityX(-player_config.player_speed);
}
else if(this.cursors.right.isDown){
    this.player.setVelocityX(player_config.player_speed);
}
else{
    this.player.setVelocityX(0);
}
if(this.cursors.up.isDown && this.player.body.touching.down){
    this.player.setVelocityY(player_config.player_jump);
}
}
function eatfruit(playe,gem){
gem.disableBody(true,true);
}