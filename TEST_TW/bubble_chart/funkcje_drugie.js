function show_lm_data() {
  document.getElementById("LM_details").style.visibility = "visible";
//  document.getElementById("TW_details_button").classList.replace("btn btn-primary","btn btn-secondary"); nie działa?
  document.getElementById("LM_details_button").innerHTML = "Details below - Double click to hide details"
}

function hide_lm_data() {
  document.getElementById("LM_details").style.visibility = "hidden";
//  document.getElementById("TW_details_button").style.class = "btn btn-primary"; nie działa?
  document.getElementById("LM_details_button").innerHTML = "Click for more information about Łukasz"
}


//scripts to Group Project

function show_tw_data() {
  document.getElementById("TW_details").style.visibility = "visible";
//  document.getElementById("TW_details_button").classList.replace("btn btn-primary","btn btn-secondary"); nie działa?
  document.getElementById("TW_details_button").innerHTML = "Details below - Double click to hide details"
}

function hide_tw_data() {
  document.getElementById("TW_details").style.visibility = "hidden";
//  document.getElementById("TW_details_button").style.class = "btn btn-primary"; nie działa?
  document.getElementById("TW_details_button").innerHTML = "Click for more information about Tomek"
}


function show_ak_data() {
  document.getElementById("AK_details").style.visibility = "visible";
//  document.getElementById("TW_details_button").classList.replace("btn btn-primary","btn btn-secondary"); nie działa?
  document.getElementById("AK_details_button").innerHTML = "Details below - Double click to hide details"
}

function hide_ak_data() {
  document.getElementById("AK_details").style.visibility = "hidden";
//  document.getElementById("TW_details_button").style.class = "btn btn-primary"; nie działa?
  document.getElementById("AK_details_button").innerHTML = "Click for more information about Anna"
}