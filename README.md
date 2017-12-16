
# kinesisJS
A layout editor for the Kinesis virtual drive config files

### Features:
- Layout support for Qwerty, Dvorak, Colemak and Workmans
- Export layout for loading directly into your Kinesis advantage 2 keyboard
- Export layout over Qwerty or Dvorak mapping (so you can load them from the Qwerty layout button or Dvorak layout button on your Kinesis advantage 2)


![Alt text](/gfx/preview_kinesisJS.png?raw=true "KinesisJS preview")




### TODO:
- fix key widths (currently they are tied to content, and quite easily broken)
- add function keys row
- add lookup table for long keynames
- use unicode characters for enter, backspace etc in lookup table
- parse preexisting kinesis layouts
- add drag and drop to open kinesis layouts
- add render layout to png for making backgrounds and cheat sheets

### BUGS:
- quotation mark does not show up in output (likely an escaping issue somewhere)
- hover and active keys dont style properly



