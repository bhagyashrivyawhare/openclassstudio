// ==========================
// Page Navigation
// ==========================

window.showPage = function(page, btn){

    document
    .querySelectorAll('.page')
    .forEach(section=>{
        section.classList.add('hidden');
    });

    const target =
    document.getElementById(page + '-page');

    if(target){
        target.classList.remove('hidden');
    }

    document
    .querySelectorAll('.menu-btn')
    .forEach(button=>{
        button.classList.remove('active');
    });

    if(btn){
        btn.classList.add('active');
    }

};

// ==========================
// Upload Video
// ==========================

window.uploadVideo = function(){

    const title =
    document.getElementById('videoTitle').value;

    const video =
    document.getElementById('videoFile').files[0];

    if(!title || !video){

        alert(
        'Please select video and title'
        );

        return;
    }

    document.getElementById(
    'uploadProgress'
    ).innerHTML =
    'Upload feature coming next step...';

};

// ==========================
// Live Studio
// ==========================

let liveStream;

window.startLive = async function(){

    try{

        liveStream =
        await navigator.mediaDevices
        .getUserMedia({
            video:true,
            audio:true
        });

        document
        .getElementById('livePreview')
        .srcObject =
        liveStream;

    }

    catch(err){

        console.error(err);

        alert(
        'Camera access denied'
        );

    }

};

// ==========================
// Screen Share
// ==========================

window.shareScreen =
async function(){

    try{

        const screen =
        await navigator.mediaDevices
        .getDisplayMedia({
            video:true
        });

        document
        .getElementById('livePreview')
        .srcObject =
        screen;

    }

    catch(err){

        console.error(err);

    }

};

// ==========================
// Stop Live
// ==========================

window.stopLive =
function(){

    if(!liveStream) return;

    liveStream
    .getTracks()
    .forEach(track=>{
        track.stop();
    });

};

// ==========================
// Recording
// ==========================

let recorder;
let chunks = [];

window.startRecording =
async function(){

    try{

        const stream =
        await navigator.mediaDevices
        .getUserMedia({
            video:true,
            audio:true
        });

        document
        .getElementById(
        'recordPreview'
        ).srcObject =
        stream;

        recorder =
        new MediaRecorder(stream);

        chunks = [];

        recorder.ondataavailable =
        e=>{
            chunks.push(e.data);
        };

        recorder.start();

    }

    catch(err){

        console.error(err);

    }

};

// ==========================
// Stop Recording
// ==========================

window.stopRecording =
function(){

    if(!recorder) return;

    recorder.stop();

    recorder.onstop = ()=>{

        const blob =
        new Blob(
        chunks,
        {
            type:'video/webm'
        });

        const url =
        URL.createObjectURL(blob);

        const a =
        document.createElement('a');

        a.href = url;

        a.download =
        'recording.webm';

        a.click();

    };

};

// ==========================
// Dashboard Default
// ==========================

window.addEventListener(
'load',
()=>{

    showPage('dashboard');

});
