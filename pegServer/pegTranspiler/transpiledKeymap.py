class transpiledKeymap:
    def __init__(self,keymap:str,fileOne:str,fileTwo:str):
        self.keymap=keymap
        self.fileOne=fileOne
        self.fileTwo=fileTwo
    def updateKeymap(self, update:str):
        self.keymap= self.keymap+update
