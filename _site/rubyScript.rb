# run this ruby script with the following command to pull data from an xml file from blogger "ruby -rubygems rubyScript.rb" you must install jekyll-importer first with gem install jekyll-import
require "jekyll-import";
        JekyllImport::Importers::Blogger.run({
          "source"                => "blog-05-26-2018.xml",
          "no-blogger-info"       => false, # not to leave blogger-URL info (id and old URL) in the front matter
          "replace-internal-link" => false, # replace internal links using the post_url liquid tag.
        })