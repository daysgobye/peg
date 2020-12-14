from __main__ import app
from flask import request,send_file,jsonify
import pegQueue
import os
import pegConfig
import json
import pathlib

@app.route("/compile",methods=['POST'])
def newJob():

    keymap=request.get_json(silent=True)

    if keymap!=None:
        jobId = pegQueue.enqueueJob(keymap)
        return f'{jobId[0]}: {jobId[1]}'
    else:
        return "missing keymap"
@app.route("/check-status/<jobId>",methods=["GET"])
def checkJob(jobId):
    if jobId!=None:
       finishedJob= pegQueue.finishedJobs[jobId]
       if finishedJob!=None:
           path,fileName=os.path.split(finishedJob.pathToFile)
           print(path)
           print(fileName)
           print(finishedJob.pathToFile)
           try:
               return send_file(finishedJob.pathToFile,attachment_filename=fileName)
           except Exception as e:
               return str(e)
       else:
           return "Job Not Done"
    else:
        return "missing jobId"

@app.route("/get-keyboard-list",methods=["GET"])
def getKeyboardsList():
    currentDir= pathlib.Path(__file__).parent.absolute()
    with open(f'{currentDir}/keyboards.json') as keyboards:
        keyboardsJson= keyboards.read()
        return keyboardsJson
@app.route("/get-keyboard-layout/<keyboardName>")
def getKeyboardLayout(keyboardName):
    # add try catch 
    qmkKeyboardPath=f'{pegConfig.config["QMKPATH"]}/keyboards'
    layoutPath=f'{qmkKeyboardPath}/{keyboardName.replace("-","/",10)}/info.json'
    with open(layoutPath) as layout:
        return layout.read()
