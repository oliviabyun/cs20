const MongoClient = require('mongodb').MongoClient;
const urldb = "mongodb+srv://user:password_pls@cluster0.r9iqh.mongodb.net/final_proj?retryWrites=true&w=majority";  // connection string goes here

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('qs');
var nodemailer = require('nodemailer');


http.createServer(function (req, res) {
    if(req.url == "/") {
        file = "index.html";
        fs.readFile(file, function(err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            console.log("accessing homepage...");
            res.write(txt);
            res.end();
        });
    } else if (req.url == "/usa") {
        fileName = "usa.html";
        fs.readFile(fileName, function(err, txt){
            res.writeHead(200, {'Content-Type': 'text/html'});
            console.log("accessing homepage...");
            res.write(txt);
            res.end();
        });
    } else if(req.url == "/usaprocess") {
        res.writeHead(200, {'Content-Type':'text/html'});

        template = "template.html";

        console.log("Process the form");
		pdata = "";
        
	    req.on('data', data => {
            pdata += data.toString();
        });

        // when complete POST data is received
		req.on('end', () => {
			pdata = qs.parse(pdata);

            fs.readFile(template, function(err, txt) {
                if (err) {
                    console.log ("Error loading stylesheet: ");
                }
                
                res.writeHead(200, {'Content-Type': 'text/html'});
                console.log("writing to template file");
                res.write(txt);

                MongoClient.connect(urldb, { useUnifiedTopology: true }, function(err, db) {
                    if(err) { 
                        console.log("Connection err: " + err); return; 
                    }
                    var dbo = db.db("final_proj");
                    var coll = dbo.collection('destinations');
                    console.log("finding...");

                    res.write("<div class='box-container'>");

                    if (pdata["historical"]) {
                        coll.find({"Category":"Historical", "Country": "USA"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Historical:</h2><br>");
                            res.write("<div class='usabox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["water"]) {
                        coll.find({"Category":"Water", "Country": "USA"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Water:</h2><br>");
                            res.write("<div class='usabox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["nature"]) {
                        coll.find({"Category":"Nature", "Country": "USA"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Nature:</h2><br>");
                            res.write("<div class='usabox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }
                    if (pdata["food"]) {
                        coll.find({"Category":"Food", "Country": "USA"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Food:</h2><br>");
                            res.write("<div class='usabox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["city"]) {
                        coll.find({"Category":"City", "Country": "USA"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for City:</h2><br>");
                            res.write("<div class='usabox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }
                    res.write("</div>"); //end box-container class
                    // res.end();
                }); // end mongo client connect
            });
        }); //  end req.on
		
    } else if (req.url == "/mexico") {
        fileName = "mexico.html";
        fs.readFile(fileName, function(err, txt){
            res.writeHead(200, {'Content-Type': 'text/html'});
            console.log("accessing homepage...");
            res.write(txt);
            res.end();
        });        
    } else if(req.url == "/mexicoprocess") {
        res.writeHead(200, {'Content-Type':'text/html'});

        template = "template.html";

        console.log("Process the form");
		pdata = "";
        
	    req.on('data', data => {
            pdata += data.toString();
        });

        // when complete POST data is received
		req.on('end', () => {
			pdata = qs.parse(pdata);
            fs.readFile(template, function(err, txt) {
                if (err) {
                    console.log ("Error loading stylesheet: ");
                }
                
                res.writeHead(200, {'Content-Type': 'text/html'});
                console.log("writing to template file");
                res.write(txt);
                //res.write("Testing...");

                MongoClient.connect(urldb, { useUnifiedTopology: true }, function(err, db) {
                    if(err) { 
                        console.log("Connection err: " + err); return; 
                    }
                    var dbo = db.db("final_proj");
                    var coll = dbo.collection('destinations');
                    console.log("finding...");

                    res.write("<div class='box-container'>");

                    // search per checked values

                    if (pdata["historical"]) {
                        coll.find({"Category":"Historical", "Country": "Mex"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Historical:</h2><br>");
                            res.write("<div class='mexbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["water"]) {
                        coll.find({"Category":"Water", "Country": "Mex"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Water:</h2><br>");
                            res.write("<div class='mexbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["nature"]) {
                        coll.find({"Category":"Nature", "Country": "Mex"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Nature:</h2><br>");
                            res.write("<div class='mexbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }
                    if (pdata["food"]) {
                        coll.find({"Category":"Food", "Country": "Mex"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Food:</h2><br>");
                            res.write("<div class='mexbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["city"]) {
                        coll.find({"Category":"City", "Country": "Mex"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for City:</h2><br>");
                            res.write("<div class='mexbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }
                    res.write("</div>"); //end box-container class
                }); // end mongo client connect
            });
        }); //  end req.on
    } else if (req.url == "/canada") {
        fileName = "canada.html";
        fs.readFile(fileName, function(err, txt){
            res.writeHead(200, {'Content-Type': 'text/html'});
            console.log("accessing homepage...");
            res.write(txt);
            res.end();
        });        
    } else if (req.url == "/canadaprocess") {
        res.writeHead(200, {'Content-Type':'text/html'});

        template = "template.html";

        console.log("Process the form");
		pdata = "";
        
	    req.on('data', data => {
            pdata += data.toString();
        });

        // when complete POST data is received
		req.on('end', () => {
			pdata = qs.parse(pdata);
            fs.readFile(template, function(err, txt) {
                if (err) {
                    console.log ("Error loading stylesheet: ");
                }
                
                res.writeHead(200, {'Content-Type': 'text/html'});
                console.log("writing to template file");
                res.write(txt);
                //res.write("Testing...");

                MongoClient.connect(urldb, { useUnifiedTopology: true }, function(err, db) {
                    if(err) { 
                        console.log("Connection err: " + err); return; 
                    }
                    var dbo = db.db("final_proj");
                    var coll = dbo.collection('destinations');
                    console.log("finding...");

                    res.write("<div class='box-container'>");

                    // search per checked values

                    if (pdata["historical"]) {
                        coll.find({"Category":"Historical", "Country": "Can"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Historical:</h2><br>");
                            res.write("<div class='canbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["water"]) {
                        coll.find({"Category":"Water", "Country": "Can"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Water:</h2><br>");
                            res.write("<div class='canbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["nature"]) {
                        coll.find({"Category":"Nature", "Country": "Can"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Nature:</h2><br>");
                            res.write("<div class='canbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }
                    if (pdata["food"]) {
                        coll.find({"Category":"Food", "Country": "Can"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for Food:</h2><br>");
                            res.write("<div class='canbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }

                    if (pdata["city"]) {
                        coll.find({"Category":"City", "Country": "Can"}).toArray(function(err, items) 
                        {
                        if (err) {console.log("Error: " + err);}
                        else {
                            res.write("<h2>Results for City:</h2><br>");
                            res.write("<div class='canbox'>");
                            for(i=0; i<items.length;i++) {
                                res.write(items[i].Name + ":<br>" + items[i].Description + "<br><br>");
                            }
                            res.write("</div>");
                        }
                        }); // end coll.find
                    }
                    res.write("</div>"); //end box-container class
                }); // end mongo client connect
            });
        }); //  end req.on
    } else if (req.url == "/contact") {
        fileName = "contact.html";
        fs.readFile(fileName, function(err, txt){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
            res.end();
        });
    } else if (req.url == "/contactprocess") {
        fileName = "template.html";
        fs.readFile(fileName, function(err, txt){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);

            pdata = "";
            // Waits for post data and adds it to pdata
            req.on('data', data => {
                pdata += data.toString();
            }); // end req.on
            req.on('end', () => {
                console.log(pdata);
                pdata = qs.parse(pdata);
                console.log(pdata['fname']);
                email = pdata["email"];
            
                //send email to user
                // var transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     auth: {
                //     user: 'danimals.team@gmail.com',
                //     pass: 'D@nimals23!'
                //     }
                // });
                
                // var mailOptions = {
                //     from: 'danimals.team@gmail.com',
                //     to: email,
                //     subject: 'Sending Email using Node.js',
                //     text: 'That was easy!'
                // };
                
                // transporter.sendMail(mailOptions, function(error, info){
                //     if (error) {
                //     console.log(error);
                //     } else {
                //     console.log('Email sent: ' + info.response);
                //     }
                // });
                res.write("<br/><br/>");
                res.write(pdata['fname'] + " " + pdata['lname'] + ", thanks for contacting us!");
            }); // end req.on('end')
        });  
        
        // fileName = "contact.html"; Change to something else
        
    } else {
        res.writeHead(200, {'Content-Type':'text/html'});
		res.write ("Unknown page request");
        res.write("url: " + req.url);
	    res.end();
    }
}).listen(process.env.PORT || 8080);
// }).listen(8080);