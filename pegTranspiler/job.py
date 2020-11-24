import json
from transpiledKeymap import transpiledKeymap
from keymapPart.QMKLayers import QMKLayers
from compiler.qmkCompiler.QMKCompiler import QMKCompiler
class Job:
    def __init__(self, jobId:str, keymapJson:json):
        self.transpiledKeymap=transpiledKeymap("","","")
        self.jobId= jobId
        self.selectedCompiler=keymapJson["compiler"]
        # self.keymapParts=map(self.pickTool,keymapJson["keymapParts"])
        self.keymapParts=[]
        self.rawJson=keymapJson
        self.pickCompiler()
        for part in keymapJson["keymapParts"]:
            self.keymapParts.append(self.pickTool(part))

    def pickCompiler(self):
        # I dont like this I know there is a pattern for this but I cant rembere the name so need to be looked up and changed 
        if self.selectedCompiler=="QMK":
            self.transpiledKeymap.updateKeymap("#include QMK_KEYBOARD_H \n")
            self.compiler=QMKCompiler(self.jobId,self.rawJson)


    def pickTool(self,part:json):
        # I dont like this I know there is a pattern for this but I cant rembere the name so need to be looked up and changed 
        if part["name"]=="layers":
           if self.selectedCompiler=="QMK":
               return  QMKLayers(part,self.rawJson)


    def transpile(self):
        for part in self.keymapParts:
            part.transpile(self.transpiledKeymap)
        # print(self.keymapParts[0].tranpiledCode)

    def compile(self):
        print("running compiler")
        self.compiler.compile(self.transpiledKeymap)

    def finish(self):
        pass
