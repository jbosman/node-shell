var fs = require("fs");
var commands = require("./commands");
// Output a prompt
process.stdout.write('prompt > ');
var done = function(output, stdin) {
    if(stdin.length > 0) {
        fs.writeFile( "tempFile.txt", output, function(err) {
            if(err) throw err;
            var nextCmd = stdin.shift();
            commands[nextCmd](stdin, "tempFile.txt", done);
        }); 
    } else {
        process.stdout.write(output);
        process.stdout.write('\nprompt > ');
    }
};
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g);
  var curCmd = cmdList.shift().split(" ");
  commands[curCmd[0]](cmdList, curCmd[1], done);
});