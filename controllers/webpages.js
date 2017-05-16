//Webpage controllers
const
  Webpage = require('../models/Webpage.js') //require the Webpage model to be able to create functions on the database

module.exports = {
  index: (req, res) => {
    Webpage.find({},(err, webpages) => {
      if (err) {console.log(err)}
      res.json(webpages)
    })
  },
  show: (req, res) => {
    req.params.id

    //

    console.log("Show page");
    // res.redirect("/")
    //you can show a sepcific webpage (if it exists in the database) by doing Webpage.findById()
    //in the webpage router (not here)you can do something down this line:
  //
},
create: (req, res) => {
  console.log("Reached create controller function");
  Webpage.create(req.body, (err, newlyPage) => {
  if(err) return console.log(err)
  console.log("New Page Created ", newlyPage);
  res.redirect('/webpages/')
})
},

  //customized functions here
  //find crtlF-webpage object or return null
  //findOrReturnNull
   createOrFind: (req, res) => {
    console.log("url: ")
    console.log(req.body.url)
    // Webpage.findOne({ 'url': req.url }
    // We need to check if the URL is valid
    Webpage.find( {url:req.body.url} , function(errs, webpage){
      if(errs) console.log(errs);
      console.log("webpage returned from DB using a find call ");
      console.log(webpage)
      var newPageID
      if (webpage.length > 0) {
        newPageID = webpage[0]._id
        console.log(newPageID)
      } else {
        Webpage.create({url: req.body.url}, (err, newlyPage) => {
          console.log(newlyPage)
          newPageID = newlyPage._id
          console.log(newPageID)

        })
      }
    })

    res.json("Returned data ")
   }
}
