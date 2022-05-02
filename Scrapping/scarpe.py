import requests
import json
from bs4 import BeautifulSoup

filename = 'data.json'

response = requests.get(
	url="https://www.apbt.org.tn/banques/",
)
soup = BeautifulSoup(response.content, 'html.parser')

banks = []
for bank in soup.find_all('div',class_="vc_tta-panel"):
    title = bank.findChild('span',class_="vc_tta-title-text")
    banks.append({title.text:bank.text})
   
# print(banks)

banks = []
name = ""
address = ""
image = ""
phone = ""
fax = ""
email = ""
capital = ""
employees = ""
website = ""
manager = ""
for bank in soup.find_all('div',class_="wpb_wrapper") :
    # print(type(bank))
    if(type(bank)!=type(None)):
        img=bank.findChild('img')
        if type(img) != type(None):
            image=img.get('src')
            # print(img.get('src'))
            
        addr = bank.select("td p:nth-of-type(1)")[:3]
        for ad in addr:
            address=ad.text
            # print(ad.text)
        
        title=bank.select("td:nth-of-type(2)")[:1]
        for t in title:
            nam=t.text.replace(ad.text,"")
            name=nam.replace("\n","")
            # print(name)
        
        tlf = bank.select("tr td:nth-of-type(2)")[1:2]
        for t in tlf:
            phone=t.text
            # print(t.text)
            
        telecopie = bank.select("tr td:nth-of-type(2)")[2:3]
        for tel in telecopie:
            fax=tel.text
            # print(tel.text)
            
        ema = bank.select("tr td:nth-of-type(2)")[3:4]
        for e in ema:
            email=e.text
            # print(e.text)
        
        capit = bank.select("tr td:nth-of-type(2)")[4:5]
        for cap in capit:
            capital=cap.text
            # print(cap.text)
            
        nbrEmp = bank.select("tr td:nth-of-type(2)")[5:6]
        for nbr in nbrEmp:
            employees=nbr.text
            # print(nbr.text)
        
        site = bank.select("tr td:nth-of-type(2)")[6:7]
        for s in site:
            website=s.text
            # print(s.text)  
        
        responsable = bank.select("tr td:nth-of-type(2)")[7:8]
        for resp in responsable:
            manager=resp.text
            # print(resp.text)  
        
        banks.append({"name":name,"address":address,"image":image,"phone":phone,"fax":fax,"email":email,"capital":capital,"employees":employees,"website":website,"manager":manager})

        
        # print("------------------------------------------------------------")
    
# bank_infos=json.dumps(banks,indent=4, sort_keys=True)
# print(bank_infos)

def write_json(new_data, filename='data.json'):
    with open(filename,'r+') as file:
          # First we load existing data into a dict.
        file_data = json.load(file)
        # Join new_data with file_data inside emp_details
        file_data["banks"].append(new_data)
        # Sets file's current position at offset.
        file.seek(0)
        # convert back to json.
        json.dump(file_data, file, indent = 4)
        
# write_json(banks)