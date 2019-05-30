from lxml import html
import requests
import pyperclip

photoURL = raw_input("Please enter your URL:\n")

#photoURL = "https://photos.google.com/share/AF1QipPw593ngFU8AB0v-pMIA4b6XPqcVvPLI6-5Bb15k6HfIqHPh3tX7SRCeho8bYTQDA?key=ZGRXRW9QTUsydGM5OWhzbzR0YTZhZlBkYnBtS1ln"

page = requests.get(photoURL)
#postList = open("temp.txt", "w")
#postList.write(page.content)
#postList.close()
tree = html.fromstring(page.content)

photo = tree.xpath("//meta[contains(@property, 'og:image')]")

contentURL = photo[0].get("content")

finalAddress = contentURL[0:contentURL.index("=w")] + "=w2400"
print finalAddress
pyperclip.copy("<div class=\"separator\" style=\"clear: both; text-align: center;\">\n<a href='" + photoURL +"'><img src='" + finalAddress + "' style=\"max-width: 49%; position: relative;\"/></a>\n</div>")
print "Done!"

