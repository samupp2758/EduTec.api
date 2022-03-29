var fetch = require('node-fetch');
var readline  = require('readline');
var {google}  = require('googleapis');
var FormData = require('form-data');
const DIIR = 'https://edu.duckbox.com.br/api/disconnect/duckbox/';
exports.Disconnect = async (email,origin,who) => {
    var form = new FormData()
    form.append('origin',origin)
    form.append('tokenSchool',who)
    form.append('email',email)
var pathFinal = DIIR+'disconnect.php'   
    try {
        let response = await fetch(pathFinal, {
            method: 'POST',
            body:form
          });
        let responseJson = await response.json();
        console.log(await responseJson)
        return {error:null,response: await responseJson}
    } catch (error) {
        console.log(error);
          return {error:error}
      }
}
