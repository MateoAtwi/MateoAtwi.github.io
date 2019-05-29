#this is a quick python script to get a csv and create a list of post markdown files with the proper front matter

import os

postList = open("projectList.csv", "r")


data = postList.readlines()

for x in xrange(1,len(data)):
	postData = data[x].split(",")
	title = postData[0].strip()
	permalink = postData[1].strip()
	date = postData[2].strip()

	newPost = open("./blogs/projects/_posts/" + date + "-" + title.replace(' ',"-") + ".md", "w")
	newPost.write("---\n")
	newPost.write("layout: post\n")
	newPost.write("title: " + title + "\n")
	newPost.write("categories: projects\n")
	newPost.write("permalink: " + permalink + "\n")
	newPost.write("author: Mateo Atwi\n")
	newPost.write("---\n")
	newPost.close()

print "Completed Creating New Files"