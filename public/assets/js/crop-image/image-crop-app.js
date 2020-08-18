var cropperArr = new Array(4);
function loadImagePreview(fileEle, aspectRatio){
	var fileEleDiv = $(fileEle).closest('div');
	var index = $(fileEle).data("image-index");
	var imgPreviewEle = fileEleDiv.find('.image-preview');
	if(imgPreviewEle.length==0){
		var imgEle = $('<img src="" class="image-preview" width="150" alt="" />');
		fileEleDiv.append(imgEle);
	} else {
		var imgEle = imgPreviewEle;
	}
	var loaderEle = $('<p><i class="fa fa-refresh fa-spin"></i> Loading Image</p>');
	fileEleDiv.append(loaderEle);

	var cropDimensionsEle = $('<input type="hidden" name="cropData'+ (index+1) +'" class="crop-dimensions" />');
	fileEleDiv.append(cropDimensionsEle);

	// console.log(fileEleDiv); // TEST
	if(fileEle.files && fileEle.files[0]){
		var reader = new FileReader();
		reader.onload = function (e) {
			imgEle.attr('src', e.target.result);
			createCropper(imgEle[0], index, cropDimensionsEle, aspectRatio);
			loaderEle.remove();
		}
		reader.readAsDataURL(fileEle.files[0]);
	}
}
function createCropper(imgEle, index, cropDimensionsEle, aspectRatio){
	var cropBoxData;
	var canvasData;
	// console.log(index); // TESt
	// console.log(cropDimensionsEle); // TESt

	if(cropperArr[index]){ // replace
		cropperArr[index].destroy();
	}
	var cropper = new Cropper(imgEle, {
		// autoCrop: false,
		// data : {"x":12.21590909090909,"y":-46.606060606060595,"width":736.2121212121211,"height":736.2121212121211,"scaleX":1,"scaleY":1},
		aspectRatio: aspectRatio,
		autoCropArea: 0.9,
		zoomable:false,
		rotatable: false,
		built: function () {
			// Strict mode: set crop box data first
			cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
		} ,
		crop: function(e) {
			cropDimensionsEle.val(JSON.stringify(cropper.getData()));
			/* console.log(e.detail.x);
			console.log(e.detail.y);
			console.log(e.detail.width);
			console.log(e.detail.height);
			console.log(e.detail.rotate);
			console.log(e.detail.scaleX);
			console.log(e.detail.scaleY); */
		} 
	});
	cropperArr[index] = cropper;

	// console.log(cropperArr[index]); // TESt
	// console.log(cropperArr); // TESt

	// console.log(cropper.getData()); // TEST
	// cropper.destroy();
}