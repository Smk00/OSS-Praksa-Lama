const fs = require('fs');
const path = require('path');

// Define the source directory, destination directory, and log file name
const sourceDir = 'C:\\Users\\simek\\OneDrive\\Desktop\\FAKS\\Lama\\Source';
const destDir = 'C:\\Users\\simek\\OneDrive\\Desktop\\FAKS\\Lama\\Dest1';
const logFileName = 'log.txt';

// Recursive function to copy PDF files from source directory and its subdirectories to destination directory
function copyPdfFiles(source, destination) {
  fs.readdir(source, (err, files) => { // Read the contents of the source directory
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => { // Iterate over each file in the source directory
      const filePath = path.join(source, file); // Construct the full path to the file

      fs.stat(filePath, (err, stats) => { // Get the stats for the file
        if (err) {
          console.error(err);
          return;
        }

        if (stats.isDirectory()) { // If the file is a directory, recurse into it
          copyPdfFiles(filePath, destination);
        } else if (path.extname(file).toLowerCase() === '.pdf') { // If the file is a PDF file
          const lastModified = stats.mtime.getTime(); // Get the last modified time of the file
          const baseName = path.basename(path.dirname(filePath)); // Get the name of the parent directory
          const destFileName = path.join(destination, baseName + '.pdf'); // Construct the destination file name

          fs.stat(destFileName, (err, destStats) => { // Check if the destination file already exists
            if (!err && destStats.isFile() && destStats.mtime.getTime() >= lastModified) { // If the destination file is newer than or equal to the source file, skip it
              console.log(`Skipped file: ${filePath}`);
            } else { // Otherwise, copy the source file to the destination file
              fs.copyFile(filePath, destFileName, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log(`Copied file: ${filePath} to ${destFileName}`);
                  fs.appendFile(path.join(destination, logFileName), destFileName + '\n', (err) => { // Append the name of the copied file to the log file
                    if (err) {
                      console.error(err);
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  });
}

// Call the copyPdfFiles function with the source and destination directories
copyPdfFiles(sourceDir, destDir);