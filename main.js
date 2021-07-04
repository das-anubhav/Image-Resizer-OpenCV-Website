
var h;
var w;

var srcImg = document.getElementById('src-image');
const hiddenImg = document.getElementById('hidden-image');
const fileInput = document.getElementById('input-file');
const canvas = document.getElementById('dest-canvas');
const hiddenCanvas = document.getElementById('hidden-canvas');
const grayScaleBtn = document.getElementById('gray-scale-btn');
const downloadBtn = document.getElementById('download-btn');

function convertImageToGray(img) {

    let dst = new cv.Mat();
    let dsize = new cv.Size(h,w);
    cv.resize(img, dst, dsize, 0, 0, cv.INTER_AREA);

    return dst;
}


function dataUriToBlob(dataUri) {
    const b64 = atob(dataUri.split(',')[1]);
    const u8 = Uint8Array.from(b64.split(''), e => e.charCodeAt());
    return new Blob([u8], {type: 'image/png'});
}

fileInput.addEventListener('change', e => {
    srcImg.src = URL.createObjectURL(e.target.files[0]);
    hiddenImg.src = URL.createObjectURL(e.target.files[0]);
}, false);

grayScaleBtn.addEventListener('click', e => {
    let src = cv.imread(srcImg);
    const dst = convertImageToGray(src);
    cv.imshow('dest-canvas', dst);
    src.delete();
    dst.delete();

    let hiddenSrc = cv.imread(hiddenImg);
    const hiddenDst = convertImageToGray(hiddenSrc);
    cv.imshow('hidden-canvas', hiddenDst);
    hiddenSrc.delete();
    hiddenDst.delete();
});


downloadBtn.addEventListener('click', e => {
    const data = hiddenCanvas.toDataURL();
    const url = URL.createObjectURL(dataUriToBlob(data));
    downloadBtn.href = url;
});        



document.getElementById("gray-scale-btn").addEventListener('click', ()=>{
    var height = document.querySelector('#ht').value;
    var width = document.querySelector('#wt').value;
    h=parseInt(height);
    w=parseInt(width);
})