from job import Job
import json
def getJsonFile():

    with open('microdox.json') as json_file:
         data = json.load(json_file)
         return data

def main():
    jsonMap=getJsonFile()
    firstJob=Job("abc9",jsonMap)
    # firstJob.transpile()
    # firstJob.compile()
main()

