from queue import Queue
from pegTranspiler.job import Job
from finishedJob import FinishedJob
import time
from threading  import Thread
# I feel like we want a singleton here but it seems thats not the python way

jobQueue= Queue(maxsize=0)
finishedJobs=dict()
cleanUpQueue= Queue(maxsize=0)

def enqueueJob(jsonKeymap):
    timeStamp= round(time.time())
    print(timeStamp)
    # I want funny names like "fat purple mouse keymap time stamp"
    jobID=f'keymap{timeStamp}'
    newJob = Job(jobID,jsonKeymap)
    jobQueue.put(newJob)
    return (jobID,jobQueue.qsize())

def enqueueFinishedJob(job):
    # make a finshed job obj that has the path to its file then we need a quick look up for a job using the jobid from the old job 
    finishedJobs[job.jobId]=FinishedJob(job.pathToFile,job.jobId)

def enqueueCleanUp(finishedJob):
    # take the finished job and put it in que to be deleted at the end of the day the finisehd job
    finishedJobs.pop(finishedJob.jobId)
    cleanUpQueue.put(finishedJob)


def prossessJobQueue():
    global jobQueue
    global enqueueFinishedJob
    while True:
        if not jobQueue.empty():
            currentJob= jobQueue.get()
            def finish():
                enqueueFinishedJob(currentJob)
                jobQueue.task_done()
            print(f'compiling {currentJob.jobId}')
            currentJob.transpile()
            currentJob.compile(finish)
        else:
            pass
        
compileThread= Thread(target=prossessJobQueue)
compileThread.start()
