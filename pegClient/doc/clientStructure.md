# sections
here I would like to layout how the diffrent sections that will exsist and how they will intreact with eachother and what each one will do

## keyboard picker
keyboard picker will simply pick a keyboard and pass this info onto the other parts eg the render and the settings

the keyboard picker will likly pick data based on a dropdown much like qmk config but this component can be swapped out for a system like via that reads the product id when this is moved to a desktop app

## keyboard render
the render will render a blank / filled in version of your keyboard that is selected. this will have ui for swapping layers as well here we will likly render empty keys for encoders, combos, cordes and so on if they send a keycode they go here


## keyboard settings
settings will be filled in if good settings are know but if not it will give the user options to pick there own settins so that all keyboards will work right off the bat just not as smoth. this will pass data to all other compoents
settings will be things like 
* split y/n
* oled count
* oled size 
* encoder count
* encoder pins
* combos count 
* combo timeout 
* used controller / what to compile to
these kinda thing
we might have a system like via where you pr in a json file that is used to fill these things out for you or we will pull them from the keyboard in qmk/zmk/kmk

## keyboard options
options will be all of the option for :
* each keycode
* macros
* oleds



# app structure

so we have 4 main componetns that all need to talk to eachother to do that will will use a state macheen like redux 
