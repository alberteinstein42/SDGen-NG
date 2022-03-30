var config = {
	domains: [{
		name: "NAME OF THE SHARED DRIVE PROVIDER", //CONFIGURABLE
		client_id: "", //CONFIGURABLE
		client_secret: "", //CONFIGURABLE
		refresh_token: "", //CONFIGURABLE
	}],
	access_token: "",
	td_request: {
		name: "",
		email: "",
    domain: ""
	}
}

function onSubmit(e) {

  var values = e.namedValues;
  config.td_request.email = values["Email"];
  config.td_request.name = values["TD Name"];
  config.td_request.domain = values["TD Institute"];


  //Load Access Token
  getAccessToken(matchDomain());
  Logger.log("Access token generated.");

  //Create TD, Share and Leave
  var teamDriveId = createTD();
  Logger.log("TD created.");
  
  teamDriveId = allowOutsiders(teamDriveId);
  var myPermissionID = shareTD(teamDriveId)
  Logger.log("TD shared.");

  var response = leaveTD(teamDriveId, myPermissionID);
  Logger.log("TD left.");

  Logger.log(response);
  Logger.log("All complete.");

}



function matchDomain(){
  for (i=0; i<config.domains.length; i++) {
    d = config.domains[i];
		if(d.name == config.td_request.domain){
      return i;
    }
	}
  return 0; //Default to zero
}



function createTD(){
	let url = "https://www.googleapis.com/drive/v3/drives";
  url += "?requestId=" + uuidv4();

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({'name': config.td_request.name,}),
    'headers': {'authorization' : "Bearer " + config.access_token}
  }

	let response = JSON.parse(UrlFetchApp.fetch(url, options));
  Logger.log("TD ID - " + response.id);
	return response.id;
}

//Function specific to circumvent bans by Organisation to be shared outside
function allowOutsiders(teamDriveId){
  let url = "https://www.googleapis.com/drive/v3/drives/"+teamDriveId;

  var options = {
    'method': 'patch',
    'contentType': 'application/json',
    'payload': JSON.stringify({ 'restrictions': { 'domainUsersOnly': false } }),
    'headers': {'authorization' : "Bearer " + config.access_token}
  }

	let response = JSON.parse(UrlFetchApp.fetch(url, options));
  
  return teamDriveId;
}

function shareTD(teamDriveId){

	// Get created drive user permission ID
	let url = `https://www.googleapis.com/drive/v3/files/${teamDriveId}/permissions`;
	params = { 
    supportsAllDrives: true,
    fields:  "permissions(id,emailAddress)"
  };
	url += "?" + enQuery(params);

  let options = {
    'headers': {'authorization' : "Bearer " + config.access_token}
  };

	let response = JSON.parse(UrlFetchApp.fetch(url, options));
	const myPermissionID = response.permissions[0].id;



	// Share team drive with email address
	url = `https://www.googleapis.com/drive/v3/files/${teamDriveId}/permissions`;
	params = { supportsAllDrives: true };
	url += "?" + enQuery(params);

  options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({ role: "organizer", type: "user", emailAddress: config.td_request.email }),
    'headers': {'authorization' : "Bearer " + config.access_token}
  }

	response = JSON.parse(UrlFetchApp.fetch(url, options));

  return myPermissionID;
}

function leaveTD(teamDriveId, myPermissionID){
	// Delete creator from the team drive
	url = `https://www.googleapis.com/drive/v3/files/${teamDriveId}/permissions/${myPermissionID}`;
	params = { supportsAllDrives: true };
	url += "?" + enQuery(params);


  options = {
    'method': 'delete',
    'headers': {'authorization' : "Bearer " + config.access_token}
  };

	response = UrlFetchApp.fetch(url, options);
	
	return response;
}


function enQuery(data) {
	const ret = [];
	for (let d in data) {
		ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
	}
	return ret.join("&");
}

function getAccessToken(domain_number) {
	if(config.access_token !== undefined && config.access_token !== ""){
		return config.access_token;
	}

	const url = "https://www.googleapis.com/oauth2/v4/token";
	
	const payload = {
		client_id: config.domains[0].client_id,
		client_secret: config.domains[0].client_secret,
		refresh_token: config.domains[0].refresh_token,
		grant_type: "refresh_token",
	};

	let options = {
		'method': "post",
		'payload': payload,
	};

	let access_response = JSON.parse(UrlFetchApp.fetch(url, options));

	if(access_response.access_token != undefined){
		config.access_token = access_response.access_token;
		return access_response.access_token;
	}else{
		return null;
	}
}

function requestOption(headers = {}, method = "GET") {
	headers["authorization"] = "Bearer " + config.access_token;

	return { 
		method: method, 
		headers: headers 
	};
}

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
	    v = c == "x" ? r : (r & 0x3) | 0x8;
	  	return v.toString(16);
	});
}

