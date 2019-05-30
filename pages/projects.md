---
layout: page
title: Projects
permalink: /projects/
categories: projects
---
This is a chronological summary of all my projects. Checkout [my work and education page](/work&education/) for more background details.

# Content Coming Soon

{% assign postList = site.posts %}

<body>
    <ul style="margin: 0px;">
	  {% for project in postList %}
	  	{% if project.categories contains "personal"%}
	  	<!--Use this previous line to filter out all the personal projects-->
	  	{% elsif project.categories contains page.categories%}
	    	<details><summary><h3 style="margin: 0px; display: inline;">{{ project.title }}</h3></summary>
				<br>
				<p>
					<img src='{{ project.thumbnail }}' style="max-width: 250px; max-height: 250px; border-radius: 0px; display: inline; float: right"/>
					<p markdown="1">
						{{ project.summary }}
					</p> 
					<a href="{{ project.permalink }}">More on this project</a>
				</p>
				<br>
			</details>
		{% endif %}
	  {% endfor %}
	</ul>
</body>