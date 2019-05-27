Hello,
I'm back at it again. I'm working on a different virtual computer on a different desktop, so I have had to get a few things figured out.

I followed the previous tutorials, but I ran into some difficulty with the bundler here's what I've had to run so far.
'sudo gem update --system'
'sudo gem install bundler'

'bundle install'

Here's some interesting code using liquid:

```liquid
{% assign site_structure = site.data.navigation %}

    <!--{% for item in site_structure %}
    {{ item.name }}
    {% endfor %}-->
```