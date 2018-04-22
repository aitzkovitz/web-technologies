#!/usr/bin/python

import cgi

data = cgi.FieldStorage()
name = data["name"].value
message = data["message"].value

with open("data.txt", "a+") as myfile:
    myfile.write( name+": "+message+'<br/>' )

#with open("data.txt","r") as myfile:
#    resp = myfile.readline()
print "Content-Type: text/html\n"
print name + ": " + message
