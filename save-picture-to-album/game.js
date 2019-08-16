
let doAlert = () => 
{
	wx.showModal({
		title: '提示',
		content: '是否保存到本地相册',
		success(res) {
			if (res.confirm) {
				doSave();
			} else if (res.cancel) {
			}
		}
	})
};

//-- 1. 创建子画布
let cv = wx.createCanvas();
let ctx = cv.getContext("2d");

//-- 2. 绘制自定义纹理图
let doDraw = () => {
	let img = wx.createImage();
	img.crossOrigin = "anonymous";
	//-- 图片加载完成事件（只有加载完成才能转换）
	img.onload = () => 
	{   
		//-- 绘制背景
		img.onload = null;
		ctx.width = img.width;
		ctx.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);

		//-- 绘制文本
		ctx.font = "40px bold 黑体";
		ctx.fillStyle = "#FFF";
		ctx.textAlign = "center";
		ctx.fillText("Hello World!", cv.width / 2, cv.height / 3);
		ctx.fillText("By Pury", cv.width * 3 / 4, cv.height * 2 / 3);
		doAlert();
	}

	img.src = "images/bg.jpg";
};

//-- 3. 保存
let doSave = () => 
{
	//-- 保存临时路径
	let tempFilePath = cv.toTempFilePathSync();
	//-- 保存到相册，调用前需要用户授权 scope.writePhotosAlbum
	wx.saveImageToPhotosAlbum({
		filePath: tempFilePath,
		success: function () {
			wx.showToast({
				title: '保存成功',
				icon: 'success'
			});
		},
		fail: function (e) {
			wx.showToast({
				title: '保存失败',
				icon: 'none'
			});
		}
	});
};

doDraw();
