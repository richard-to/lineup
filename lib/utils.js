module.exports = {
	replaceFileExt: function(fileName, newExt){
		var newFileName = fileName;			
		var index = fileName.lastIndexOf('.');
		if(index > -1){
			newFileName = fileName.slice(0, index);
		}
		return newFileName + '.' + newExt;
	}
};