'use strict';
var express = require('express');
var router = express.Router();
const docker = require('../utils/dockerAPI');
var db = require('../db/config');
var User = require('../models/User');

router.post('/deleteFile', function(req, res) {
  const containerName = req.body.containerName;
  const entry = req.body.curDir + '/' + req.body.entry;
  const folderFlag = req.body.isFolder ? ' -rf ' : ' ';
  const command = 'rm' + folderFlag + entry;
  docker.runCommand(containerName, command, function(err, res1) {
    if(err) {
      res.status(200).send(err);
    } else {
      res.status(200).send(res1);
    }
  });
});

router.post('/restart', function(req, res) {
  var containerName = req.body.containerName;
  docker.isContainerRunning(containerName, function(resp) {
    if(!resp) {
      //must restart container
      docker.restartContainer(containerName, function(resp1) {
        res.status(200).send(resp1);
      });
    } else {
      res.status(200).send('RUNNING');
    }
  });
});

router.post('/executeFile', function(req,res) {
  var fileName = req.body.fileName;
  var fileType = fileName.slice(fileName.lastIndexOf('.'));
  if(fileType === '.js') {
    var code = req.body.code;
    var newCode = code.replace(/\n/g, '\\n');
    newCode = newCode.replace(/\"/g, '\\\"');
    newCode = newCode.replace(/'/g, "\\\"");
    var command = 'bash -c "echo -e \'' + newCode + '\' > ' + req.body.filePath + '/' + fileName + '"'
    
    docker.runCommand(req.body.containerName, command, function(err, response) {
      if(err) {
        res.status(500).send(err);
      } else {
        docker.runCommand(req.body.containerName, 'node ' + req.body.filePath + '/' + fileName, function(err1, response1) {
          if(err1) {
            res.status(500).send(err);
          } else {
            console.log('this is the file', response1);
            res.status(200).send({res: response1, cmd: 'node'});
          }
        });
      }
    });
  } else if (fileType === '.rb') {
    var code = req.body.code;
    var newCode = code.replace(/\n/g, '\\n');
    newCode = newCode.replace(/\"/g, '\\\"');
    newCode = newCode.replace(/'/g, "\\\"");
    var command = 'bash -c "echo -e \'' + newCode + '\' > ' + req.body.filePath + '/' + fileName + '"'
    docker.runCommand(req.body.containerName, command, function(err, response) {
      if(err) {
        res.status(500).send(err);
      } else {
        docker.runCommand(req.body.containerName, 'ruby ' + req.body.filePath + '/' + fileName, function(err1, response1) {
          if(err1) {
            res.status(500).send(err);
          } else {
            res.status(200).send({res: response1, cmd: 'ruby'});
          }
        });
      }
    });
  } else if (fileType === '.py') {
    var code = req.body.code;
    var newCode = code.replace(/\n/g, '\\n');
    newCode = newCode.replace(/\"/g, '\\\"');
    newCode = newCode.replace(/'/g, "\\\"");
    var command = 'bash -c "echo -e \'' + newCode + '\' > ' + req.body.filePath + '/' + fileName + '"'
    docker.runCommand(req.body.containerName, command, function(err, response) {
      if(err) {
        res.status(500).send(err);
      } else {
        docker.runCommand(req.body.containerName, 'python ' + req.body.filePath + '/' + fileName, function(err1, response1) {
          if(err1) {
            res.status(500).send(err);
          } else {
            res.status(200).send({res: response1, cmd: 'python'});
          }
        });
      }
    });
  } else {
    res.status(500).send({msg: "Cannot execute filetype '" + fileType + "'"});
  }
});

router.post('/handleFileBrowserChange', function(req, res) {
  var dir;
  if(req.body.dir.endsWith('/')) {
    dir = req.body.dir + req.body.entry;
  } else {
    dir = req.body.dir + '/' + req.body.entry;
  }
  //const dir = req.body.dir + '/' + req.body.entry
  docker.directoryExists(req.body.containerName, dir, function(dirExists) {
    if(dirExists.indexOf('Directory exists') !== -1) {
      res.status(200).send({type: 'dir', newDir: req.body.entry});
    } else {
      docker.runCommand(req.body.containerName, 'cat ' + dir, function(err, response) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(200).send({type: 'file', fileContents: response});
        }
      })
    }
  });
});

router.post('/handleCodeSave', function (req, res) {
  /*
  const fileName = req.body.fileName;
  const containerName = req.body.containerName;
  const code = JSON.stringify(req.body.codeValue).replace(/'/g, "\\\"");
  const echo = "'echo -e ";
  const file = " > " + fileName + "'"
  const command = 'bash -c ' + echo + code + file;
  */
  //Refactor handleCodeSave to work on Windows. If it doesn't work on Mac, you can change it back to the above.
  console.log('IN HANDLE SAVE');
  var containerName = req.body.containerName;
  var code = req.body.codeValue;
  var newCode = code.replace(/\n/g, '\\n');
  newCode = newCode.replace(/\"/g, '\\\"');
  newCode = newCode.replace(/'/g, "\\\"");
  var command = 'bash -c "echo -e \'' + newCode + '\' > ' + req.body.filePath + '/' + req.body.fileName + '"'
  docker.runCommand(containerName, command, function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


router.post('/cmd', function (req, res) {
  var cmd = req.body.cmd;
  var containerName = req.body.containerName;

  if(cmd === 'node') {
    res.status(200).send('Node REPL is not yet implemented on picoShell. Check back soon!\n');
    return;
  }
  if(cmd === 'python') {
    res.status(200).send('Python REPL is not yet implemented on picoShell. Check back soon!\n');
    return;
  }
  if(cmd === 'ruby') {
    res.status(200).send('Ruby REPL is not yet implemented on picoShell. Check back soon!\n');
    return;
  }

  if(cmd.startsWith('apt-get install') && (!cmd.startsWith('apt-get install -y')) && (!cmd.endsWith('-y'))) {
    if(cmd.split(' ').length > 3) {
      res.status(200).send('Error: Command apt-get takes exactly three arguments\n'); 
      return;
    } else {
      const packageName = cmd.split(' ')[cmd.split(' ').length - 1];
      console.log('packageName', packageName);
      docker.install(packageName, req.body.containerName, function(err, res1) {
        if(err) {
          res.status(200).send(err);
        } else {
          res.status(200).send(res1);
        }
      });
    }
  } else if(cmd.split(" ")[0] === 'cd') {
    if(!cmd.split(" ")[1]) {
      res.status(200).send('Error: Must specify a directory.\n');
      return;
    }
    let newdir = cmd.split(" ")[1];
    console.log('change dir to: ', newdir);
    let readyToExecute = true;
    if(newdir === '..') {
      readyToExecute = false;
      var picoRes = req.body.curDir;
      if(picoRes.endsWith('\n')) picoRes = picoRes.slice(0, picoRes.length - 1);
      newdir = picoRes;
      if(newdir.indexOf('/') !== newdir.lastIndexOf('/')) {
        newdir = newdir.slice(0, newdir.lastIndexOf('/'));
      } else {
        newdir = '/';
      }
      res.status(200).send({res: res1, pwd: newdir}); 
    } else if (newdir[0] !== '/') {
      //append newdir to current dir
      readyToExecute = false;
      var picoRes = req.body.curDir;
      if(picoRes[picoRes.length - 1] === '\n') picoRes = picoRes.slice(0, picoRes.length - 1);
      if(picoRes[picoRes.length - 1] === '/') picoRes = picoRes.slice(0, picoRes.length - 1);
      const dir = picoRes + '/' + newdir;
      docker.directoryExists(containerName, dir, function(dirRes) {
        if(dirRes.indexOf('Directory exists') !== -1) {
          res.status(200).send({res: res1, pwd: dir}); 
        } else {
          res.status(200).send('Error: Directory not found\n');
        }
      });
      
    }
    if(readyToExecute) {
      docker.directoryExists(containerName, newdir, function(dirRes) {
        if(dirRes.indexOf('Directory exists') !== -1) {
          res.status(200).send({res: '', pwd: newdir});
        } else {
          res.status(200).send('Error: Directory not found\n');
        }
      });
    }
  } else if(cmd.split(" ")[0] === 'open' || cmd.split(" ")[0] === 'vim') {
    const potential = cmd.split(" ")[0].trim();
    if(!cmd.split(" ")[1]) {
      res.status(200).send('Error: Must specify a file');
      return;
    }
    var res1 = req.body.curDir;
    let fileName = cmd.split(" ")[1];
    
    if(res1[res1.length - 1] === '\n') res1 = res1.slice(0, res1.length - 1);
    const command = 'cat ' + res1 + '/' + cmd.split(" ")[1];
    docker.runCommand(containerName, command, function(err2, res2) {
      if(err2) {
        console.log('this is error 2', err2);
        if (potential === 'vim') {
          if(fileName.startsWith('/')) {
            docker.runCommand(containerName, 'touch ' + fileName, function(err4, res4) {
              if(err1) {
                res.status(500).send(err4);
              } else {
                var filePath = fileName.slice(0, fileName.lastIndexOf('/'));
                fileName = fileName.slice(fileName.lastIndexOf('/') + 1);
                  res.status(200).send({newFile: true, res: res4, fileName: fileName, filePath: filePath, vim: true});
              }
            });
          } else {
              if(res1[res1.length - 1] === '/') res1 = res1.slice(0, res1.length - 1);
              const command = 'touch ' + res1 + '/' + fileName;
              docker.runCommand(containerName, command, function(err3, res3) {
                if(err3) {
                  res.status(500).send(err3);
                } else {
                    var filePath = fileName.slice(0, fileName.lastIndexOf('/'));
                    fileName = fileName.slice(fileName.lastIndexOf('/') + 1);
                    res.status(200).send({termResponse: res3, fileName: fileName, filePath: res1, fileOpen: true, vim: true});
                  }
              });
          }
        } else {
          res.status(200).send(err2);
        }
      } else {
        if (potential === 'vim') {
          res.status(200).send({termResponse: res2, vim: true, fileOpen: true, fileName: fileName, filePath: res1});
        } else {
          res.status(200).send({termResponse: res2, fileOpen: true, fileName: fileName, filePath: res1});
        }
      }
    });

  } else if (cmd.split(" ")[0] === 'pico') {
    if(!cmd.split(" ")[1]) {
      res.status(200).send('Error: Must specify a file\n');
      return;
    }
    var fileName = cmd.split(" ")[1];
    var potential = cmd.split(" ")[0].trim();
    console.log('this is potential', potential === 'vim');
    if(fileName.startsWith('/')) {
      docker.runCommand(containerName, 'touch ' + fileName, function(err1, res1) {
        if(err1) {
          res.status(500).send(err1);
        } else {
          var filePath = fileName.slice(0, fileName.lastIndexOf('/'));
          fileName = fileName.slice(fileName.lastIndexOf('/') + 1);
          if (potential === 'vim') {
            res.status(200).send({newFile: true, res: res1, fileName: fileName, filePath: filePath, vim: true});
          } else {
            res.status(200).send({newFile: true, res: res1, fileName: fileName, filePath: filePath});
          }
        }
      });
    } else {
      var res1 = req.body.curDir;
      
      if(res1[res1.length - 1] === '\n') res1 = res1.slice(0, res1.length - 1);
      if(res1[res1.length - 1] === '/') res1 = res1.slice(0, res1.length - 1);
      const command = 'touch ' + res1 + '/' + fileName;
      docker.runCommand(containerName, command, function(err2, res2) {
        if(err2) {
          res.status(500).send(err2);
        } else {
          if (potential === 'vim') {
            res.status(200).send({termResponse: res2, fileName: fileName, filePath: res1, fileOpen: true, vim: true});
          } else {
            res.status(200).send({termResponse: res2, fileName: fileName, filePath: res1, fileOpen: true});
          }

        }
      });
    }
  } else if (cmd.split(" ")[0] === 'download') {
    console.log('IN DOWNLOAD');
    if(!cmd.split(" ")[1]) {
      res.status(200).send('Error: Must specify a file or directory.\n');
      return;
    }
    var fileName = cmd.split(" ")[1];
    
    res1 = req.body.curDir;
    if(res1.endsWith('\n')) res1 = res1.slice(0, res1.length - 1);
    if(fileName.indexOf('/') !== -1) fileName = fileName.slice(fileName.lastIndexOf('/'));
    const fullFile = (res1 + '/' + fileName).replace(/\/\//g, '\/');
    const command = 'od -An -vtx1 ' + fullFile
    docker.directoryExists(req.body.containerName, fullFile, function(dirExists) {
      //download file
      if(dirExists.indexOf('Directory exists') === -1) {
        docker.runCommand(containerName, command, function(err2, res2) {
          console.log('RES2L', res2.length);
          if(err2) {
            res.status(200).send(err2);
          } else {
            res.status(200).send({download: true, fileContents: res2, fileName: fileName});
          }
        });
      } else {
        //download folder
        docker.runCommand(containerName, 'zip -FSr ' + fullFile + '.zip ' + fullFile, function(err3, res3) {
          if(err3) {
            res.status(200).send(err3);
          } else {
            var command = 'od -An -vtx1 ' + fullFile + '.zip';
            docker.runCommand(containerName, command, function(err4, res4) {
              if(err4) {
                res.status(200).send(err4);
              } else {
                res.status(200).send({download: true, fileContents: res4, fileName: fileName + '.zip'});
              }
            });
          }
        });
      }
    });
  } else {
    var res1 = req.body.curDir;

    console.log('req.body.curDir :', res1);
    console.log('this is the container name', containerName);

    
    res1 = res1.replace(/^\s+|\s+$/g, '');

    cmd = '"cd ' + res1 + ' && ' + cmd + '"';
    const command = 'bash -c ' + cmd;
    console.log(command);
    docker.runCommand(containerName, command, function(err2, res2) {
      if (err2) { 
        res.status(200).send(err2); 
      } 
      else { res.status(200).send(res2); }
    });
  

     
  }
});


module.exports = router;