from datetime import datetime

newnote = "Abc"
username= "Hilde"
ntimestemp = datetime.utcnow()
nfavorite = False

ntimestemp2 = datetime(2018, 5, 3) 
ntimestemp3 = datetime(2018, 6, 1) 


notesList= [{'_nid': 0, 'content': 'what?!', 'ntimestemp':ntimestemp, 'nfavorite':nfavorite},{'_nid': 1, 'content': newnote, 'ntimestemp':ntimestemp2, 'nfavorite':nfavorite}, {'_nid': 2, 'content': 'trollo', 'ntimestemp':ntimestemp3, 'nfavorite':nfavorite}]

#ab hier übernehmen

timestemps = []
result = []
for n in notesList:
    timestemps.append({'content': n['content'], "ntimestemp": n['ntimestemp']})

for i in range(len(timestemps)-1):       
    for j in range(0, len(timestemps)-i-1): 
        if timestemps[j]['ntimestemp'] > timestemps[j+1]['ntimestemp'] : 
            timestemps[j], timestemps[j+1] = timestemps[j+1], timestemps[j] 

for n in timestemps:
    result.append(n['content'])

#print kann weg gelassen werden
print(result)