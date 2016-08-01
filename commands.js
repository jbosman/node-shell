var fs = require("fs");
var request = require("request");
 
module.exports = {
    pwd: function( stdin, file, callback) {
        callback(__dirname);
    },
    date: function( stdin, file, callback) {
        var now = new Date().toString();
        callback(now);
    },
    ls: function( stdin, file, callback) {
        var theFiles = "";
        fs.readdir('.', function(err, files) {
            if(err) throw err;
            files.forEach(function(file) {
                theFiles += file.toString() + "\n";
            });
            callback(theFiles);
        });
    },
    echo: function( stdin, string, callback) {
        callback(string);
    },
    cat: function( stdin, file, callback) {
        fs.readFile(file, 'utf8', function(err, data){
            if(err) throw err;
            callback(data, stdin);
        });
    },
    head: function( stdin, file, callback) {
        fs.readFile(file, 'utf8', function(err, data){
            if(err) throw err;
            callback(data.split("\n").slice(0,5).join("\n"), stdin);
        });
    },
    tail: function( stdin, file, callback) {
        fs.readFile(file, 'utf8', function(err, data){
            if(err) throw err;
            callback(data.split("\n").slice(-5).join("\n"), stdin);
        });
    },
    curl: function( stdin, website, callback) {
        request(website, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
        });
    },
    wc: function( stdin, file, callback) {
        fs.readFile(file, 'utf8', function(err, data){
            if(err) throw err;
            callback(data.split("\n").length.toString(), stdin);
        });
    },
    uniq: function( stdin, file, callback) {
        fs.readFile(file, "utf8", function(err, data) {
            if(err) throw err;
            var sepLines = data.split("\n");
            for(var i = 0; i < sepLines.length; i++) {
                var aSearch = sepLines.indexOf(sepLines[i], i + 1);
                while(aSearch !== -1) {
                    sepLines.splice(aSearch, 1); 
                    aSearch = sepLines.indexOf(sepLines[i], i + 1);
                }
            }
            callback(sepLines.join("\n"), stdin);
        });
    },
    sort: function(stdin, file, callback) {
        fs.readFile(file, "utf8", function(err, data) {
            if(err) throw err;
            var sepLines = data.split("\n");
            callback(sepLines.sort().join("\n"), stdin);
        });
    }
};