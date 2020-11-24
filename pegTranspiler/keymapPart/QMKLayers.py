from keymapPart import keymapPart
import json

class QMKLayers:
    def __init__(self,keymapJson:json,rawJson:json):
        self.keymapJson=keymapJson
        self.rawJson=rawJson
        self.tranpiledCode=""

    def transpile(self,tranpiledKeymap):
        print("I need to make c here")
        keymapLayers=[]
        for i,layer in enumerate(self.keymapJson["data"]):
            tempLayer=f'[{i}] = {self.rawJson["layout"]}({",".join(layer)})'
            keymapLayers.append(tempLayer)
        keymap = f'const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] ={"{"}{",".join(keymapLayers)}{"};"} '
        self.tranpiledCode=keymap
        tranpiledKeymap.updateKeymap(keymap)


# IKeymapPart
