import json
import os
import pathlib
import pegConfig
def makeKeyboardList():
    # add logic to remove kbd/kbd75 if there is a kbd/kbd75/rev1
    # maybe only add it to the list if the folder contains a info.json
    # that is a good idea
    qmkKeyboardPath=f'{pegConfig.config["QMKPATH"]}/keyboards'
    keyboards=[]
    exclude = set(["keymaps","handwired"])
    for path, subdirs, files in os.walk(qmkKeyboardPath):
        subdirs[:] = [d for d in subdirs if d not in exclude]
        keyboard= path.split("keyboards/")
        print(path)
        print(keyboard)
        if(len(keyboard)>1):
            keyboards.append(keyboard[1])
    currentDir= pathlib.Path(__file__).parent.absolute()
    finalJson= json.dumps(keyboards)
    with open(f'{currentDir}/keyboards.json',"w") as keyboardsJson:
        keyboardsJson.write(finalJson)

makeKeyboardList()
