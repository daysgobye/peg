from __main__ import app
from flask import request,send_file
import pegQueue
import os

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

