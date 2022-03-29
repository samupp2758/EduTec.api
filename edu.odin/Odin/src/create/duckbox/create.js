var fetch = require('node-fetch');
var readline  = require('readline');
var {google}  = require('googleapis');
var FormData = require('form-data');
const DIIR = 'https://edu.duckbox.com.br/api/create/duckbox/';
exports.Aula = async (auth,origin,idEvent) => {
    var form = new FormData()
    form.append('tokenAuth',auth)
    form.append('tokenSchool',origin)
    form.append('idEvent',idEvent)
var pathFinal = DIIR+'createAula.php'   
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
