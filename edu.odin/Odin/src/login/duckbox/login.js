var fetch = require('node-fetch');
var readline  = require('readline');
var {google}  = require('googleapis');
var FormData = require('form-data');
const DIIR = 'https://edu.duckbox.com.br/api/login/duckbox/';
exports.Login = async (auth,origin,who) => {
    var form = new FormData()
    form.append('tokenAuth',await auth)
    form.append('tokenSchool',await origin)
    form.append('email',await who)
var pathFinal = DIIR+'createLogin.php'   
    try {
        let response = await fetch(pathFinal, {
            method: 'POST',
            body:await form
          });
        let responseJson = await response.json();
        console.log(await responseJson)
        return {error:null,response: await responseJson}
    } catch (error) {
        console.log(error);
          return {error:error}
      }
}
