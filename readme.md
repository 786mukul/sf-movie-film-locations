# Uber Coding Challenge: SF Movies

**Author:**
Buck Kimbriel | [Portfolio](http://bkimbriel.com) | [Project Examples](http://dropthought.com)

**Project:**
SF Movies

**Technical Track:**
Front-end track

**Technical Track Reasoning:**
I chose to go with a front-end focused approach as I felt it would provide the best user experience. Although I had no prior experience with Backbone.js, it was fun to pick up something new and get running with it.The one issue that came up with based around geocoding the API addresses to geolocation coordinates. A php script was made to organize the data and then send the requests in a manner that followed Google's guidelines.Data is stored into a redis database to allow quick and easy access for users without requiring an external API. In a production environment, data would be retrieved and stored from the original API at a set interval to make sure app data remains up to date.

**Trade Offs / What To Change:**
With more time I feel there are quite a few features that could be added. Connecting into other APIs such as IMBd would be great in order to present the user with more information about actors, etc. Also providing a way for the user to view screen shots, purchase information, etc about movies would be a great way to make the app more interactive and possibly monetize.
