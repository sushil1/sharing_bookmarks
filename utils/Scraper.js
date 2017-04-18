var cheerio = require('cheerio')

module.exports = {

  scrape: function(html, props){
    var metaData = {}
    $ = cheerio.load(html)
    $('meta').each(function(i,meta){
      if(meta.attribs != null){
        var attribs = meta.attribs
        if(attribs.property != null){
          var prop = attribs.property
          if(props.indexOf(prop) != -1){
            var key = prop.replace('og:','')
            metaData[key] = attribs.content
          }
        }
      }
    })
    return metaData
  }

}
