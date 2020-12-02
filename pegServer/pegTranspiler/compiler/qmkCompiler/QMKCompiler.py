import json
import os
import pathlib
import subprocess
class QMKCompiler:
    def __init__(self,jobId,rawJson):
        self.jobId=jobId
        self.rawJson=rawJson

    def compile(self,transpiledKeymap,start,finish):
        currentDir= pathlib.Path(__file__).parent.absolute()
        pathToNewMap=f'{currentDir}/qmk_firmware/keyboards/{self.rawJson["keyboard"]}/keymaps/{self.jobId}' 
        os.mkdir(pathToNewMap)
        with open(f'{pathToNewMap}/keymap.c', 'w') as keymap:
                keymap.write(transpiledKeymap.keymap)
        with open(f'{pathToNewMap}/rules.mk', 'w') as rulesMk:
             rulesMk.write(transpiledKeymap.fileOne)
        with open(f'{pathToNewMap}/config.h', 'w') as configH:
            configH.write(transpiledKeymap.fileTwo)
        pathToCompile=f'{currentDir}/qmk_firmware'
        start(f'{pathToCompile}/{self.rawJson["keyboard"].replace("/","_")}_{self.jobId}.hex')
        compileTask= subprocess.run(["make", f'{self.rawJson["keyboard"]}:{self.jobId}'],cwd=pathToCompile)
        print(compileTask)
        finish()
