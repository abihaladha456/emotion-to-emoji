prediction_1="";
prediction_2="";
Webcam.set({
    width:350 ,
    height:300 ,
    image_format:"jpeg" ,
    jpeg_quality:100
});

camera=document.getElementById("camera");
Webcam.attach("#camera");
function Takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+ data_uri +'"/ >';

    })
}

function speak(){
    var synth=window.speechSynthesis;
    speakdata1="The First Prediction Is   " + prediction_1;
    speakdata2="And The Second Prediction Is  " + prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterThis);
    
}

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/b5bgjFPsb/model.json" , modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}

function check(){
    img=document.getElementById("capture_image");
classifier.classify(img , gotresult);
}

function gotresult(error , results){
    if (error){
        console.error(error);
    }else{
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
       speak();
       if (results[0].label== 'happy'){
        document.getElementById("update_emoji").innerHTML="&#128513;";


       }
       if (results[0].label== 'sad'){
        document.getElementById("update_emoji").innerHTML="&#128532;";
        

       }
       if (results[0].label== 'angry'){
        document.getElementById("update_emoji").innerHTML="&#128545;";
        

       }
       if (results[1].label== 'happy'){
        document.getElementById("update_emoji2").innerHTML="&#128513;";
        

       }
       if (results[1].label== 'sad'){
        document.getElementById("update_emoji2").innerHTML="&#128532;";
        

       }
       if (results[0].label== 'angry'){
        document.getElementById("update_emoji2").innerHTML="&#128545;";
        

       }

    }

}
