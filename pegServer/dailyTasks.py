import json
import os
import pathlib
import pegConfig
def makeKeyboardList():
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

    print(keyboards)

    currentDir= pathlib.Path(__file__).parent.absolute()
    finalJson= json.dumps(keyboards)
    with open(f'{currentDir}/keyboards.json',"w") as keyboardsJson:
        keyboardsJson.write(finalJson)

makeKeyboardList()
