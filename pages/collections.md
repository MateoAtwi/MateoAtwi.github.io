---
layout: page
title: Collections
permalink: /collections/
---

# Collections and Blogs

The following are collections of things and different blogs that document the things I have done and the things I want to do.

{% assign collections = site.data.navigation.collections %}
<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.google.com/share/AF1QipPClG-KLl3Aua-oE6fRnVUaRxLkkT0Og16SbHufuKtVvPJb87vJlqJxgzQE5gxkKQ?key=M19XQmxtTHhRSHVkdExzd09TcjFRMzVfTk1aWThB&source=ctrlq.org'><img src='https://lh3.googleusercontent.com/-DC1Yz8ZHx633eWz7lXg4zlz9E95lWmTjxPAHQHt4gvZVVfDvtlOp5xU21_2d-KxdvvmDVitQN_CcAh_-A-xVOCXLn_GUpdYbUAwcYXomiKqHe4KmEGXfpx7FGxSTWs8kLenZxjKTo0=w2400' style="border-radius: 10px;"/></a>
</div>

<body>
	<div class="trigger">
		{% for item in collections %}
			<h2>{{ item.subject}}</h2>
			<hr>
			<ul style="padding-left: 3%;">
			{% for page in item.modules %}
				<li>
					<h4 ><a class="page-link" href="{{ page.link }}">{{ page.name }}</a></h4>
				</li>
			{% endfor %}
			</ul>
		{% endfor %}
	</div>
</body>