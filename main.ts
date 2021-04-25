controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    CurrentCounts += -1
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Time += -500
    mySprite.say(Time, 500)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Time += 500
    mySprite.say(Time, 500)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    CurrentCounts += 1
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    blockSettings.clear()
})
let Blue = 0
let Green = 0
let Red = 0
let i = 0
let mySprite: Sprite = null
let CurrentCounts = 0
let Counts = 0
let Time = 0
if (!(blockSettings.exists("speed"))) {
    Time = 5000
} else {
    Time = blockSettings.readNumber("speed")
}
scene.setBackgroundColor(3)
let Under = textsprite.create("")
Under.setMaxFontHeight(10)
Under.setPosition(78, 89)
let Upper = textsprite.create("")
Upper.setMaxFontHeight(10)
Upper.setPosition(78, 35)
let MainMiddle = textsprite.create("")
MainMiddle.setMaxFontHeight(30)
MainMiddle.setPosition(78, 60)
if (!(blockSettings.exists("counts?"))) {
    Counts = game.askForNumber("Max counts", 2) + 1
    blockSettings.writeNumber("counts?", Counts)
} else {
    Counts = blockSettings.readNumber("counts?")
    if (!(blockSettings.exists("current"))) {
        CurrentCounts = 0
    } else {
        CurrentCounts = blockSettings.readNumber("current")
    }
}
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(84, 19)
game.onUpdate(function () {
    blockSettings.writeNumber("current", CurrentCounts)
    blockSettings.writeNumber("speed", Time)
    MainMiddle.setText("" + CurrentCounts)
    Upper.setText("" + (CurrentCounts - 1))
    Under.setText("" + (CurrentCounts + 1))
    if (CurrentCounts >= Counts) {
        CurrentCounts += -1
    }
    if (CurrentCounts <= 0) {
        CurrentCounts += 1
    }
    if (CurrentCounts + 1 >= Counts) {
        Under.setText("Max")
    }
    if (CurrentCounts - 1 <= 0) {
        Upper.setText("Min")
    }
    if (CurrentCounts - 1 >= 10) {
        Upper.x = 85
    }
    if (CurrentCounts + 1 >= 10) {
        Under.x = 85
    }
    if (CurrentCounts - 1 <= 9) {
        Upper.x = 85
    }
    if (CurrentCounts + 1 <= 9) {
        Under.x = 85
    }
    if (CurrentCounts <= 9) {
        MainMiddle.setPosition(85, 60)
    }
    if (CurrentCounts >= 10) {
        MainMiddle.setPosition(85, 60)
    }
})
game.onUpdate(function () {
    i = game.runtime() / Time
    Red = Math.sin(i) * 127 + 128
    Green = Math.sin(i + 2) * 127 + 128
    Blue = Math.sin(i + 4) * 127 + 128
    color.setColor(3, color.rgb(Red, Green, Blue))
})
