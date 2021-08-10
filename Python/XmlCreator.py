""" old
import xml.etree.ElementTree as ET
from xml.dom import minidom

import urllib.request, urllib.parse, urllib.error
#Lib que facilita a extração de dados do html
from bs4 import BeautifulSoup

import ssl

class XmlCreator:

    def CreateRoot(self,url,classToFind,tag):
        root = ET.Element("sites")
        self.root = root
        self.url = url
        self.classToFind = classToFind
        self.tag = tag

        #Ignora erros de certificações do SSL
        self.ctx = ssl.create_default_context()
        self.ctx.check_hostname = False
        self.ctx.verify_mode = ssl.CERT_NONE

        self.GetDataOfWeb()
        self.CreateDefaultComponent()
        self.SaveFile() 

    def GetDataOfWeb(self):

        html = urllib.request.urlopen(self.url, context=self.ctx).read()
        soup = BeautifulSoup(html,'html.parser')

        title = soup.find(self.tag,class_=self.classToFind).text
        self.name = title

        self.img = soup.find('figure',class_='thumb-image col-xs-8 col-sm-24 no-gutter default').find('div',class_='thumb-layer').find('img').get('data-src')
        #print(img)

    def CreateDefaultComponent(self):
        detailsComp = ET.Element('Details')
        self.root.append(detailsComp)        
        
        name = ET.SubElement(detailsComp,'title')
        name.text = self.name

        image = ET.SubElement(detailsComp,'img')
        image.text = self.img

        link = ET.SubElement(detailsComp,'link')
        link.text = 'link'

        self.tree = ET.ElementTree(self.root)   
        ET.indent(self.tree,space='\t',level=0)    

    def SaveFile(self):
        with open('./PythonHtmlProject/data.xml','wb') as f:
            self.tree.write(f,encoding='utf-8')
    
CXml = XmlCreator()

tagList = ['h3']
classList = ['thumb-title title-xsmall title-lg-small title-xs-medium']
url = ['https://noticias.uol.com.br/']

CXml.CreateRoot(url='https://noticias.uol.com.br/',
classToFind='thumb-title title-xsmall title-lg-small title-xs-medium',
tag='h3')
"""

import xml.etree.ElementTree as ET

import urllib.request, urllib.parse, urllib.error
#Lib que facilita a extração de dados do html
from bs4 import BeautifulSoup


import ssl
import math
import random
import os

class XmlCreator:

    def CreateRoot(self,url):
        root = ET.Element("dev.to")
        self.root = root
        self.url = url
        self.maxBusca = 9
        #Ignora erros de certificações do SSL
        self.ctx = ssl.create_default_context()
        self.ctx.check_hostname = False
        self.ctx.verify_mode = ssl.CERT_NONE

        self.GetDataOfWeb()
        self.SaveFile() 

    def GetDataOfWeb(self):
        req = urllib.request.Request(self.url,headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, context=self.ctx).read()

        soup = BeautifulSoup(html,'html.parser')

        main = soup.find('a',class_='single-video-article single-article')

        img = main.find('div',class_='video-image').get('style').replace('background-image: url(','')
        self.img = img[:-1]
        for i,video in enumerate(soup.find_all('a','single-video-article single-article')):
            if i>=self.maxBusca:
                break
            self.name = video.find('strong').text
            self.link ='https://dev.to/'+ video.get('href')
            img = video.find('div',class_='video-image').get('style').replace('background-image: url(','')
            self.img = img[:-1]
            self.CreateDefaultComponent()

    def CreateDefaultComponent(self):
        detailsComp = ET.Element('Details')
        self.root.append(detailsComp)        
        
        name = ET.SubElement(detailsComp,'title')
        name.text = self.name

        image = ET.SubElement(detailsComp,'img')
        image.text = self.img

        link = ET.SubElement(detailsComp,'link')
        link.text = self.link
        
        likes = ET.SubElement(detailsComp,'likes')
        likes.text = str(math.floor(random.random()*(10000-2))+2)
        messages = ET.SubElement(detailsComp,'messagesNum')
        messages.text = str(math.floor(random.random()*(999-0))+0)

        
        self.tree = ET.ElementTree(self.root)   
        ET.indent(self.tree,space='\t',level=0)    

    def SaveFile(self):
        #with open('data.xml','wb') as f:
        with open(os.path.join(os.path.dirname(__file__),'data.xml'),'wb') as f:
            self.tree.write(f,encoding='utf-8')
    
CXml = XmlCreator()


CXml.CreateRoot(url='https://dev.to/videos')
